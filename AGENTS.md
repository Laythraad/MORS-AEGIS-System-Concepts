# MORS AEGIS project rules

- Before editing tracked project files, require a clean Git working tree and run `pwsh -File scripts/backup-current-version.ps1`. This creates a ZIP snapshot and an annotated `backup/pre-v...` tag for the exact prior state.
- For each completed user-facing change, increment the SemVer prerelease in `package.json`, show the same version in `public/index.html`, and add a dated entry to `CHANGELOG.md`.
- Build the client, commit the release state, and add an annotated `v<package-version>` tag. Keep earlier version and backup tags; never move or delete them.
- When publishing is part of the user's request or established authorization, push the branch and the new tags to the configured competition remote. A Git push does not deploy Coolify; state that separately.
- Do not put secrets in a version archive, Git tag, changelog, or commit.

