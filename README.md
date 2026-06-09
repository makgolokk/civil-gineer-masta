# Civil-Gineer Masta

Civil-Gineer Masta's public website and Dream Project Planner. The application is
built with React and Vite, with Python serverless functions for project-vision
document exports and direct enquiry delivery.

## Local Development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm test
npm run build
python -m unittest discover -s tests -v
```

## Enquiry Delivery

The `/api/enquiry` function sends new enquiries through Resend. Configure these
environment variables in Vercel:

- `RESEND_API_KEY`
- `ENQUIRY_TO_EMAIL`
- `ENQUIRY_FROM_EMAIL`

`ENQUIRY_FROM_EMAIL` must use a sender/domain verified in Resend for production
delivery. See [.env.example](.env.example) for the expected format.

Without these variables, the form presents a direct-email fallback rather than
silently losing the enquiry.

Planner-originated enquiries include the structured project data. The server
generates a fresh branded PDF and attaches it to the review-team email, so the
team receives the same professional brief without relying on the client to
forward their downloaded copy.

## Planner Analytics

Planner and enquiry funnel events are emitted in two ways:

- Pushed to `window.dataLayer` when a data layer is available.
- Dispatched as `cgm:analytics` browser events.

No names, phone numbers, email addresses, locations, or free-text descriptions
are included in analytics payloads.

## Project Vision Exports

The `/api/project_vision` function creates branded PDF and Word summaries. Export
formatting and readiness rules are covered by the Python test suite.
