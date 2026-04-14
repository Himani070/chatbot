const PromptSuggestionsRow = ({ onPromptClick }: { onPromptClick: (prompt: string) => void }) => {
  const prompts = [
    "Who is the current F1 world champion?",
    "Who is driving for Ferrari in 2025?",
    "What is the latest news in F1?",
    "Tell me about the history of McLaren.",
  ];

  return (
    <div className="suggestions-row">
      {prompts.map((prompt, index) => (
        <button
          key={index}
          className="suggestion-btn"
          onClick={() => onPromptClick(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default PromptSuggestionsRow;