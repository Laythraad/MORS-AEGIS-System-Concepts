# Changelog

## 3.0.0-alpha.6 — 2026-11-15

- Removed the login gate from public read-only deployments so judges can open research pages directly.
- Kept all application-changing API requests disabled in public read-only mode.

## 3.0.0-alpha.5 — 2026-11-15

- Fixed trusted-origin checks behind Coolify and Cloudflare Tunnel when the proxy's internal Host differs from the public browser origin.
- Preserved exact-origin allowlisting and cross-site request rejection.

## 3.0.0-alpha.4 — 2026-11-15

- Added a minimal unauthenticated `/healthz` liveness endpoint for Coolify; it reports only `status: ok` and reveals no configuration details.
- Updated the backup deployment health check to use `/healthz`, avoiding false failures from the access-token gate on `/api/health`.

## 3.0.0-alpha.3 — 2026-11-15

- Added NASA BASS forced-airflow versus flame-spread chart, with plotted points marked as approximate figure digitization.
- Added NASA gravity-regime versus flame-sphericity comparison, clearly distinguishing a measured point from an approximate model read-off.
- Added source provenance, methods, and limitations for supplemental NASA studies to the Sources page.
- Established pre-change ZIP backups, immutable Git backup tags, and versioned release tags.

## 3.0.0-alpha.2 — 2026-11-14

- Added the NASA PSI research interface improvements and evidence-linked visualizations present in the baseline commit.

