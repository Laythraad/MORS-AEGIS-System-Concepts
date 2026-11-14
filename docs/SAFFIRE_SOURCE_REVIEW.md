# SAFFIRE source-file review

This review examines the PSI-98 SAFFIRE-I and PSI-100 SAFFIRE-III operations, image-nomenclature, and combined science readme files bundled in [`challenge-data/raw`](../ms02-connectors/challenge-data/raw/). Their NASA PSI records are [PSI-98, DOI 10.60555/0t15-1z43](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98) and [PSI-100, DOI 10.60555/040q-4h36](https://psi.nasa.gov/physci/repo/data/investigations/PSI-100).

## What the source documents establish

- SAFFIRE-I and SAFFIRE-III used one large SIBAL sample, approximately 0.4 m wide by 0.94 m tall, to study large-scale low-gravity fire development and spread. The PSI-98 table has two actual sample rows plus F1/F2 flow-visualisation entries; the PSI-100 experimental table has two sample-condition rows.
- The combined README identifies SIBAL as cotton on fiberglass (75% cotton, 25% fiberglass by weight). It reports nominal airflow of 20 cm/s for SAFFIRE-I and 30 cm/s for SAFFIRE-III. Because the investigations differ in flight, table fields, and potentially other conditions, the two table rows per investigation do not form a controlled estimate of an airflow effect.
- SAFFIRE-II used nine smaller samples, listed as 5 cm wide × 25 cm long, burned sequentially. These dimensions and count come from the operations documentation, not from the two large-sample tables.
- The operations documents say each investigation was run after Cygnus departed the ISS, with data recorded/compressed and then downlinked; the craft was deorbited after the experiment. This explains the data package context, not a scientific fire outcome.
- The readme describes PSI image-directory IDs: `S#` denotes sample imagery; `F1` is pre-flow and `F2` post-flow; `C1`/`C2` denote camera numbers. PSI-98's source table also labels F1/F2 as pre-test flow visualisation.
- NASA's image processing nomenclature distinguishes original camera files, offset-corrected distribution masters, demosaiced TIFFs, distortion-mapped sets, and images annotated with exposure/gain metadata. These products are not interchangeable. An image-analysis workflow must retain product type, camera, sample/run, exposure/gain, and distortion processing.
- The readme warns that some PSI image sets exceed 10,000 frames. The bundled PSI-98 JPEG archive contains only three frames. Visual inspection finds them very dark, green, apparatus/field-like images with no clearly discernible flame. They are not used as flame detections or as a direct Earth-versus-space comparison.

## What the project can responsibly conclude

The tables establish test material, orientation, airflow, oxygen entries where reported, burn duration where reported, and image identifiers. The files do not by themselves provide a consistent, calibrated pixel time series or enough matched repeated trials to estimate a robust spread-rate response across all runs. The current flame illustration is therefore explicitly a schematic. Any later computer-vision result must first document image-set type, temporal spacing, camera calibration/distortion, exposure/gain, sample geometry, and a validated flame mask.

## Design implications for the dashboard

1. Show `sample`, `pre-flow`, `post-flow`, `raw`, `mapped`, `demosaiced`, and `exposure/gain annotated` as distinct evidence types.
2. Compare the nominal 20 and 30 cm/s SIBAL conditions only as separate investigation context; do not label their two-point difference a causal airflow effect.
3. Treat flow-only frames as flow visualisation, not fire.
4. Keep the image ZIP's checksum and its PSI DOI attached to every local derivative.
5. Do not display the three low-visibility JPEGs as representative microgravity flames.

