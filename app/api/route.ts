import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";


// Define trigger phrases for transaction and swap extraction
const START_TRIGGER_PHRASES = [
  "hello universe",
];

const END_TRIGGER_PHRASES = [
  "bye universe"
];

// Function to extract transaction and swap messages from the transcript
function extractMessages(
  text: string,
  startPhrases: string[],
  endPhrases: string[],
): string[] {
  const messages: string[] = [];
  const lowerText = text.toLowerCase();
  
  for (const startPhrase of startPhrases) {
    const startIndex = lowerText.indexOf(startPhrase);
    if (startIndex !== -1) {
      console.warn(`Start trigger detected: "${startPhrase}"`);
      // Find the position after the start phrase
      const contentStartIndex = startIndex + startPhrase.length;
      
      // Find the next end phrase after this position
      let endIndex = -1;
      for (const endPhrase of endPhrases) {
        const foundEndIndex = lowerText.indexOf(endPhrase, contentStartIndex);
        if (foundEndIndex !== -1 && (endIndex === -1 || foundEndIndex < endIndex)) {
          endIndex = foundEndIndex;
          console.warn(`End trigger detected: "${endPhrase}"`);
        }
      }

      if (endIndex !== -1) {
        // Extract the message between start and end phrases using original text
        let message = text.substring(contentStartIndex, endIndex).trim();
        console.warn("Complete extracted chunk:", text.substring(startIndex, endIndex + END_TRIGGER_PHRASES[0].length));
        message = message.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        console.info("Found message between triggers:", message);
        messages.push(message);
      }
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