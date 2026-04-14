import type { UIMessage } from "ai";

const Bubble = ({ message }: { message: UIMessage }) => {
  const content = message.parts
    ?.map((p) => (p.type === "text" ? p.text : ""))
    .join("");

  return (
    <div className={message.role === "user" ? "user-msg" : "ai-msg"}>
      {content}
    </div>
  );
};

export default Bubble;