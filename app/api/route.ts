import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

let isRecording = false;
let recordedMessage: string[] = [];

async function extractMessages(
  text: string
): Promise<string[]> {
  const lowerText = text.toLowerCase().trim();
  
  // Check for start trigger
  if (lowerText.includes("hello universe")) {
    console.warn("[->] Start trigger detected!");
    isRecording = true;
    recordedMessage = [];
    return [];
  }  // Check for end trigger
  if (lowerText.includes("universe") && isRecording) {
    console.warn("[<-] End trigger detected!");
    isRecording = false;
    const finalMessage = recordedMessage.join(" ");
    console.warn("[*] Final recorded message:", finalMessage);
    recordedMessage = [];
    return await handleClosingTrigger(finalMessage);
  }
  
  // If we're recording, add the current text
  if (isRecording) {
    console.log("Recording:", text);
    recordedMessage.push(text);
  }
  
  return [];
}

async function handleClosingTrigger(message: string): Promise<string[]> {
  try {
    // First, generate an image based on the recorded message
    console.log("Generating image for message:", message);
    //TODO: Replace with the actual message
    const msg = "Hey Omi, right now im inside a temple, I am immediately enveloped by a sense of tranquility and reverence. My eyes are drawn to the stunning murals that adorn the walls, depicting vibrant scenes from Buddhist mythology, each brushstroke telling a story steeped in tradition. In the center, the majestic golden figure of the Reclining Buddha commands my attention, its serene expression inviting contemplation. Soft light filters through ornate windows, casting a warm glow over the intricate details of the architecture and highlighting the shimmering gold leaf and delicate carvings"
    const imageResponse = await generateImage(msg);
    
    // Extract the image URL from the response
    const imageUrl = imageResponse.data[0]?.asset_url;
    if (!imageUrl) {
      throw new Error("No image URL received from generation");
    }

    // You could add additional processing here, such as:
    // - Saving to a database
    // - Sending notifications
    // - Processing with additional AI services

    console.log("Successfully processed closing trigger with image:", imageUrl);
    
    return [message]; // Return the original message for now
  } catch (error) {
    console.error("Error in handleClosingTrigger:", error);
    return []; // Return empty array on error
  }
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

    const transcript = data.segments
      .map((segment: { text: string }) => segment.text)
      .join(" ");
    //console.info("transcript: ", transcript);

    const transaction_messages = await extractMessages(
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


// ================================= IMAGE GENERATION ======================================================
interface GenerateImageResponse {
  id: string;
  self: string;
  status: string;
  credits_used: number;
  credits_remaining: number;
  data: {
    asset_id: string;
    self: string;
    asset_url: string;
    type: string;
    width: number;
    height: number;
  }[];
}

async function generateImage(prompt: string) {
  const response = await fetch("https://api.limewire.com/api/image/generation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LIMEWIRE_API_KEY}`,
      "X-Api-Version": "v1",
    },
    body: JSON.stringify({
      prompt,
      aspect_ratio: "1:1",
      samples: 1,
      quality: "HIGH",
    }),
  });

  if (!response.ok) {
    throw new Error(`LimeWire API error: ${response.status}`);
  }

  const data: GenerateImageResponse = await response.json();
  return data;
}