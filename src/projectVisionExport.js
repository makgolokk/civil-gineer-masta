const PROJECT_VISION_API =
  import.meta.env.VITE_PROJECT_VISION_API_URL || "/api/project_vision";

function filenameFromDisposition(header, fallback) {
  if (!header) return fallback;
  const encoded = header.match(/filename\*=UTF-8''([^;]+)/i);
  if (encoded) return decodeURIComponent(encoded[1]);
  const standard = header.match(/filename="?([^";]+)"?/i);
  return standard?.[1] || fallback;
}

export async function downloadProjectVision(projectData, format) {
  const response = await fetch(PROJECT_VISION_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      format,
      projectData,
    }),
  });

  if (!response.ok) {
    let message =
      "Your professional project summary could not be generated. Please retry.";
    try {
      const payload = await response.json();
      if (payload?.error) message = payload.error;
    } catch {
      // Keep the client-safe message when the service returns a non-JSON error.
    }
    throw new Error(message);
  }

  const blob = await response.blob();
  if (!blob.size) {
    throw new Error(
      "The document service returned an empty file. Please retry in a moment."
    );
  }

  const fallback = `CGM_Project_Vision_Summary.${format}`;
  const filename = filenameFromDisposition(
    response.headers.get("Content-Disposition"),
    fallback
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
