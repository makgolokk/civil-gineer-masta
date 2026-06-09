import { Lightbulb, MapPin, Sparkles } from "lucide-react";
import { getContextInsight } from "./plannerQuestionConfig";

const projectInsights = {
  "Family Home":
    "Start with daily routines, orientation and future family changes. A strong layout should feel easy to live in before finishes are considered.",
  "Rental Units":
    "Unit count, tenant privacy, parking, services and durable finishes usually influence rental performance more than decorative complexity.",
  "Luxury Villa":
    "Luxury is strongest when arrival, privacy, views, natural light and indoor-outdoor movement are coordinated from the first concept.",
  "Commercial Building":
    "Business flow, customer access, parking, servicing and future adaptability should be tested before the facade direction is fixed.",
  "Boundary Wall":
    "Wall height, ground conditions, drainage, gates and foundation strategy should be considered together rather than as separate decisions.",
  "Renovation / Extension":
    "The existing structure should be assessed before the new layout is committed. Good renovation design protects useful work and targets weak areas.",
};

export default function PlannerLivePreview({ answers }) {
  const scale = [
    answers.projectDetails.floorArea,
    answers.projectDetails.bedrooms,
    answers.projectDetails.unitCount,
    answers.projectDetails.businessUse,
    answers.projectDetails.storeys,
  ]
    .filter(Boolean)
    .slice(0, 3)
    .join(" | ");
  return (
    <aside className="plannerLivePreview" aria-label="Live project snapshot">
      <div className="plannerLiveHeading">
        <Sparkles aria-hidden="true" />
        <div>
          <span>Live project snapshot</span>
          <strong>Your brief is building as you answer</strong>
        </div>
      </div>

      <dl>
        <div>
          <dt>Project</dt>
          <dd>{answers.projectType || "Choose a project type"}</dd>
        </div>
        <div>
          <dt>Site</dt>
          <dd>{answers.stageProfile.siteStatus || "To be clarified"}</dd>
        </div>
        <div>
          <dt>Design</dt>
          <dd>{answers.stageProfile.designStatus || "To be clarified"}</dd>
        </div>
        <div>
          <dt>Goal</dt>
          <dd>{answers.lifestyle || "Define what the project must achieve"}</dd>
        </div>
        <div>
          <dt>Design direction</dt>
          <dd>{answers.style || "A relevant direction will appear here"}</dd>
        </div>
        <div>
          <dt>Scale</dt>
          <dd>{scale || "Add approximate project details"}</dd>
        </div>
        <div>
          <dt>Priorities</dt>
          <dd>
            {answers.features.length
              ? answers.features.slice(0, 3).join(", ")
              : "Select the spaces and features that matter"}
          </dd>
        </div>
      </dl>

      {answers.projectDetails.location && (
        <p className="plannerLocation">
          <MapPin aria-hidden="true" />
          {answers.projectDetails.location}
        </p>
      )}

      <div className="plannerProfessionalInsight">
        <Lightbulb aria-hidden="true" />
        <div>
          <strong>Professional insight</strong>
          <p>
            {answers.lifestyle
              ? getContextInsight(answers)
              : projectInsights[answers.projectType] || getContextInsight(answers)}
          </p>
        </div>
      </div>
    </aside>
  );
}
