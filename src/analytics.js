export function trackEvent(name, properties = {}) {
  const detail = { event: name, ...properties };

  window.dispatchEvent(
    new CustomEvent("cgm:analytics", {
      detail,
    })
  );

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(detail);
  }
}
