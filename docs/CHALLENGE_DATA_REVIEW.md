# Flame in Freefall: challenge data review

**Review date:** 2026-11-14  
**Primary source:** NASA Physical Sciences Informatics (PSI), Combustion Science  
**Challenge:** [Flame in Freefall: SI-Powered Fire Safety Insights from Microgravity Combustion Data](https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/?tab=resources)

## Scope decision

The product's experimental evidence is restricted to the challenge-relevant NASA PSI combustion investigations bundled below. The project does not ingest another Space Apps challenge's dataset. Earth-observation fire detections, geomagnetic/space-weather feeds, and unrelated astronomy/quantum demonstrations have been removed from the active application.

The PSI repository does not provide these investigations as one harmonized experiment table. Each table has its own apparatus, material/fuel, fields, units, and measurement purpose. The application therefore keeps every investigation separate. The search snapshot has 24 records; the file-manifest endpoint returned listings for 16, each with one `Experimental table` CSV. All 16 tables are bundled. The other eight study-manifest lookups returned no listing in this snapshot, which does not prove those investigations have no files. We retain their official metadata and links and show their manifest status separately.

The successful manifests enumerate 36,490 files with a combined reported size of approximately 9.16 TB across the 16 study manifests that returned a listing. Of these, 35,726 are in `Raw Data` (about 9.15 TB); other categories include 201 analyzed-data files, 183 calibration items, 153 engineering documents, and 63 science documents. The file listing is metadata only: it reports names, categories and advertised sizes, and this step did not download these files. In the official challenge video, the PSI lead describes the repository as containing 24 investigations and approximately 12 TB. These are different coverage snapshots: eight PSI manifest lookups did not return a listing locally, so 9.16 TB is a partial listing subtotal, not a replacement for or contradiction of the video's rounded repository-wide figure. The app bundles the 16 experiment tables and eight manually selected PSI assets. This keeps the source corpus discoverable while avoiding a blind multi-terabyte download. The exact metadata snapshot is `ms02-connectors/challenge-data/psi_file_index.json`.

## Primary investigation tables

| NASA PSI ID | Investigation | Source rows | Row interpretation and analysis boundary | DOI |
|---|---|---:|---|---|
| PSI-20 | ACME Burning Rate Emulator (BRE) | 18 | Day-level summary with burner size, fuel bottle, oxygen concentrations and flames ignited. The table includes concentration tokens 21, 25, 26.5, 34, 40 and malformed strings `2100%` / `3400%`; they are preserved verbatim. Not a row-per-flame outcome table; pressure is not resolved in this summary. | Not provided in inventory metadata |
| PSI-21 | ACME Coflow Laminar Diffusion (CLD) Flame | 32 | Day-level flame ignition summary and MFC/concentration descriptions. Preserve source labels such as `CH5`/`CH6`; do not autocorrect them to fuels without source confirmation. | Not provided in inventory metadata |
| PSI-22 | ACME Electric-Field Flames | 32 | Table includes test round, day, mesh polarity, fuel concentration, and ignition counts. Blank/comment rows remain visible; it is not a row-per-individual-flame dataset. | Not provided in inventory metadata |
| PSI-23 | ACME spherical diffusion flame (s-Flame) | 18 | Day-level ignition summaries. Preserve potentially malformed source strings such as `N3`/`N4`; the table does not give individual flame measurements. | Not provided in inventory metadata |
| PSI-25 | Burning and Suppression of Solids-II (BASS-II) | 129 | Table includes material/test labels, fan/air displays, calibrated initial/final O₂, CO₂ and CO fields. Treat instrument display values according to their source labels; do not infer velocity or heat flux from a display without a calibration map. | [10.60555/4qc4-de67](https://doi.org/10.60555/4qc4-de67) |
| PSI-26 | Burning and Suppression of Solids (BASS) | 122 | Six-column table is primarily test/sample/material metadata; it does not include the burn metrics needed for a numerical fire-growth model. | [10.60555/58h4-dy80](https://doi.org/10.60555/58h4-dy80) |
| PSI-39 | Cool Flames Investigation (CFI) | 87 | Test-condition entries report pressure, oxygen/nitrogen/helium fractions, fiber, and fuel. These fields identify conditions and materials; the table has no flame-spread or extinction outcome column. CFI is distinct from the Combustion Integrated Rack (CIR) hardware. | Not provided in inventory metadata |
| PSI-47 | Dust and Aerosol Measurement Feasibility Test (DAFT) | 2 | Two dust/aerosol sampling session descriptions. This is detector/environment context, not a flame test or combustion outcome. | Not provided in inventory metadata |
| PSI-68 | Flame Extinguishment Experiment-2 (FLEX-2) | 8 | Test envelope lists droplet fuels, gas mixtures, oxygen fractions, pressure, temperature, and flow ranges; ranges are not individual measured test rows. | Not provided in inventory metadata |
| PSI-69 | Flame Extinguishment Experiment (FLEX) | 274 | Liquid-droplet tests with fuel, pressure, gas composition, droplet diameters, burn duration/rate and terminal test labels. Detailed statistical analysis is restricted to FLEX and stratified by its reported test conditions. | [10.60555/mbq8-0451](https://doi.org/10.60555/mbq8-0451) |
| PSI-98 | Spacecraft Fire Safety Experiment-I (SAFFIRE-I) | 4 | Two material-fire samples plus two pre-test flow-visualisation references; the four physical rows are not four burns. | [10.60555/0t15-1z43](https://doi.org/10.60555/0t15-1z43) |
| PSI-99 | Spacecraft Fire Experiment-II (SAFFIRE-II) | 15 | Nine numbered sample entries, two flow-visualisation references, and four explanatory note rows. Preserve the source header `?-g`; do not silently relabel it as `0-g` until file-level nomenclature is verified. | [10.60555/2chp-m469](https://doi.org/10.60555/2chp-m469) |
| PSI-100 | Spacecraft Fire Experiment-III (SAFFIRE-III) | 2 | Two SIBAL sample-condition rows, with 30 cm/s airflow and concurrent/opposed direction labels. This table describes conditions, not measured flame-spread outcomes. | [10.60555/040q-4h36](https://doi.org/10.60555/040q-4h36) |
| PSI-101 | Smoke Aerosol Measurement Experiment-Reflight (SAME-R) | 109 | Smoke/aerosol experiment entries with sample type, inlet velocity, `Rt/R0`, and aging/mixing fields. These are aerosol/detection evidence, not interchangeable flame-spread measurements. | [10.60555/2np7-jv14](https://doi.org/10.60555/2np7-jv14) |
| PSI-102 | Smoke and Aerosol Measurement Experiment (SAME) | 8 | Four rows have numeric Teflon weight-loss measurements; four material rows say “same conditions as 1-4” and have no separate numeric result. Keep those reference rows instead of inventing values. | [10.60555/gd4k-8h62](https://doi.org/10.60555/gd4k-8h62) |
| PSI-107 | Smoke Point In Co-flow Experiment (SPICE) | 469 | Test-log rows include ethylene ignition/flame-off times, nozzle, fuel-rate, and air-rate fields. The file does not establish a universally comparable flame-spread metric; retain test conditions and source chronology. | Not provided in inventory metadata |

Each original byte stream is retained under `ms02-connectors/challenge-data/raw/`, and every file's byte count and SHA-256 are checked against `ms02-connectors/challenge-data/source_manifest.json`. Eight previously selected tables have CC0-1.0 recorded; the PSI inventory response does not provide rights metadata for the eight additionally indexed tables, so the app links back to each NASA PSI record rather than inventing a license or DOI.

## Additional source assets

Eight files are attached to the same PSI investigations: two PSI-100 raw telemetry CSV exports (3,972 × 47 and 11,450 × 47 rows/fields), the PSI-98 image ZIP, PSI-98 and PSI-100 operating/nomenclature documents, and the PSI-98 combined readme. The PSI-100 telemetry cells are retained as strings. Their channel names are not converted into temperature, heat-release, or flow units without an instrument-to-column calibration map. The image archive is not treated as a calibrated flame movie until its directory nomenclature and frame timing are checked.

## Reproducible cleaning and validation

1. Preserve the downloaded original bytes unchanged.
2. Verify source byte count and SHA-256 for every bundled table and selected asset.
3. Parse CSV with quoted-field/newline handling; trim only outer whitespace and convert empty cells to `null` in the parsed view. Keep every non-empty source cell as a string.
4. Record source table row count, source field names, per-field missingness, and strictly numeric-looking ranges as a schema audit only. Numeric-looking fields are not automatically assigned physical units.
5. Classify explicit SAFFIRE non-test rows (image references and footnotes) and SAME cross-reference rows while keeping them visible.
6. Do not impute missing values, change source labels, harmonize studies, or compute pooled cross-investigation averages.

Run `npm run data:audit` to regenerate `ms02-connectors/challenge-data/quality_report.json`. `npm run data:file-index` refreshes the listed-file metadata and table versions without fetching file payloads; `npm run data:tables` fetches only missing public `Experimental table` CSVs and verifies their advertised file sizes. The regression suite covers the 16 bundled source IDs, source row counts, selected asset integrity, PSI-98/99/102 source-row classes, and rejection of out-of-scope dataset IDs.

## Findings that the current evidence supports

- **Oxygen is a condition, not a standalone predictor.** PSI-25's reported calibrated initial O₂ field spans 13.6–22.2 % by volume in this table. That range is an inventory of observed test settings, not a controlled causal comparison across materials, airflow and ignition conditions.
- **Interpret PSI-25 CO readings as chamber samples, not cabin peaks.** NASA/TM-20210011385 reports initial/final readings from a 0–1,000 ppm CO sensor in the 250-L Microgravity Science Glovebox working volume; one test exceeded the sensor range. A table value such as 950 ppm is an endpoint reading, not a time-resolved peak or ISS-wide concentration. The report estimates about 1.5 ppm after dilution of a BASS-II-scale burn into the 106-m³ U.S. Lab volume; that is a calculation, not an in-situ cabin measurement. Source: [NASA BASS-II Summary Report, §§1.2–1.4 and Table A.5](https://ntrs.nasa.gov/citations/20210011385).
- **BRE includes oxygen levels relevant to exploration-atmosphere questions.** PSI-20 records test-day concentration labels including 21%, 25%, 26.5%, 34% and 40%. Its notes say pressure varied but the summary does not tie pressure to each day; two labels are malformed (`2100%`, `3400%`). These are source-quality and experiment-coverage observations, not evidence that any single atmosphere caused more ignition or that a flammability threshold was reached.
- **FLEX experiments vary substantially.** The source table includes multiple fuels and oxygen/inert-gas mixtures, as well as ambient pressures from near-vacuum-looking transcription values up to 2,319.9 mmHg. A zero pressure entry is physically suspect and is flagged as missing by the legacy FLEX normalization; the immutable challenge-source CSV remains available for review. Do not read the PSI-69 pooled mean as “the” spacecraft flame rate.
- **The FLEX “burning rate” is a droplet (d^2)-law constant.** NASA's FLEX report defines it as the average rate constant from a linear fit of droplet diameter squared against time and labels the table unit mm²/s. This definition applies to the liquid-droplet experiment, not to solid-fuel flame-spread velocity. See [NASA/TP-2015-216046, Appendix A](https://ntrs.nasa.gov/api/citations/20150023456/downloads/20150023456.pdf).
- **A visible flame ending does not prove all oxidation stopped.** NASA's FLEX publications describe post-visible-flame cool-flame/vapor-cloud behavior for some tests. The interface must distinguish visible-flame extinction from total chemical extinction.
- **SAME's four numeric Teflon weight-loss values** are 2, 1, 2, and 2 mg/min (descriptive mean 1.75 mg/min). The rows do not share identical duration and airflow settings; the single 10 cm/s row cannot support an airflow-effect estimate.
- **The SAFFIRE tables have few measured outcome rows.** PSI-98 contributes two burn samples; PSI-99's table contains sample values mixed with references/notes; PSI-100 lists only two conditions. A dashboard can expose these findings and evidence gaps, but cannot claim a robust cross-study model from them alone.
- **SPICE clock fields need a chronology check.** PSI-107 has 469 source rows but only 118 unique date/ignition/flame-off clock pairs. Three pairs list flame-off earlier than ignition and are flagged rather than wrapped across midnight or corrected. For the 115 pairs with non-negative same-day differences, the derived interval has median 85 s (range 17–655 s). The source repeats time pairs across multiple condition rows, so this is a deduplicated clock audit—not a count of independent fires, a calibrated spread rate, or proof that every logged interval is a burn duration.

These are descriptive findings from source tables. They do not establish causality, model spacecraft risk, or certify a suppressant.

## Physics used in the application

### Gravity and fluid transport

On Earth, density differences caused by heating can drive buoyant natural convection. In microgravity this buoyancy-driven component is strongly reduced, so molecular diffusion and vehicle ventilation/forced flow become more important. This does **not** mean all air motion vanishes: fans, pressure-driven flow, fuel motion, and diffusion still transport heat and species. A flame may be rounded under quiescent conditions, but imposed ventilation changes its shape and spread.

- Grashof number: `Gr = g β ΔT L³ / ν²` — buoyancy relative to viscous effects. As effective acceleration `g` becomes very small, buoyant forcing decreases.
- Péclet number: `Pe = U L / D` — bulk advection relative to molecular diffusion. `U` can remain nonzero because cabin ventilation is forced.
- FLEX droplet burning: `D²(t) = D₀² − Kt` is a model relation under the appropriate quasi-steady droplet assumptions. `K` is condition-dependent and must not be reused as a solid-fuel flame-spread speed.
- Oxygen partial pressure: `pO₂ = xO₂ × Ptotal`. Oxygen fraction by itself does not describe the complete flammability condition.

For the Mission Atmospheres page, dry-gas oxygen partial pressure is calculated from NASA-published context conditions: Earth/ISS reference `14.7 psia × 21% = 3.09 psia`; shuttle campout `10.2 psia × 26.5% = 2.70 psia`; exploration-atmosphere concept `8.2 psia × 34% = 2.79 psia`; EVA suit reference `4.3 psia × 100% = 4.30 psia`. These are transparent derived values, not PSI experiment rows or prescriptions. The exploration atmosphere is a design-study scenario; EVA denitrogenation and decompression-sickness risk depend on pressure, inert-gas washout, breathing protocol and timing, not on a single oxygen number. Physiological inspired oxygen also accounts for water vapour. Combustion equivalence cannot be inferred from similar `pO₂`: oxygen volume fraction, total pressure, diluent, fuel/material, geometry, flow and ignition all matter. See [NASA OCHMO-TB-003](https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf), [NASA's 2026 exploration-atmosphere presentation](https://ntrs.nasa.gov/citations/20260001966), and [NASA-STD-3001 Volume 2](https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf).

The diagrams in the Flame Physics page are explicitly labelled schematics, not experimental frames. The interactive chamber is a CSS 3D concept illustration: its Earth/microgravity and fan toggles explain qualitative transport only; it is not CFD, measured geometry, a NASA frame, or a tested suppressant. Its airflow cannot be read quantitatively. Background: [NASA combustion and fire safety](https://www.nasa.gov/missions/station/studying-combustion-and-fire-safety/) and [NASA OCHMO-TB-008 Fire Protection](https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf).

The Overview's PSI-69 scatter plot places each source row's reported oxygen mole fraction against its reported liquid-droplet d²-law burning-rate constant. Fuel and pressure selectors filter rows; pressure cut points (760 and 1,520 mmHg) are UI bins, not NASA-designated safety thresholds. The plot does not fit a trend line or claim causality. The Challenge Evidence page's coverage matrix is a review-coded guide derived from the investigation table review above: **Measured** means the table contains a direct reported value/outcome in that domain; **Limited** means rows are few, indirect, or mixed with non-test entries; **Conditions** means the file records settings/metadata but no direct outcome for that domain; **—** means no local bundled evidence is assigned to that domain. The matrix covers only bundled tables and is not a measure of system performance or evidence quality.

### Oxygen and decompression sickness

Lower cabin pressure can require a higher oxygen fraction to preserve an acceptable oxygen partial pressure, while oxygen-rich atmospheres can make ignition and burning more hazardous. NASA-STD-3001 describes that trade-off and requires atmosphere composition to be considered with total pressure. Decompression-sickness risk before EVA is addressed through pressure/denitrogenation protocols and timing; it is not a rationale for unrestricted oxygen enrichment. The dashboard must state this carefully and must not prescribe crew atmosphere settings. Reference: [NASA-STD-3001 Volume 2, Revision F](https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf).

## Fire-safety implications and candidate mitigations

These are design questions supported by the cited NASA research, not operational prescriptions:

- Qualify cabin materials across relevant oxygen fraction **and** total-pressure scenarios; oxygen-enriched atmospheres can make some materials burn that are difficult to ignite in ordinary air.
- Test realistic ventilation states and directions, including low forced flow and flow changes; a fan can transport oxygen and smoke even when buoyant flow is negligible.
- Validate detector placement in ventilation paths and trend gases such as CO; smoke does not reliably rise to a ceiling in microgravity.
- Evaluate prevention, detection, response, and suppression together. For suppressant studies, report the tested fuel/material, oxygen fraction, total pressure, apparatus, flow, and outcome before drawing transfer conclusions.
- Use an evidence-gap ledger to prevent a small NASA PSI table from becoming a false universal safety ranking.

The standard/handbook and investigation DOIs must be shown beside claims. The tool is research decision support only, not spacecraft flight software.

## Out of scope

NASA FIRMS Earth-fire hotspots, NOAA SWPC geomagnetic data, NASA DONKI solar-event feeds, unrelated challenges, and synthetic habitat telemetry are not inputs to the active challenge product. They cannot validate a microgravity flame or crew fire hazard. NASA NTRS is linked for selected scientific background; no NTRS API dataset has been mixed into the PSI measurements. NASA PSI repository pages are public records; the current acquisition is a set of bundled, checksummed source files and does not claim the PSI site is a live REST API.
