# Security and data-handling notes

## Application boundary

- The Node.js application binds to `127.0.0.1` by default. In this mode it is a local research dashboard. Network binding requires explicit configuration, a 32-character access token, and an exact trusted-origin allowlist.
- **Explicit public read-only exception:** `MORS_PUBLIC_READONLY=1` publishes static research pages and `GET` APIs without login. Application-changing `POST` endpoints, including AI requests, return `405`; logout only clears the caller's session cookie. Use this mode only when all bundled datasets, concepts, and models are intended for anyone to read. Never route Coolify, SSH, databases, or other administration endpoints through the public tunnel.
- Gemini explanations are optional. Provider credentials stay on the server and are not included in API responses or browser storage. AI output is explanatory text, not NASA evidence or a measured result.
- Uploaded or imported data must retain its own provenance. The app must not attribute user data to NASA PSI unless the content is verified against the bundled source bytes.

## NASA source files

- Measurement tables are original NASA PSI Combustion Science experimental-table CSV files. The source manifest records file versions, byte counts, and SHA-256 values; the integrity audit fails on a mismatch.
- The local parser preserves each non-empty cell as source text and does not rewrite the original files, infer missing physical units, or pool investigations.
- Eight additional tables are public downloads whose PSI inventory response did not include DOI or rights metadata. The UI marks that information as unavailable and links to the NASA PSI record; it does not invent license claims.
- NASA technical reports, standards, and the challenge video are background references, not additional measurement rows.

## Operational limits

- Evidence priority is a discovery order, not a hazard score. Interpretations and suggested safety questions are not flight procedures, materials certification, or spacecraft fire-safety recommendations.
- Telemetry columns without an authoritative instrument calibration map remain text and are not labeled as calibrated temperature, heat release, oxygen, or flow measurements.
- Keep `.env` out of source control and use `.env.example` only for variable names and non-secret defaults. Never store API keys or passwords in source files, generated reports, or logs.

## Public read-only deployment review

This deployment mode is intentionally unauthenticated; the public content is the application itself, not a private workspace. Its security boundary is:

| STRIDE concern | Control and remaining exposure |
| --- | --- |
| Spoofing | No user identity or private account data is used by the public read-only pages. Private deployments continue to require the access-token session gate. |
| Tampering | Application-changing `POST` routes are rejected in public read-only mode. The public process serves the bundled source data and static assets. |
| Repudiation | Anonymous reads are not attributed to individual users; no private or user-generated records are accepted in this mode. |
| Information disclosure | All bundled research tables, source notes, and 3D models are public by design. Provider keys and access tokens must remain server-side. |
| Denial of service | Public model downloads and `GET` analysis requests consume the laptop's CPU and residential uplink. Keep the tunnel limited to this app, monitor resource use, and stop the tunnel if service load becomes disruptive. |
| Elevation of privilege | The container runs as the unprivileged `node` user. The public tunnel is host-routed to this app only; do not expose the Coolify dashboard, SSH, Docker socket, or databases. |

The current free Cloudflare Quick Tunnel has a random hostname and is not a durable domain: it works only while its tunnel process and host are running, and a replacement process can receive a different URL. A stable hostname requires a named Cloudflare Tunnel and a configured domain/account.

## Validation

Run `npm run data:audit` to verify all bundled NASA PSI source file sizes and SHA-256 hashes and regenerate the evidence inventory. Review changes to source manifests and interpretation code before release.
