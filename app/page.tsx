"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

import Bubble from "../components/Bubble";
import PromptSuggestionsRow from "../components/PromptSuggestionsRow";
import LoadingBubble from "../components/LoadingBubble";

export default function Chat() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");

  const isLoading = status === "streaming" || status === "submitted";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage({ text: input });
    setInput("");
  };

  const handlePromptClick = async (prompt: string) => {
    await sendMessage({ text: prompt });
  };

  return (
    <main>
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header__logo">F1</div>
        <div className="chat-header__info">
          <p className="chat-header__title">Gridbot AI</p>
          <p className="chat-header__subtitle">Formula 1 Intelligence</p>
        </div>
        <div className="chat-header__status">
          <span className="status-dot" />
          Live
        </div>
      </div>

      {/* Messages */}
      <section>
        {messages.length === 0 ? (
          <PromptSuggestionsRow onPromptClick={handlePromptClick} />
        ) : (
          <>
            {messages.map((m) => (
              <Bubble key={m.id} message={m} />
            ))}
            {isLoading && <LoadingBubble />}
          </>
        )}
      </section>

      {/* Input */}
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Ask about F1..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </main>
  );
}
