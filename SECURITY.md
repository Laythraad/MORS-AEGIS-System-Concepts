# Security and data-handling notes

## Application boundary

- The Node.js application binds to `127.0.0.1` by default. It is a local research dashboard, not an authenticated public service. Do not expose it through a LAN listener, reverse proxy, or public tunnel without authentication and a deployment security review.
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

## Validation

Run `npm run data:audit` to verify all bundled NASA PSI source file sizes and SHA-256 hashes and regenerate the evidence inventory. Review changes to source manifests and interpretation code before release.
