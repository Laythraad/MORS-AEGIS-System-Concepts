param(
  [string]$BackupRoot = (Join-Path (Split-Path -Parent $PSScriptRoot) 'backups\versions')
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
Push-Location $repo
try {
  $dirty = git status --porcelain
  if ($LASTEXITCODE -ne 0) { throw 'Could not inspect Git status.' }
  if ($dirty) { throw 'Working tree is not clean. Commit or preserve current edits before making a pre-change backup.' }

  $package = Get-Content (Join-Path $repo 'package.json') -Raw | ConvertFrom-Json
  $version = [string]$package.version
  if (-not $version) { throw 'package.json has no version.' }
  $commit = (git rev-parse HEAD).Trim()
  if ($LASTEXITCODE -ne 0) { throw 'Could not resolve the current commit.' }
  $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
  $tag = "backup/pre-v$version-$stamp"
  $safeVersion = $version -replace '[^A-Za-z0-9.-]', '-'

  New-Item -ItemType Directory -Force -Path $BackupRoot | Out-Null
  $archive = Join-Path $BackupRoot "mors-aegis-v$safeVersion-prechange-$stamp.zip"
  git archive --format=zip --prefix="mors-aegis-v$safeVersion/" $commit -o $archive
  if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $archive)) { throw 'Could not create the source ZIP backup.' }
  if ((Get-Item -LiteralPath $archive).Length -lt 1024) { throw 'Backup ZIP is unexpectedly small; refusing to continue.' }

  git tag -a $tag $commit -m "Pre-change backup for MORS AEGIS v$version"
  if ($LASTEXITCODE -ne 0) { throw "Could not create backup tag $tag." }

  Write-Output "Backup archive: $archive"
  Write-Output "Backup tag: $tag"
  Write-Output "Source commit: $commit"
} finally {
  Pop-Location
}
