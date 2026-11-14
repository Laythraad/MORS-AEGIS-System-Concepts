# Data inventory and source boundary

## Primary challenge evidence

The NASA Space Apps challenge names the NASA Physical Sciences Informatics (PSI) Combustion Science repository as the experimental-data source. This product uses NASA PSI investigation metadata and files only for its experiment measurements. Data from Earth-fire, space-weather, astronomy, or another Space Apps challenge is not ingested into the analysis.

| Evidence layer | Source | Current local coverage | Handling |
|---|---|---:|---|
| Investigation metadata | NASA PSI Combustion Science search endpoint | 24 records | Snapshot preserved in `ms02-connectors/challenge-data/psi_combustion_inventory.json`; goals/methods remain metadata, not measured outcomes |
| PSI file manifests | NASA PSI `geode-py/ws/files/v2` endpoint | 16/24 manifests returned; 8 returned no listing | Metadata only: filename, category, advertised size, file version, status, and file ID in `psi_file_index.json` |
| Experimental tables | NASA PSI `Experimental table` CSV files | 16 tables, 1,329 separate rows | Original bytes preserved and SHA-256 checked; source strings retained; unlike investigations are never pooled |
| Selected PSI supporting assets | PSI-98 and PSI-100 files attached to those investigations | 8 assets | Checksummed; telemetry channels remain uncalibrated strings, and dark JPEGs are not treated as flame imagery |
| NASA context | Official challenge resources, NASA handbooks/standards, cited NASA technical papers | Curated links and documented claims | Context only; never presented as added experiment rows |
| NASA NTRS API | API documentation and selected publication links | No report dataset harvested | Explicitly not part of measured-data corpus |

## PSI archive extent and download decision

The successfully returned study manifests list 36,490 files. Their metadata-reported sizes sum to approximately 9.16 TB, with 35,726 files classified as `Raw Data` (about 9.15 TB). The rest include analyzed-data spreadsheets, calibration files, science/engineering documents, reports, and presentations. File-listing requests did not download those payloads. The current package selectively includes the small official experiment tables plus eight supporting items; it does not mirror the multi-terabyte image/video archive.

The eight records without a manifest in this snapshot are **not** proof of absent NASA data. Their investigation metadata and official PSI links remain visible, and the UI says the file index was unavailable rather than claiming “no data.” Refresh the index before treating this inventory as current.

## APIs and retrieval

- NASA PSI investigation search endpoint: used by `npm run data:inventory` to refresh the 24-record metadata snapshot.
- NASA PSI file-manifest endpoint `https://psi.nasa.gov/geode-py/ws/files/v2`: used by `npm run data:file-index` to enumerate study file metadata; this call does not download files.
- NASA PSI file download endpoint: `npm run data:tables` fetches only missing public CSV files whose category is exactly `Experimental table`, checking advertised byte size and source-file version.
- NASA NTRS: selected report URLs provide methods/atmosphere context. The public API documentation is linked, but no NTRS API corpus has been fetched or merged with PSI.
- NASA FIRMS, NASA DONKI and NOAA SWPC were present in an earlier prototype but are excluded from the active app: they do not measure spacecraft microgravity combustion.

## Reproduction and integrity

Run `npm run data:audit` to verify every bundled table/asset against `source_manifest.json` and regenerate `quality_report.json`. Source rows are parsed without changing original files; blank cells become `null` in parsed output, while nonempty cells stay strings. Row totals are inventory counts, not one harmonized sample. Each investigation’s apparatus, units, fuel/material, atmospheric conditions, and outcome definition remain source-specific.

See [challenge data review](CHALLENGE_DATA_REVIEW.md), [SAFFIRE source review](SAFFIRE_SOURCE_REVIEW.md), and [challenge brief/video review](CHALLENGE_BRIEF_AND_VIDEO.md) for the scientific interpretations and limitations.
