import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { EnquiryForm } from "./SiteElements";

describe("EnquiryForm", () => {
  afterEach(cleanup);

  it("prefills contact and project details from a completed planner brief", () => {
    render(
      <EnquiryForm
        initialProjectBrief={{
          projectType: "Family Home",
          stage: "I own land",
          lifestyle: "Growing family",
          style: "Modern Minimalist",
          features: ["Garage", "Home office"],
          timeline: "Within 3 months",
          budget: "P1M-P2M",
          projectDetails: {
            location: "Gaborone North",
            plotSize: "1,200 m2",
            floorArea: "180 m2",
            bedrooms: "3 bedrooms",
            bathrooms: "2 bathrooms",
            storeys: "Single storey",
          },
          clientDetails: {
            clientName: "Dineo M.",
            phone: "+267 71 000 000",
            email: "dineo@example.com",
          },
        }}
      />
    );

    expect(screen.getByLabelText("Full Name").value).toBe("Dineo M.");
    expect(screen.getByLabelText("Email Address").value).toBe(
      "dineo@example.com"
    );
    expect(screen.getByLabelText("Project Location").value).toBe(
      "Gaborone North"
    );
    expect(screen.getByLabelText("Service Needed").value).toBe(
      "Architectural Design"
    );
    expect(screen.getByLabelText("Brief Project Description").value).toContain(
      "Target floor area: 180 m2"
    );
  });
});
