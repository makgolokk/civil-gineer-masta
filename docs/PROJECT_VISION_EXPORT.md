# Project Vision Export

The Dream Project Planner exports branded Civil-Gineer Masta project briefs as:

- PDF (recommended client-facing format)
- DOCX (editable internal/client format)

The browser sends planner answers to the Python serverless endpoint at
`/api/project_vision`. The endpoint recalculates readiness and recommendations,
then returns the requested document as an attachment.

## Main Files

- `project_vision_export/formatting.py`: input normalization, readiness logic,
  design direction, service recommendations and safe filenames
- `project_vision_export/reference.py`: sortable collision-resistant references
- `project_vision_export/pdf_export.py`: ReportLab A4 PDF generation
- `project_vision_export/docx_export.py`: editable Word generation
- `project_vision_export/branding.py`: company settings, colours and logo path
- `api/project_vision.py`: Vercel-compatible HTTP endpoint
- `src/projectVisionExport.js`: frontend download client and error handling
- `scripts/generate_sample_project_vision.py`: reproducible sample generator
- `scripts/dev_project_vision_api.py`: lightweight local API server
- `tests/test_project_vision_export.py`: document and edge-case tests

## Dependencies

Install Python dependencies:

```powershell
python -m pip install -r requirements.txt
```

The production dependencies are:

- `reportlab`
- `python-docx`

## Local Development

Run the Python API:

```powershell
python scripts/dev_project_vision_api.py
```

Run Vite with the API URL:

```powershell
$env:VITE_PROJECT_VISION_API_URL="http://127.0.0.1:8787"
npm run dev
```

For a production-equivalent local environment, use `vercel dev`.

## Generate Samples

```powershell
python scripts/generate_sample_project_vision.py
```

Outputs are written to `samples/`.

## Tests

```powershell
python -m unittest discover -s tests -v
npx eslint src/App.jsx src/components/DreamProjectPlanner.jsx `
  src/components/PlannerStep.jsx src/components/PlannerSummary.jsx `
  src/components/PlannerOptionCard.jsx src/projectVisionExport.js
npm run build
```

The tests cover short and missing values, multiple features, special characters,
readiness scoring, long content, PDF readability and DOCX package integrity.

## References

Production references use a UTC timestamp plus an in-process sequence:

`CGM/PVS/YYYY/MMDDHHMMSSffffffNNNN`

This is sortable and collision-resistant across stateless serverless instances.
Strict gap-free numbering such as `0001`, `0002`, `0003` requires a shared
transactional datastore. If that becomes a compliance requirement, replace the
reference function with a database-backed sequence without changing the document
generators.

## Deployment

Vercel detects `api/project_vision.py` as a Python Function and installs
`requirements.txt`. `vercel.json` allows up to 60 seconds for cold starts and
document generation.

Deploy normally:

```powershell
npx vercel --prod --yes --scope kelesitse-makgolo-s-projects
```

After deployment, verify both formats:

1. Complete the Dream Project Planner.
2. Download the recommended PDF.
3. Download the editable Word document.
4. Confirm non-empty files, correct filenames and the branded header/footer.

If the Python service is unavailable, the frontend displays a retry message. It
does not silently return a plain-text or empty file.
