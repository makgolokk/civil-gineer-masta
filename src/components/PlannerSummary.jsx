import { Download, MessageCircle, PhoneCall } from "lucide-react";
import { whatsappNumber } from "../siteContent";

const summaryLabels = [
  ["Project Type", "projectType"],
  ["Preferred Style", "style"],
  ["Lifestyle Goal", "lifestyle"],
  ["Selected Features", "features"],
  ["Current Stage", "stage"],
  ["Timeline", "timeline"],
  ["Budget Direction", "budget"],
];

export default function PlannerSummary({
  answers,
  designDirection,
  onContact,
  onDownload,
  readinessScore,
  recommendedService,
}) {
  const whatsappText = [
    "Hello Civil-Gineer Masta, I completed the Dream Project Planner and I would like a consultation.",
    "",
    `Project type: ${answers.projectType}`,
    `Preferred style: ${answers.style}`,
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
          <span className="plannerEyebrow">Your project is taking shape</span>
          <h3>Project Vision Summary</h3>
          <p>
            This is your starting brief. Civil-Gineer Masta can help turn it into
            coordinated drawings, approvals and a realistic delivery plan.
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
          <p>Project readiness</p>
        </div>
      </div>

      <div className="plannerSummaryGrid">
        {summaryLabels.map(([label, key]) => (
          <div className="summaryDetail" key={key}>
            <span>{label}</span>
            <strong>
              {Array.isArray(answers[key])
                ? answers[key].join(", ") || "To be discussed"
                : answers[key]}
            </strong>
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
          WhatsApp Civil-Gineer Masta
        </a>
        <button className="plannerAction secondary" onClick={onContact} type="button">
          <PhoneCall aria-hidden="true" />
          Request Consultation
        </button>
        <button className="plannerAction subtle" onClick={onDownload} type="button">
          <Download aria-hidden="true" />
          Download My Project Summary
        </button>
      </div>
    </div>
  );
}
