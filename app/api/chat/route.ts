import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { DataAPIClient } from "@datastax/astra-db-ts";
import OpenAI from "openai";

const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(process.env.ASTRA_DB_API_ENDPOINT as string);

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function convertToModelMessages(messages: any[]) {
  return messages
    .filter((m) => m.role === "user" || m.role === "assistant") // ✅ only valid roles
    .map((m) => ({
      role: m.role,
      content:
        m.parts
          ?.map((p: any) => (p.type === "text" ? p.text : ""))
          .join("") || "",
    }))
    .filter((m) => m.content.trim().length > 0); 
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // ✅ latest message
    const latestMessage =
      messages[messages.length - 1].parts
        ?.map((p: any) => (p.type === "text" ? p.text : ""))
        .join("") || "";

    // ✅ embedding
    const embedding = await openaiClient.embeddings.create({
      model: "text-embedding-3-small",
      input: latestMessage,
    });

    const vector = embedding.data[0].embedding;

    const collection = db.collection(
      process.env.ASTRA_DB_COLLECTION as string
    );

    const cursor = collection.find(
      {},
      {
        sort: { $vector: vector },
        limit: 5,
      }
    );

    const context = (await cursor.toArray())
      .map((doc) => doc.text)
      .join("\n");

    // ✅ FIX: convert messages here
    const modelMessages = convertToModelMessages(messages);

    const result = await streamText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "system",
          content: `You are a Formula 1 expert. Use the following context to answer the user: ${context}. If the context doesn't contain the answer, answer to the best of your ability.`,
        },
        ...modelMessages,
      ],
    });

   return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}