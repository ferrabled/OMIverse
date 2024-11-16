'use client'

import { useState } from 'react'
import { Globe, Mic, Play, Pause, ChevronRight, Wallet } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'

export default function LandingPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setCurrentStep(2)
    } else {
      setCurrentStep(3)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a2a] to-[#1a1a4a] text-white">
      <header className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cosmic-gold">OMIverse</h1>
        <Button variant="outline" className="text-cosmic-gold border-cosmic-gold">
          <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h2 className="text-5xl font-bold mb-4">Turn Your Memories into Digital Art</h2>
          <p className="text-xl mb-8">Speak your stories, watch them transform, and preserve them forever on the blockchain.</p>
          <Button size="lg" className="bg-cosmic-gold text-deep-space-blue hover:bg-cosmic-gold/90">
            Start Recording
          </Button>
          <div className="mt-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-30"></div>
            <img src="/audiowave.png" alt="Voice waves transforming into art" className="mx-auto relative z-10" />
          </div>
        </section>

        {/* Powered by OMI Interactive Demo */}
        <section className="bg-deep-space-blue/50 rounded-lg p-8 my-20">
          <h3 className="text-3xl font-semibold mb-6">Powered by OMI</h3>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left side: Interactive Demo */}
            <div className="flex-1 flex flex-col items-center">
              <p className="text-lg mb-4">Say: "Hello Universe"</p>
              <Button
                size="lg"
                className={`rounded-full p-6 ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-cosmic-gold'}`}
                onClick={toggleRecording}
              >
                {isRecording ? <Pause className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
              </Button>
                            

              {/* AI Generation Preview */}
              {currentStep > 1 && (
                <div className="mt-6 w-full max-w-md">
                  <Card className="bg-deep-space-blue/50 border-cosmic-gold/20">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-cosmic-gold">Processing locally...</span>
                          <span className="text-sm text-ethereal-purple">Secure & Private</span>
                        </div>
                        <div className="relative h-48 bg-black/40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            {currentStep === 2 ? (
                              <div className="animate-pulse text-cosmic-gold">Generating visualization...</div>
                            ) : (
                              <img 
                                src="/device.webp" 
                                alt="AI-generated visualization" 
                                className="w-full h-full object-cover m-40"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Right side: Features */}
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <Card className="bg-deep-space-blue/50 border-cosmic-gold/20">
                  <CardContent className="p-6 space-y-2">
                    <h5 className="font-semibold text-cosmic-gold flex items-center gap-2">
                      <Mic className="h-4 w-4" />
                      Local Processing
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Voice recognition and AI processing happens right on your device, ensuring your memories stay private.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-deep-space-blue/50 border-cosmic-gold/20">
                  <CardContent className="p-6 space-y-2">
                    <h5 className="font-semibold text-cosmic-gold flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Instant Response
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Experience real-time voice recognition and immediate AI visualization generation.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-deep-space-blue/50 border-cosmic-gold/20">
                  <CardContent className="p-6 space-y-2">
                    <h5 className="font-semibold text-cosmic-gold flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Cross-Platform
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Works seamlessly across all devices, powered by OMI's universal compatibility.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="border-cosmic-gold text-cosmic-gold hover:bg-cosmic-gold hover:text-deep-space-blue"
                >
                  <Globe className="mr-2 h-4 w-4" /> Learn More
                </Button>
                <Button 
                  variant="outline" 
                  className="border-cosmic-gold text-cosmic-gold hover:bg-cosmic-gold hover:text-deep-space-blue"
                >
                  <ChevronRight className="mr-2 h-4 w-4" /> Documentation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Memory Map Feature */}
        <section className="my-20">
          <h3 className="text-3xl font-semibold mb-6">Explore the Memory Universe</h3>
          <a href="http://localhost:3001" className="block">
            <div className="relative md:h-[600px] sm:h-[400px] h-[300px] bg-deep-space-blue rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
              {/* World Map Background */}
              <img 
                src="/map.png" 
                alt="World Map" 
                className="absolute inset-0 w-full h-full  opacity-80"
              />
              
              {/* Memory Points */}
              <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-cosmic-gold rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 left-2/3 ml-5 w-3 h-3 bg-cosmic-gold rounded-full animate-pulse animation-delay-200"></div>
              <div className="absolute top-3/4 left-1/4 w-3 ml-4 md:ml-16 h-3 bg-cosmic-gold rounded-full animate-pulse animation-delay-400"></div>
              <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-cosmic-gold rounded-full animate-pulse animation-delay-300"></div>
              <div className="absolute top-2/3 right-1/4 mr-[-18px] md:mr-[-48px] w-3 h-3 bg-cosmic-gold rounded-full animate-pulse animation-delay-500"></div>
              <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-cosmic-gold rounded-full animate-pulse animation-delay-600"></div>
              <div className="absolute bottom-1/2 right-1/2 w-3 h-3 bg-cosmic-gold rounded-full animate-pulse animation-delay-700"></div>
              
              {/* Optional: Add a subtle overlay to indicate clickability */}
              <div className="absolute inset-0 bg-cosmic-gold opacity-0 hover:opacity-10 transition-opacity"></div>
            </div>
          </a>
        </section>

        {/* How It Works Section */}
        <section className="my-20">
          <h3 className="text-3xl font-semibold mb-6">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Speak your memory', icon: Mic },
              { title: 'AI generates visualization', icon: Play },
              { title: 'Memory is minted as NFT', icon: ChevronRight },
              { title: 'Pin your memory to the map', icon: Globe },
            ].map((step, index) => (
              <Card key={index} className="bg-deep-space-blue/50 border-cosmic-gold/20">
                <CardContent className="flex flex-col items-center p-6">
                  <div className="rounded-full bg-cosmic-gold p-3 mb-4">
                    <step.icon className="h-6 w-6 text-deep-space-blue" />
                  </div>
                  <p className="text-center">{step.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="my-20">
          <h3 className="text-3xl font-semibold mb-6">Recent Memories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="bg-deep-space-blue/50 border-cosmic-gold/20">
                <CardContent className="p-4">
                  <img src={`/placeholder.svg?height=200&width=300&text=Memory ${item}`} alt={`Memory ${item}`} className="w-full h-40 object-cover rounded-lg mb-4" />
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-cosmic-gold">New York, USA</span>
                    <span className="text-sm text-ethereal-purple">2 days ago</span>
                  </div>
                  <p className="text-sm line-clamp-2">A beautiful sunset over the city skyline, with vibrant colors painting the sky...</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technical Features Section */}
        <section className="my-20 bg-deep-space-blue/50 rounded-lg p-8">
          <h3 className="text-3xl font-semibold mb-6">Technical Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-semibold mb-2">IPFS Storage</h4>
              <p>Your memories are stored securely and permanently on the InterPlanetary File System.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Blockchain Verification</h4>
              <p>Each memory NFT is verified and traceable on the Ethereum blockchain.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">AI Generation Quality</h4>
              <p>Choose from multiple AI models to generate the perfect visual representation of your memory.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Map Integration</h4>
              <p>Pinpoint your memories on an interactive global map, creating a personal journey through time and space.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-deep-space-blue/30 py-6 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 OMIverse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}