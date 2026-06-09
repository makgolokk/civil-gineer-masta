import PlannerOptionCard from "./PlannerOptionCard";

export default function PlannerStep({
  answer,
  isMulti,
  onAnswer,
  question,
  stepNumber,
}) {
  const selectOption = (value) => {
    if (!isMulti) {
      onAnswer(value);
      return;
    }

    const currentAnswers = Array.isArray(answer) ? answer : [];
    onAnswer(
      currentAnswers.includes(value)
        ? currentAnswers.filter((item) => item !== value)
        : [...currentAnswers, value]
    );
  };

  return (
    <div className="plannerStep" key={question.id}>
      <div className="plannerQuestionHeading">
        <span>Question {stepNumber}</span>
        <h3>{question.title}</h3>
        {question.helper && <p>{question.helper}</p>}
        {question.valueMessage && (
          <div className="plannerWhy">
            <strong>Why this matters</strong>
            <span>{question.valueMessage}</span>
          </div>
        )}
        {isMulti && (
          <p className="plannerSelectionCount" aria-live="polite">
            {Array.isArray(answer) ? answer.length : 0} priorities selected
          </p>
        )}
      </div>

      <div
        className={`plannerOptions${question.visual ? " visualOptions" : ""}${
          question.fields ? " fieldOptions" : ""
        }`}
      >
        {question.fields?.map((field) => (
          <label className="plannerField" key={field.key}>
            <span>
              {field.label}
              {field.required && <small>Required</small>}
            </span>
            {field.type === "select" ? (
              <select
                onChange={(event) =>
                  onAnswer({ ...(answer ?? {}), [field.key]: event.target.value })
                }
                value={answer?.[field.key] ?? ""}
              >
                <option value="">Select an option</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                autoComplete="off"
                onChange={(event) =>
                  onAnswer({ ...(answer ?? {}), [field.key]: event.target.value })
                }
                placeholder={field.placeholder}
                type={field.type ?? "text"}
                value={answer?.[field.key] ?? ""}
              />
            )}
          </label>
        ))}

        {question.options?.map((option) => {
          const value = option.title;
          const isSelected = isMulti
            ? Array.isArray(answer) && answer.includes(value)
            : answer === value;

          return (
            <PlannerOptionCard
              description={option.description}
              image={option.image}
              isSelected={isSelected}
              key={value}
              onSelect={() => selectOption(value)}
              title={value}
            />
          );
        })}
      </div>
    </div>
  );
}
