import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { PinataSDK } from "pinata-web3";
import OpenAI from 'openai';
import { ethers } from 'ethers';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: "example-gateway.mypinata.cloud",
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "initialOwner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721IncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toTokenId",
				"type": "uint256"
			}
		],
		"name": "BatchMetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "MetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "safeMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY!;

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
    //console.log("Recording:", text);
    recordedMessage.push(text);
  }
  
  return [];
}

async function handleClosingTrigger(message: string): Promise<string[]> {
  try {
    // First, refine the message using OpenAI
    const refinedMessage = await refineMessageWithOpenAI(message);
    console.log("Refined message:", refinedMessage);

    // Generate image with the refined message
    const imageUrl = await generateImage(refinedMessage);
    
    // Extract the image URL from the response
    //const imageUrl = imageResponse.data[0]?.asset_url;
    if (!imageUrl) {
      throw new Error("No image URL received from generation");
    }

    const pinataUpload = await uploadToPinata(imageUrl);

    // You could add additional processing here, such as:
    // - Saving to a database
    // - Sending notifications
    // - Processing with additional AI services

    console.log("Successfully processed closing trigger with image:", pinataUpload?.IpfsHash);
    
    return [message]; // Return the original message for now
  } catch (error) {
    console.error("Error in handleClosingTrigger:", error);
    return []; // Return empty array on error
  }
}

async function refineMessageWithOpenAI(message: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that refines image descriptions. Make the description more detailed and vivid, and explicitly mention the location if possible. Keep the description under 200 words. Try to make it much more descriptive, if there's not enough information."
      },
      {
        role: "user",
        content: `Please refine this image description: ${message}`
      }
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0]?.message?.content || message;
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
  uploadToContract("QmX2ryqySFLfDGPXmfQw78nTxMcwWtdUxL1iSCRrzFhbSK")
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
  /* const response = await fetch("https://api.limewire.com/api/image/generation", {
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
  } */
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    const image_url = response.data[0].url;
  return image_url;
}

async function uploadToPinata(uri: string) {
  try {
    const upload = await pinata.upload.url(uri);
    console.log("Uploaded to Pinata:", upload);
    
    // Add contract upload after successful Pinata upload
    if (upload?.IpfsHash) {
      await uploadToContract(upload.IpfsHash);
    }
    
    return upload;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
  }
}

async function uploadToContract(ipfsHash: string) {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    console.log("Uploading to contract:", ipfsHash);
    const tx = await contract.safeMint("0x39b4946EbC4dD87d374e7a70589Fad4B2859f70F", ipfsHash);
    
    await tx.wait();
    console.warn("[*] Successfully uploaded to contract");
    return tx.hash;
  } catch (error) {
    console.error("Error uploading to contract:", error);
    throw error;
  }
}