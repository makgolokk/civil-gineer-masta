import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EnquiryForm } from "./SiteElements";

describe("EnquiryForm", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("prefills contact and project details from a completed planner brief", () => {
    render(
      <EnquiryForm
        initialProjectBrief={{
          projectType: "Family Home",
          stageProfile: {
            siteStatus: "Land secured",
            designStatus: "Idea only",
          },
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
      "Architectural Design & Approvals"
    );
    expect(screen.getByLabelText("Brief Project Description").value).toContain(
      "Target floor area: 180 m2"
    );
    expect(screen.getByLabelText("Brief Project Description").value).toContain(
      "Site position: Land secured"
    );
  });

  it("sends the structured planner data for server-side PDF attachment", async () => {
    const projectBrief = {
      projectType: "Rental Units",
      stageProfile: {
        siteStatus: "Looking for land",
        designStatus: "Formal drawings",
      },
      lifestyle: "Investment income",
      style: "Modern Minimalist",
      features: ["Garage", "Large windows"],
      timeline: "Within 6 months",
      budget: "P1M-P2M",
      projectDetails: {
        location: "Gaborone",
        unitCount: "4 units",
        storeys: "Double storey",
      },
      clientDetails: {
        clientName: "Dineo M.",
        phone: "+267 71 000 000",
        email: "dineo@example.com",
      },
    };
    const fetchMock = vi.spyOn(window, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, briefAttached: true }),
    });
    render(<EnquiryForm initialProjectBrief={projectBrief} />);

    fireEvent.submit(screen.getByRole("button", {
      name: "Send My Project Brief for Review",
    }).closest("form"));

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const request = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(request.projectData).toEqual(projectBrief);
    expect(await screen.findByText(/PDF brief have been sent/i)).toBeTruthy();
  });
});
