export default function PlannerOptionCard({
  description,
  image,
  isSelected,
  onSelect,
  title,
}) {
  return (
    <button
      aria-pressed={isSelected}
      className={`plannerOptionCard${isSelected ? " isSelected" : ""}${
        image ? " hasImage" : ""
      }`}
      onClick={onSelect}
      type="button"
    >
      {image && (
        <span className="plannerOptionMedia">
          <img src={image} alt="" decoding="async" loading="lazy" />
        </span>
      )}

      <span className="plannerOptionCopy">
        <strong>{title}</strong>
        {description && <span>{description}</span>}
      </span>

      <span className="plannerOptionCheck" aria-hidden="true">
        {isSelected ? "✓" : ""}
      </span>
    </button>
  );
}
