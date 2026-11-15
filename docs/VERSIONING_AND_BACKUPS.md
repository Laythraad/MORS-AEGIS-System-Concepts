# MORS AEGIS versions and backups

## What is kept

- `vX.Y.Z...` annotated Git tags are immutable application releases. Pushing a tag to GitHub gives the team a source snapshot for that exact commit.
- `backup/pre-vX.Y.Z...` annotated tags mark the exact repository state immediately before a new change.
- `backups/versions/*.zip` is a local ZIP copy of that pre-change state. This folder is intentionally ignored by Git so large backup archives do not inflate the source repository. Keep a copy on a separate disk or cloud backup if protection from computer or disk failure is needed.
- `CHANGELOG.md` records user-visible changes by application version.

## Before every change

1. Confirm `git status --short` is empty. Commit or safely preserve any in-progress change first.
2. Run `pwsh -File scripts/backup-current-version.ps1`.
3. Confirm the script reports both the ZIP path and backup tag. Do not edit project files if snapshot creation fails.
4. Make the requested change, update `package.json`, `public/index.html`, and `CHANGELOG.md` to the next prerelease version, and run `npm run build:client`.
5. Commit the complete release, create an annotated tag named exactly `v<package.json version>`, then push the branch and tags when publishing is authorized.

Use prerelease increments such as `3.0.0-alpha.3`, `3.0.0-alpha.4`, and so on until the release is stable. Do not overwrite old tags. If deployment is manual, verify Coolify reports the same release commit after deployment.

## Current release trail

- `v3.0.0-alpha.2`: baseline before the supplemental NASA plots.
- `backup/pre-v3.0.0-alpha.3-20261115-034254`: exact pre-versioning working release snapshot.
- `v3.0.0-alpha.3`: source-linked supplemental NASA plots and versioning workflow.

