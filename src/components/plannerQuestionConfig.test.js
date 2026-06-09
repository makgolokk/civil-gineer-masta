import { describe, expect, it } from "vitest";
import {
  getFeatureOptions,
  getGoalOptions,
  getStyleOptions,
  sanitizeAnswersForProject,
} from "./plannerQuestionConfig";

const projectTypes = [
  "Family Home",
  "Rental Units",
  "Luxury Villa",
  "Commercial Building",
  "Boundary Wall",
  "Renovation / Extension",
];

describe("plannerQuestionConfig", () => {
  it.each(projectTypes)("provides a complete contextual path for %s", (projectType) => {
    const goals = getGoalOptions(projectType, {
      siteStatus: "Land secured",
      designStatus: "Idea only",
    });
    const styles = getStyleOptions(projectType);
    const features = getFeatureOptions(projectType, goals[0].title);

    expect(goals.length).toBeGreaterThanOrEqual(5);
    expect(styles.length).toBeGreaterThanOrEqual(5);
    expect(features.length).toBeGreaterThanOrEqual(10);
    expect(new Set(goals.map(({ title }) => title)).size).toBe(goals.length);
    expect(new Set(features.map(({ title }) => title)).size).toBe(features.length);
  });

  it("uses site position to refine rental development goals", () => {
    const existingGoals = getGoalOptions("Rental Units", {
      siteStatus: "Existing property",
    }).map(({ title }) => title);
    const landSearchGoals = getGoalOptions("Rental Units", {
      siteStatus: "Looking for land",
    }).map(({ title }) => title);

    expect(existingGoals).toContain("Convert an existing property");
    expect(landSearchGoals).toContain("Site-led rental opportunity");
    expect(existingGoals).not.toContain("Site-led rental opportunity");
  });

  it("removes requirements and details that belong to a previous project type", () => {
    const answers = {
      projectType: "Family Home",
      stageProfile: { siteStatus: "Land secured", designStatus: "Idea only" },
      lifestyle: "Growing family",
      style: "Modern Minimalist",
      features: ["Open-plan kitchen and living", "Home office or study"],
      projectDetails: {
        location: "Gaborone",
        plotSize: "900 m2",
        floorArea: "180 m2",
        bedrooms: "4",
        bathrooms: "3",
        storeys: "Single storey",
        unitCount: "",
        unitMix: "",
        rentalOperations: "",
        businessUse: "",
        parkingNeed: "",
        wallLength: "",
        gateNeeds: "",
        existingCondition: "",
        existingSiteUse: "",
      },
    };

    const rentalAnswers = sanitizeAnswersForProject(answers, "Rental Units");

    expect(rentalAnswers.lifestyle).toBe("");
    expect(rentalAnswers.style).toBe("");
    expect(rentalAnswers.features).toEqual([]);
    expect(rentalAnswers.projectDetails.location).toBe("Gaborone");
    expect(rentalAnswers.projectDetails.bedrooms).toBe("");
  });
});
