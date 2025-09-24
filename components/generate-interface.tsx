"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GenerateFromInputs } from "@/components/generate-from-inputs"
import { GenerateFromImage } from "@/components/generate-from-image"

export function GenerateInterface() {
  return (
    <div className="max-w-6xl mx-auto">
      <Tabs defaultValue="inputs" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 neon-border bg-background/50">
          <TabsTrigger
            value="inputs"
            className="text-white data-[state=active]:text-white data-[state=active]:neon-border-blue"
          >
            Generate from Inputs
          </TabsTrigger>
          <TabsTrigger
            value="image"
            className="text-white data-[state=active]:text-white data-[state=active]:neon-border-blue"
          >
            Generate from Image
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inputs">
          <GenerateFromInputs />
        </TabsContent>

        <TabsContent value="image">
          <GenerateFromImage />
        </TabsContent>
      </Tabs>
    </div>
  )
}
