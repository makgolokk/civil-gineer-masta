import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import PlannerStep from "./PlannerStep";
import PlannerSummary from "./PlannerSummary";
import "./DreamProjectPlanner.css";

const projectImages = {
  familyHome: "/images/planner/family-home.webp",
  rentalUnits: "/images/planner/rental-units.webp",
  luxuryVilla: "/images/planner/luxury-villa.webp",
  commercialBuilding: "/images/planner/commercial-building.webp",
  boundaryWall: "/images/planner/boundary-wall.webp",
  renovationExtension: "/images/planner/renovation-extension.webp",
  modernMinimalist: "/images/planner/modern-minimalist.webp",
  contemporaryAfrican: "/images/planner/contemporary-african.webp",
  luxuryExecutive: "/images/planner/luxury-executive.webp",
  simpleAffordable: "/images/planner/simple-affordable.webp",
  boldArchitectural: "/images/planner/bold-architectural.webp",
  traditionalModern: "/images/planner/traditional-modern.webp",
};

const plannerQuestions = [
  {
    id: "projectType",
    title: "What type of project are you dreaming about?",
    helper: "Choose the vision that feels closest to what you want to create.",
    visual: true,
    options: [
      {
        title: "Family Home",
        description: "A comfortable place for everyday life, growth and lasting memories.",
        image: projectImages.familyHome,
      },
      {
        title: "Rental Units",
        description: "A well-planned property designed to create dependable income.",
        image: projectImages.rentalUnits,
      },
      {
        title: "Luxury Villa",
        description: "A distinctive home with generous spaces and an executive finish.",
        image: projectImages.luxuryVilla,
      },
      {
        title: "Commercial Building",
        description: "A professional space that supports business growth and visibility.",
        image: projectImages.commercialBuilding,
      },
      {
        title: "Boundary Wall",
        description: "Security, privacy and a strong first impression for your property.",
        image: projectImages.boundaryWall,
      },
      {
        title: "Renovation / Extension",
        description: "Reimagine your existing property and make room for what comes next.",
        image: projectImages.renovationExtension,
      },
    ],
  },
  {
    id: "stage",
    title: "What best describes your current stage?",
    helper: "There is no wrong starting point. We will meet your project where it is.",
    options: [
      { title: "I own land", description: "The site is secured and ready to be considered." },
      { title: "I am looking for land", description: "I want guidance before choosing a property." },
      { title: "I already have a design", description: "I have drawings or a concept to develop." },
      { title: "I only have an idea", description: "I need help turning a vision into a clear brief." },
      { title: "I want to renovate", description: "I want to improve or expand an existing property." },
    ],
  },
  {
    id: "lifestyle",
    title: "What lifestyle or goal fits your project?",
    helper: "Think beyond rooms and walls. What should this project make possible?",
    visual: true,
    options: [
      {
        title: "Growing family",
        description: "Flexible, welcoming spaces that can evolve with family life.",
        image: projectImages.familyHome,
      },
      {
        title: "First home",
        description: "A confident, practical first step into property ownership.",
        image: projectImages.simpleAffordable,
      },
      {
        title: "Investment income",
        description: "Efficient planning that balances tenant appeal and long-term value.",
        image: projectImages.rentalUnits,
      },
      {
        title: "Prestige / luxury",
        description: "A statement property with presence, comfort and refined detail.",
        image: projectImages.luxuryVilla,
      },
      {
        title: "Business use",
        description: "A credible, functional environment made for clients and growth.",
        image: projectImages.commercialBuilding,
      },
      {
        title: "Fixing an existing property",
        description: "Restore confidence, improve function and unlock hidden potential.",
        image: projectImages.renovationExtension,
      },
    ],
  },
  {
    id: "style",
    title: "Which style attracts you most?",
    helper: "Choose the architectural mood you would be proud to come home to.",
    visual: true,
    options: [
      {
        title: "Modern Minimalist",
        description: "Clean forms, calm spaces and purposeful detail.",
        image: projectImages.modernMinimalist,
      },
      {
        title: "Contemporary African",
        description: "Modern living shaped by climate, place and local character.",
        image: projectImages.contemporaryAfrican,
      },
      {
        title: "Luxury Executive",
        description: "Confident proportions, premium finishes and impressive arrival.",
        image: projectImages.luxuryExecutive,
      },
      {
        title: "Simple Affordable",
        description: "Smart planning, practical finishes and value in every square metre.",
        image: projectImages.simpleAffordable,
      },
      {
        title: "Bold Architectural",
        description: "Strong geometry and a memorable, individual presence.",
        image: projectImages.boldArchitectural,
      },
      {
        title: "Traditional Modern",
        description: "Familiar warmth refined with contemporary comfort.",
        image: projectImages.traditionalModern,
      },
    ],
  },
  {
    id: "features",
    title: "What features matter most?",
    helper: "Select as many as you like. These details begin shaping your daily experience.",
    multi: true,
    options: [
      { title: "Garage" },
      { title: "Open-plan kitchen" },
      { title: "Ensuite bedroom" },
      { title: "Walk-in closet" },
      { title: "Outdoor entertainment area" },
      { title: "Home office" },
      { title: "Extra rental room" },
      { title: "Modern exterior" },
      { title: "Large windows" },
      { title: "Secure boundary wall" },
    ],
  },
  {
    id: "timeline",
    title: "When would you like to start?",
    helper: "Your preferred timing helps define the right professional next step.",
    options: [
      { title: "Immediately" },
      { title: "Within 3 months" },
      { title: "Within 6 months" },
      { title: "Within 12 months" },
      { title: "Just exploring" },
    ],
  },
  {
    id: "budget",
    title: "Which budget direction feels realistic?",
    helper: "A broad range is enough for now. It helps align ambition, scope and priorities.",
    options: [
      { title: "Under P500k" },
      { title: "P500k–P1M" },
      { title: "P1M–P2M" },
      { title: "Above P2M" },
      { title: "Not sure yet" },
    ],
  },
];

const initialAnswers = {
  projectType: "",
  stage: "",
  lifestyle: "",
  style: "",
  features: [],
  timeline: "",
  budget: "",
};

const serviceRecommendations = {
  "Family Home": "Architectural Design + Structural Engineering",
  "Rental Units": "Concept Design + Cost Planning + Council Submission",
  "Luxury Villa": "Premium Architectural Design + Structural Design",
  "Commercial Building": "Feasibility + Architectural + Structural Services",
  "Boundary Wall": "Boundary Wall Design + Construction Support",
  "Renovation / Extension": "Site Assessment + Renovation Design",
};

const designDirections = {
  "Growing family": "A flexible, future-ready layout with connected family and outdoor spaces.",
  "First home": "A compact, cost-aware design with clear opportunities for future expansion.",
  "Investment income": "An efficient, durable layout focused on privacy, occupancy and return.",
  "Prestige / luxury": "A bespoke statement design with generous proportions and refined detailing.",
  "Business use": "A functional, visible and adaptable commercial environment.",
  "Fixing an existing property": "A sensitive upgrade that improves flow, safety and property value.",
};

export default function DreamProjectPlanner() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const question = plannerQuestions[currentStep];
  const currentAnswer = answers[question.id];
  const canContinue = question.multi
    ? currentAnswer.length > 0
    : Boolean(currentAnswer);
  const progress = showSummary
    ? 100
    : ((currentStep + 1) / plannerQuestions.length) * 100;

  const readinessScore = useMemo(() => {
    let score = 0;
    if (answers.stage === "I own land") score += 25;
    if (answers.stage === "I already have a design") score += 20;
    if (["Immediately", "Within 3 months"].includes(answers.timeline)) score += 20;
    if (answers.budget && answers.budget !== "Not sure yet") score += 20;
    if (answers.features.length >= 3) score += 15;
    return Math.min(score, 100);
  }, [answers]);

  const updateAnswer = (value) => {
    setAnswers((current) => ({ ...current, [question.id]: value }));
  };

  const goNext = () => {
    if (!canContinue) return;
    if (currentStep === plannerQuestions.length - 1) {
      setShowSummary(true);
      return;
    }
    setCurrentStep((step) => step + 1);
  };

  const goBack = () => {
    if (showSummary) {
      setShowSummary(false);
      return;
    }
    setCurrentStep((step) => Math.max(0, step - 1));
  };

  const handleContact = () => {
    document.querySelector(".enquirySection")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDownload = () => {
    const service = serviceRecommendations[answers.projectType];
    const direction = designDirections[answers.lifestyle];
    const summary = [
      "CIVIL-GINEER MASTA - PROJECT VISION SUMMARY",
      "============================================",
      "",
      `Project Type: ${answers.projectType}`,
      `Preferred Style: ${answers.style}`,
      `Lifestyle Goal: ${answers.lifestyle}`,
      `Selected Features: ${answers.features.join(", ") || "To be discussed"}`,
      `Current Stage: ${answers.stage}`,
      `Timeline: ${answers.timeline}`,
      `Budget Direction: ${answers.budget}`,
      `Recommended Design Direction: ${direction}`,
      `Suggested Service: ${service}`,
      `Project Readiness Score: ${readinessScore}/100`,
      "",
      "Recommended Next Step:",
      "Contact Civil-Gineer Masta for a professional consultation to confirm the brief, site requirements and project pathway.",
    ].join("\n");
    const file = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "civil-gineer-masta-project-vision.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="dreamPlannerSection revealSection" id="dream-project-planner">
      <div className="dreamPlannerIntro">
        <p className="sectionLabel">
          <Sparkles aria-hidden="true" />
          DREAM PROJECT PLANNER
        </p>
        <h2>Plan Your Dream Project</h2>
        <p className="dreamPlannerSubtitle">
          Answer a few simple questions and we’ll help you shape your idea into a
          realistic project direction.
        </p>
        <p className="dreamPlannerSupport">
          Whether it is a family home, rental units, renovation, boundary wall, or
          commercial project, this planner helps you understand your next professional
          step.
        </p>
      </div>

      <div className="plannerShell">
        <div className="plannerProgressHeader">
          <div>
            <span>{showSummary ? "Vision complete" : `Step ${currentStep + 1} of 7`}</span>
            <strong>{Math.round(progress)}%</strong>
          </div>
          <div
            aria-label={`Planner progress: ${Math.round(progress)}%`}
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow={Math.round(progress)}
            className="plannerProgressTrack"
            role="progressbar"
          >
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        {showSummary ? (
          <PlannerSummary
            answers={answers}
            designDirection={designDirections[answers.lifestyle]}
            onContact={handleContact}
            onDownload={handleDownload}
            readinessScore={readinessScore}
            recommendedService={serviceRecommendations[answers.projectType]}
          />
        ) : (
          <PlannerStep
            answer={currentAnswer}
            isMulti={question.multi}
            onAnswer={updateAnswer}
            question={question}
            stepNumber={currentStep + 1}
          />
        )}

        <div className="plannerNavigation">
          <button
            className="plannerNavButton back"
            disabled={currentStep === 0 && !showSummary}
            onClick={goBack}
            type="button"
          >
            <ArrowLeft aria-hidden="true" />
            Back
          </button>

          {!showSummary && (
            <button
              className="plannerNavButton next"
              disabled={!canContinue}
              onClick={goNext}
              type="button"
            >
              {currentStep === plannerQuestions.length - 1
                ? "Create My Project Vision"
                : "Next"}
              <ArrowRight aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
