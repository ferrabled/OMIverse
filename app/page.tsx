import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-900">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">OMIverse</h1>
          <p className="text-xl text-gray-400">
            Turn your spoken memories into eternal NFTs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">How it works</h2>
            <ol className="space-y-4 list-decimal list-inside">
              <li>Say "Hello Universe" to start recording</li>
              <li>Share your memory</li>
              <li>Say "Universe" to end recording</li>
              <li>Watch as your memory becomes an AI-generated NFT</li>
            </ol>
            <Link 
              href="/messages" 
              className="inline-block bg-foreground text-background px-8 py-3 rounded-full hover:opacity-90 transition"
            >
              View Memories
            </Link>
          </div>
          
          <div className="relative h-[400px]">
            <Image
              src="/memory-preview.jpg"
              alt="Memory Preview"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}
