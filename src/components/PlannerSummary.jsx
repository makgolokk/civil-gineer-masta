import {
  CalendarCheck,
  FileDown,
  FileText,
  MessageCircle,
  PhoneCall,
} from "lucide-react";
import { whatsappNumber } from "../siteContent";

const summaryLabels = [
  ["Project Type", (answers) => answers.projectType],
  ["Project Location", (answers) => answers.projectDetails.location],
  ["Preferred Style", (answers) => answers.style],
  ["Lifestyle Goal", (answers) => answers.lifestyle],
  ["Selected Features", (answers) => answers.features.join(", ")],
  ["Project Scale", (answers) =>
    [
      answers.projectDetails.floorArea,
      answers.projectDetails.bedrooms,
      answers.projectDetails.bathrooms,
      answers.projectDetails.storeys,
    ]
      .filter(Boolean)
      .join(" | ")],
  ["Current Stage", (answers) => answers.stage],
  ["Timeline", (answers) => answers.timeline],
  ["Budget Direction", (answers) => answers.budget],
];

export default function PlannerSummary({
  answers,
  designDirection,
  exportState,
  onContact,
  onDownload,
  readinessScore,
  recommendedService,
}) {
  const readinessChecks = [
    {
      complete: answers.stage === "I own land",
      label: "Land or site secured",
    },
    {
      complete: answers.stage === "I already have a design",
      label: "Existing design available",
    },
    {
      complete: ["Immediately", "Within 3 months"].includes(answers.timeline),
      label: "Near-term start planned",
    },
    {
      complete: answers.budget && answers.budget !== "Not sure yet",
      label: "Budget direction defined",
    },
    {
      complete: answers.features.length >= 3,
      label: "Key requirements identified",
    },
  ];
  const whatsappText = [
    "Hello Civil-Gineer Masta, I completed the Dream Project Planner and I would like a consultation.",
    "",
    `Project type: ${answers.projectType}`,
    `Preferred style: ${answers.style}`,
    `Project location: ${answers.projectDetails.location}`,
    `Project scale: ${[
      answers.projectDetails.floorArea,
      answers.projectDetails.bedrooms,
      answers.projectDetails.bathrooms,
      answers.projectDetails.storeys,
    ]
      .filter(Boolean)
      .join(", ")}`,
    `Features: ${answers.features.join(", ") || "To be discussed"}`,
    `Budget direction: ${answers.budget}`,
    `Timeline: ${answers.timeline}`,
  ].join("\n");

  const nextStep =
    readinessScore >= 70
      ? "Book a consultation to confirm the brief, site requirements and professional scope."
      : readinessScore >= 40
        ? "Arrange an early consultation to refine the concept, budget and project pathway."
        : "Start with a discovery consultation to turn the idea into a practical project brief.";

  return (
    <div className="plannerSummary">
      <div className="plannerSummaryHero">
        <div>
          <span className="plannerEyebrow">You have done the important thinking</span>
          <h3>Your Project Now Has a Clearer Starting Point</h3>
          <p>
            You now have more than an idea: you have a structured brief showing what
            matters, what professional support fits, and what to discuss next.
          </p>
        </div>

        <div
          className="readinessScore"
          style={{ "--readiness": `${readinessScore * 3.6}deg` }}
        >
          <span>
            <strong>{readinessScore}</strong>
            <small>/ 100</small>
          </span>
          <p>Planning readiness</p>
        </div>
      </div>

      <div className="readinessExplanation">
        <div>
          <strong>What this score means</strong>
          <p>
            It reflects how much early planning information is already available. It
            is not an engineering assessment, quotation, or approval decision.
          </p>
        </div>
        <ul>
          {readinessChecks.map((item) => (
            <li className={item.complete ? "isComplete" : ""} key={item.label}>
              <span aria-hidden="true">{item.complete ? "\u2713" : "\u2022"}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="plannerSummaryGrid">
        {summaryLabels.map(([label, getValue]) => (
          <div className="summaryDetail" key={label}>
            <span>{label}</span>
            <strong>{getValue(answers) || "To be discussed"}</strong>
          </div>
        ))}
      </div>

      <div className="plannerRecommendationGrid">
        <article>
          <span>Recommended Design Direction</span>
          <h4>{designDirection}</h4>
        </article>
        <article>
          <span>Suggested Civil-Gineer Masta Service</span>
          <h4>{recommendedService}</h4>
        </article>
        <article>
          <span>Recommended Next Step</span>
          <h4>{nextStep}</h4>
        </article>
      </div>

      <div className="plannerConversionPanel">
        <div>
          <span className="plannerEyebrow">Ready when you are</span>
          <h4>Move forward without starting the conversation from scratch.</h4>
          <p>
            Your planner answers can be sent directly into the consultation form.
            Civil-Gineer Masta will review the brief before responding, so the first
            discussion can focus on decisions rather than repeating basic information.
          </p>
        </div>
        <ul>
          <li><CalendarCheck aria-hidden="true" /> A more focused first consultation</li>
          <li><CalendarCheck aria-hidden="true" /> Earlier visibility of scope and constraints</li>
          <li><CalendarCheck aria-hidden="true" /> A practical route toward drawings and approvals</li>
        </ul>
      </div>

      <p className="plannerGuidanceNote">
        Budget and readiness guidance is preliminary. Final scope, fees, costs, and
        approvals depend on consultation, site conditions, design development, and
        current market pricing.
      </p>

      <div className="plannerSummaryActions">
        <a
          className="plannerAction primary"
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappText
          )}`}
          rel="noreferrer"
          target="_blank"
        >
          <MessageCircle aria-hidden="true" />
          Discuss My Vision on WhatsApp
        </a>
        <button className="plannerAction secondary" onClick={onContact} type="button">
          <PhoneCall aria-hidden="true" />
          Send My Brief for Review
        </button>
        <button
          className="plannerAction downloadPdf"
          disabled={Boolean(exportState.format)}
          onClick={() => onDownload("pdf")}
          type="button"
        >
          <FileDown aria-hidden="true" />
          {exportState.format === "pdf"
            ? "Preparing PDF..."
            : "Keep My Professional PDF Brief"}
        </button>
        <button
          className="plannerAction subtle"
          disabled={Boolean(exportState.format)}
          onClick={() => onDownload("docx")}
          type="button"
        >
          <FileText aria-hidden="true" />
          {exportState.format === "docx"
            ? "Preparing Word Document..."
            : "Download an Editable Copy"}
        </button>
      </div>

      {exportState.error && (
        <div className="plannerExportError" role="alert">
          <strong>Document download unavailable.</strong>
          <span>{exportState.error}</span>
          <span>Please check your connection and try the download again.</span>
        </div>
      )}
    </div>
  );
}
