# MORS AEGIS judging walkthrough

## 5-minute path

1. **Start at Overview.** State the question: how can decades of NASA reduced-gravity combustion evidence be organized into useful crew fire-safety insight? Identify the 2026 challenge video as an introduction to the prompt; use the written challenge brief and its linked PSI repository as the exact requirements and data source.
2. **Point out the objective checklist.** Show how the site maps the video’s three asks to its inventory/relevance heuristic, study-level data inspection for model building, and evidence-bounded prevention/detection/suppression insights.
3. **Open Challenge Evidence.** Show that all 24 NASA PSI Combustion Science investigations are indexed, 16 original experimental tables are bundled and hash-verified, and the summed rows are not pooled. Explain that the video's approximate 12 TB is repository-wide, while 9.16 TB is our partial subtotal for the 16 returned manifests. Open the archive inventory to show why multi-terabyte raw imagery/video payloads are linked rather than blindly mirrored.
4. **Inspect the ranking contract.** Explain that the mission-relevance score is topic match plus spaceflight/reduced-gravity context; table availability is shown separately and only breaks ties. It is not a danger, flammability or risk score. Click into objectives and approach to show metadata is distinct from results.
5. **Use Mission Atmospheres.** Compare the NASA Earth/ISS, Shuttle campout, exploration-atmosphere and EVA-suit reference cases. Show `pO₂ = xO₂ Ptotal`, note that the numbers are calculations rather than PSI measurements, and explain that similar dry pO₂ does not imply identical combustion conditions.
6. **Open Flame Physics.** Walk through buoyancy-driven hot-gas rise on Earth versus reduced buoyancy in microgravity. Use the PSI-22 electric-field demonstration to explain ion-driven flow as a separate forced transport mechanism, not lunar gravity. Emphasize that diffusion and fan-driven airflow remain. Label the inline diagrams as schematics.
7. **Inspect PSI-69 / FLEX.** Show a source row, original field names, checksum, DOI, missingness and the `d²`-law burning-rate definition. Keep fuel/composition/pressure context attached and call statistics descriptive.
8. **Finish on Safety Insights and Sources.** Summarize material qualification, ignition-source control, ventilation-aware smoke/CO detection and suppressant testing. Show both videos separately: the official 2026 challenge introduction and the 2018 NASA ScienceCasts context video. Distinguish each from NASA PSI experimental measurements.

## Scientific integrity lines to keep in the spoken demo

- Never imply the 1,329 rows are one experiment or that rankings represent danger.
- Never claim microgravity means no airflow; cabin fans and diffusion still transport heat/species.
- Never state NASA has one final oxygen-rich lunar cabin setting. The shown values are historical/design reference cases, and DCS mitigation depends on pressure transitions and prebreathe protocols.
- Never claim an Earth wildfire or space-weather API proves a spacecraft flame property; those old prototype feeds are excluded.
- Never call generated Copilot text a NASA measurement or a validated prediction.
- Do not promise a competition win. Demonstrate transparent sourcing, useful interaction, honest limits, and reproducibility.

## Offline and reproducibility

The evidence browser and physics views use bundled PSI snapshots. `npm run data:audit` rechecks source sizes/hashes and regenerates file/row quality metadata. PSI search/file-index scripts refresh metadata; `npm run data:tables` downloads only public `Experimental table` CSVs within the configured size limit. NTRS API documentation is linked for reference discovery, but no NTRS API corpus is included in analysis.
