import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";


// Define trigger phrases for transaction and swap extraction
const START_TRIGGER_PHRASES = [
  "save universe",
];

const END_TRIGGER_PHRASES = [
  "bye bye"
];

// Function to extract transaction and swap messages from the transcript
function extractMessages(
  text: string,
  startPhrases: string[],
  endPhrases: string[],
): string[] {
  const words = text.split(' ');
  const messages: string[] = [];
  let currentMessage: string[] = [];
  let isCollecting = false;

  for (const word of words) {
    // Check if we hit a start trigger
    if (startPhrases.some(phrase => word.includes(phrase))) {
      isCollecting = true;
      currentMessage = [];
      continue;
    }

    // Check if we hit an end trigger
    if (endPhrases.some(phrase => word.includes(phrase))) {
      if (isCollecting && currentMessage.length > 0) {
        let message = currentMessage.join(' ').trim();
        message = message.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        messages.push(message);
      }
      isCollecting = false;
      currentMessage = [];
      continue;
    }

    // Collect words if we're between triggers
    if (isCollecting) {
      currentMessage.push(word);
    }
  }

  return messages;
}

export async function POST(request: NextRequest) {
  try {
    const reqUrl = request.url;
    const { searchParams } = new URL(reqUrl);
    const uid = searchParams.get("uid");
    if (!uid) {
      throw new Error("User ID (uid) is required.");
    }
    console.log("Received text from OMI UID ", uid);
    const text = await request.text();
    const data = JSON.parse(text);
    console.info("text: ", data);

    const transcript = data.segments
      .map((segment: { text: string }) => segment.text)
      .join(" ");
    console.info("transcript: ", transcript);

    const transaction_messages = extractMessages(
      transcript.toLowerCase(),
      START_TRIGGER_PHRASES,
      END_TRIGGER_PHRASES,
    );

    if (transaction_messages.length === 0) {
      return new Response(null, { status: 204 });
    }

    console.error("transaction_messages: ", transaction_messages);
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      `Webhook error: ${error instanceof Error ? error.message : `Unknown error: ${error}`}`,
      {
        status: 400,
      },
    );
  }

  revalidatePath("/");

  return new Response("Success!", {
    status: 200,
  });
}

// Function to handle GET requests (currently logs the request body)
export async function GET(request: Request) {
  console.error(request.text());
  return new Response("Server is running", { status: 200 });
}