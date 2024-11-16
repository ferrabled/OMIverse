import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

let isRecording = false;
let recordedMessage: string[] = [];

function extractMessages(
  text: string
): string[] {
  console.log("=== EXTRACT MESSAGES DEBUG ===");
  console.log("Received text:", text);
  const lowerText = text.toLowerCase().trim();
  
  // Check for start trigger
  if (lowerText.includes("hello universe")) {
    console.warn("Start trigger detected!");
    isRecording = true;
    recordedMessage = [];
    return [];
  }
  
  // Check for end trigger
  if (lowerText.includes("universe") && isRecording) {
    console.warn("End trigger detected!");
    isRecording = false;
    const finalMessage = recordedMessage.join(" ");
    console.log("Final recorded message:", finalMessage);
    recordedMessage = [];
    return [finalMessage];
  }
  
  // If we're recording, add the current text
  if (isRecording) {
    console.log("Recording:", text);
    recordedMessage.push(text);
  }
  
  return [];
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
      transcript.toLowerCase()
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