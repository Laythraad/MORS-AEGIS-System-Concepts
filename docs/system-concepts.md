# System Concepts: provenance and limits

This page incorporates the concepts and original model assets from Codex research chat `01a1d77e-6fa8-7c01-82a4-ca42dc8847c0` into a separate MORS AEGIS copy.

## Included

- **HARBOR perimeter observation concept:** the page serves the original `HARBOR-PERIMETER-SCAN-assembly.glb` and standalone ring from the Blender gallery. The saved clearance report records minimum sampled surface separation of `0.014995992 m` and no sampled BVH overlap for that pose. The report limits this to a visual CAD check; it does not cover tolerance, deflection, loads, installation envelope, thermal behavior, or qualification.
- **3D model archive:** all 41 GLB models (18.85 MB total), the Blender gallery, and its preview are included under `public/models/`. The browser viewer uses the locally bundled Google `<model-viewer>` package v4.4.0; its license is included under `public/vendor/`.
- **Extinction-pathway map:** a 2D conceptual map organizes candidate experimental variables around oxygen availability, forced flow, heat transfer, and fuel boundary conditions. It does not claim that changing any one variable will extinguish a fire. A controlled experiment would need a protocol, calibrated sensors, safety review, repeat trials, and analysis.
- **Methods and sources:** HARBOR, PULSE-MIST, VAPOR-TRACE and the extinction-pathway rig include selected method notes and OpenSCAD sources. NASA PSI-25/BASS-II, NASA NTRS SoFIE-GEL, NASA MIST and NASA FWM PFE references motivate research questions only. NASA did not test or endorse these MORS concepts. PSI-69 droplet burning-rate data do not establish solid-material behavior or validate the concepts.

## Next engineering work

1. Resolve all remaining interface, tolerance, and load questions with explicit engineering requirements.
2. Define the experimental question and one-variable-at-a-time or factorial protocol.
3. Document sensor calibration, uncertainty, safe operating envelope, repeatability, and raw data provenance.
4. Only after appropriate bench validation, assess whether any concept merits higher-fidelity engineering or qualification.
