const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `
precision mediump float;
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_gravity;
uniform float u_air;
uniform float u_mist;
uniform float u_fire;
uniform float u_yaw;
uniform float u_pitch;

vec3 rotateVolume(vec3 p) {
  float cy = cos(u_yaw), sy = sin(u_yaw);
  float cx = cos(u_pitch), sx = sin(u_pitch);
  p.xz = mat2(cy, -sy, sy, cy) * p.xz;
  p.yz = mat2(cx, -sx, sx, cx) * p.yz;
  return p;
}

float turbulence(vec3 p) {
  float a = sin(p.x * 13.0 + p.y * 4.0 + u_time * 3.2);
  float b = cos(p.y * 11.0 - p.z * 7.0 - u_time * 2.7);
  float c = sin(p.z * 15.0 + p.x * 5.0 + u_time * 2.1);
  return (a * b + c) * 0.055;
}

void main() {
  vec2 uv = (v_uv - 0.5) * 2.0;
  uv.x *= u_resolution.x / u_resolution.y;
  vec3 origin = vec3(0.0, 0.0, 2.45);
  vec3 direction = normalize(vec3(uv * 0.88, -2.2));
  vec4 accumulated = vec4(0.0);

  for (int stepIndex = 0; stepIndex < 56; stepIndex++) {
    float distanceAlongRay = float(stepIndex) * 0.062;
    vec3 p = rotateVolume(origin + direction * distanceAlongRay);
    float noise = turbulence(p);
    float radial = 0.0;
    float density = 0.0;

    if (u_gravity < 0.5) {
      float heightFromBase = p.y + 0.72;
      float height01 = clamp(heightFromBase / 1.52, 0.0, 1.0);
      float heightMask = smoothstep(-0.08, 0.06, heightFromBase)
        * (1.0 - smoothstep(1.30, 1.54, heightFromBase));
      float width = mix(0.29, 0.018, height01) * (1.0 + noise * 1.5);
      float centreShift = u_air * 0.38 * height01 * height01;
      radial = length(vec2((p.x - centreShift) / max(width, 0.025), p.z / max(width * 0.78, 0.02)));
      density = heightMask * (1.0 - smoothstep(0.64, 1.18, radial + noise));
    } else {
      vec3 ellipsoid = vec3(p.x / 0.58, p.y / 0.49, p.z / 0.58);
      ellipsoid.x -= u_air * p.y * 0.34;
      radial = length(ellipsoid);
      density = 1.0 - smoothstep(0.70, 1.12, radial + noise);
    }

    density *= u_fire * (1.0 - 0.12 * u_mist);
    float core = 1.0 - smoothstep(0.02, 0.86, radial);
    vec3 edgeColor = mix(vec3(1.0, 0.25, 0.035), vec3(0.91, 0.22, 0.48), u_gravity * 0.62);
    vec3 sampleColor = mix(edgeColor, vec3(1.0, 0.84, 0.40), core);
    sampleColor = mix(sampleColor, vec3(0.58, 0.83, 1.0), u_mist * 0.16);
    float alpha = density * 0.12;
    accumulated.rgb += (1.0 - accumulated.a) * sampleColor * alpha;
    accumulated.a += (1.0 - accumulated.a) * alpha;
    if (accumulated.a > 0.96) break;
  }

  // The ray marcher accumulates premultiplied light internally. Convert it to
  // straight-alpha output for the transparent canvas compositor.
  gl_FragColor = vec4(accumulated.rgb / max(accumulated.a, 0.0001), accumulated.a);
}`;

export function flameVolumeParameters(scene, { time = 0, rx = 0, ry = 0 } = {}) {
  return {
    time,
    gravity: scene.dataset.gravity === 'micro' ? 1 : 0,
    air: scene.dataset.air === 'on' ? 1 : 0,
    mist: scene.dataset.mist === 'on' ? 1 : 0,
    fire: scene.dataset.fire === 'on' ? 1 : 0,
    yaw: (ry * Math.PI) / 180,
    pitch: (rx * Math.PI) / 180,
  };
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function bindFlameVolume(canvas, scene) {
  if (!canvas?.getContext) return null;
  let gl;
  try {
    gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
  } catch {
    return null;
  }
  if (!gl) return null;

  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertex || !fragment) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    return null;
  }
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  const buffer = gl.createBuffer();
  if (!buffer) return null;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.useProgram(program);
  const position = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const uniforms = Object.fromEntries(
    ['u_resolution', 'u_time', 'u_gravity', 'u_air', 'u_mist', 'u_fire', 'u_yaw', 'u_pitch'].map((name) => [
      name,
      gl.getUniformLocation(program, name),
    ]),
  );
  // The shader already integrates the ray samples. Fixed-function blending
  // would apply alpha a second time and make the flame nearly invisible.
  gl.disable(gl.BLEND);

  let rotation = { rx: 0, ry: 0 };
  let elapsed = 0;
  let lastFrame = 0;
  let frame = 0;
  let paused = Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  let observer;
  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
    const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
    const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    gl.uniform2f(uniforms.u_resolution, width, height);
    draw();
  };
  const draw = () => {
    if (gl.isContextLost()) return;
    const state = flameVolumeParameters(scene, { time: elapsed, ...rotation });
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uniforms.u_time, state.time);
    gl.uniform1f(uniforms.u_gravity, state.gravity);
    gl.uniform1f(uniforms.u_air, state.air);
    gl.uniform1f(uniforms.u_mist, state.mist);
    gl.uniform1f(uniforms.u_fire, state.fire);
    gl.uniform1f(uniforms.u_yaw, state.yaw);
    gl.uniform1f(uniforms.u_pitch, state.pitch);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  const render = (now) => {
    if (!canvas.isConnected || paused) {
      frame = 0;
      return;
    }
    if (now - lastFrame >= 40) {
      lastFrame = now;
      elapsed = now / 1000;
      draw();
    }
    frame = requestAnimationFrame(render);
  };

  observer = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null;
  observer?.observe(canvas);
  resize();
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    cancelAnimationFrame(frame);
    scene.classList.remove('scene-volume-ready');
  });
  if (!paused) frame = requestAnimationFrame(render);

  return {
    setRotation(rx, ry) {
      rotation = { rx, ry };
      if (paused) draw();
    },
    update() {
      draw();
    },
    pause() {
      paused = true;
      cancelAnimationFrame(frame);
      frame = 0;
      draw();
    },
    resume() {
      if (!paused) return;
      paused = false;
      frame = requestAnimationFrame(render);
    },
  };
}
