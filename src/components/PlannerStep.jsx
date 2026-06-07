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
      </div>

      <div
        className={`plannerOptions${question.visual ? " visualOptions" : ""}`}
      >
        {question.options.map((option) => {
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
