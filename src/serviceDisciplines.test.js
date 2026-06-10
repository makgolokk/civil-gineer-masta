import { describe, expect, it } from "vitest";
import {
  getServiceDiscipline,
  serviceDisciplines,
} from "./serviceDisciplines";

describe("serviceDisciplines", () => {
  it("consolidates services into five complete disciplines", () => {
    expect(serviceDisciplines).toHaveLength(5);

    for (const service of serviceDisciplines) {
      expect(service.slug).toBeTruthy();
      expect(service.summary.length).toBeGreaterThan(40);
      expect(service.capabilities).toHaveLength(4);
      expect(service.process).toHaveLength(4);
      expect(service.deliverables.length).toBeGreaterThanOrEqual(5);
      expect(service.prepare).toHaveLength(4);
    }
  });

  it("uses distinct hub and detail artwork for every discipline", () => {
    const hubImages = serviceDisciplines.map(({ image }) => image);
    const detailImages = serviceDisciplines.map(({ heroImage }) => heroImage);
    const allImages = [...hubImages, ...detailImages];

    expect(new Set(hubImages).size).toBe(serviceDisciplines.length);
    expect(new Set(detailImages).size).toBe(serviceDisciplines.length);
    expect(new Set(allImages).size).toBe(allImages.length);
  });

  it("finds a discipline by route slug", () => {
    expect(getServiceDiscipline("structural-engineering")?.title).toBe(
      "Structural Engineering & Assessments"
    );
    expect(getServiceDiscipline("not-a-service")).toBeUndefined();
  });
});
