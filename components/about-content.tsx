"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Sparkles, Compass, BookOpen } from "lucide-react"

interface ExpandableSection {
  id: string
  title: string
  content: string
  expanded: boolean
}

export function AboutContent() {
  const [sections, setSections] = useState<ExpandableSection[]>([
    {
      id: "history",
      title: "Ancient Origins & Cultural Heritage",
      content: `Kolam is a traditional art form from Tamil Nadu, South India, with roots stretching back over 5,000 years. These intricate geometric patterns are drawn with rice flour or chalk powder at the entrance of homes, temples, and public spaces. Originally created by women at dawn, Kolam serves multiple purposes: welcoming guests, providing food for small creatures like ants, and creating positive energy flow.

The word "Kolam" derives from the Tamil word "kolam" meaning "form" or "beauty." Each pattern tells a story, represents a prayer, or marks a special occasion. During festivals like Pongal, elaborate Kolam designs can cover entire courtyards, showcasing the artist's skill and devotion.

Beyond their aesthetic beauty, Kolam patterns embody deep philosophical concepts about the cyclical nature of life, the interconnectedness of all beings, and the harmony between order and chaos. They represent the eternal dance of creation and destruction, making them not just art, but a form of meditation and spiritual practice.`,
      expanded: false,
    },
    {
      id: "types",
      title: "Pattern Classifications & Styles",
      content: `Kolam patterns can be broadly classified into several distinct categories, each with its own rules and aesthetic principles:

**Sikku Kolam (Continuous Line)**: These patterns are drawn without lifting the hand, creating flowing, unbroken lines that weave through dot grids. They represent the continuity of life and the interconnected nature of existence. Master artists can create incredibly complex Sikku patterns that appear to be impossible mazes but follow strict mathematical rules.

**Pulli Kolam (Dot Grid)**: Based on a grid of dots, these patterns connect the dots with straight or curved lines to form geometric shapes. The dots represent the stars in the sky, and the lines connecting them represent the paths of destiny. Different grid sizes (3x3, 5x5, 7x7, etc.) create varying levels of complexity.

**Kambi Kolam (Line Patterns)**: These are freehand patterns drawn without reference to dots, allowing for more organic and flowing designs. They often incorporate natural motifs like flowers, leaves, birds, and abstract representations of cosmic elements.

**Padi Kolam (Step Patterns)**: These patterns grow outward from a central point in concentric layers, representing the expansion of consciousness and the growth of wisdom. Each layer adds complexity while maintaining perfect symmetry.`,
      expanded: false,
    },
    {
      id: "mathematics",
      title: "Mathematical Beauty & Geometric Principles",
      content: `Kolam patterns are masterpieces of applied mathematics, incorporating sophisticated geometric principles that have fascinated mathematicians and computer scientists worldwide:

**Symmetry Groups**: Kolam patterns exhibit various types of symmetry including rotational symmetry (2-fold, 4-fold, 8-fold), reflective symmetry across multiple axes, and translational symmetry. These symmetries follow the mathematical principles of group theory and crystallography.

**Fractal Properties**: Many Kolam designs exhibit self-similar patterns at different scales, displaying fractal-like properties. The recursive nature of these patterns creates infinite complexity from simple rules, similar to mathematical fractals like the Mandelbrot set.

**Graph Theory**: Sikku Kolam patterns are essentially Eulerian paths - continuous paths that visit every edge of a graph exactly once. This connects Kolam to fundamental concepts in graph theory and topology, making them valuable for studying network connectivity and optimization problems.

**Algorithmic Generation**: The rule-based nature of Kolam creation makes them perfect subjects for algorithmic generation and computer graphics. Researchers have developed L-systems and cellular automata that can generate Kolam-like patterns, bridging traditional art with modern computational methods.

**Geometric Transformations**: Kolam patterns extensively use transformations like rotation, reflection, translation, and scaling. Understanding these transformations helps in analyzing the underlying mathematical structure and creating new variations.`,
      expanded: false,
    },
    {
      id: "modern",
      title: "Contemporary Applications & Digital Renaissance",
      content: `In the digital age, Kolam has found new expressions and applications that extend far beyond its traditional boundaries:

**Computer Graphics & Animation**: Kolam patterns inspire procedural generation algorithms in computer graphics, creating dynamic, evolving patterns for digital art, video games, and architectural visualization. The mathematical precision of Kolam makes it ideal for parametric design and generative art.

**Educational Tools**: Interactive Kolam applications help students understand complex mathematical concepts like symmetry, geometry, and algorithmic thinking. The visual and tactile nature of Kolam makes abstract mathematical concepts more accessible and engaging.

**Therapeutic Applications**: Drawing Kolam patterns has been found to have meditative and therapeutic benefits, similar to mandala creation. The repetitive, focused nature of the practice helps reduce stress, improve concentration, and promote mindfulness.

**Cultural Preservation**: Digital platforms and apps are helping preserve traditional Kolam knowledge, allowing master artists to share their techniques with global audiences and ensuring that this ancient art form continues to thrive in the modern world.

**Scientific Research**: Kolam patterns are being studied in fields ranging from materials science (for creating new crystal structures) to artificial intelligence (for pattern recognition and machine learning algorithms). The intersection of art, mathematics, and science continues to yield new insights and applications.`,
      expanded: false,
    },
  ])

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((section) => (section.id === id ? { ...section, expanded: !section.expanded } : section)),
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold mb-6 neon-text"
        >
          About Kolam
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          Discover the ancient art form that bridges spirituality, mathematics, and digital innovation. Kolam patterns
          represent one of humanity's most beautiful expressions of geometric harmony and cultural wisdom.
        </motion.p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-8 neon-border text-center h-full">
            <div className="w-16 h-16 mx-auto mb-4 neon-border-pink rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 neon-text-pink" />
            </div>
            <h3 className="text-xl font-semibold mb-3 neon-text-blue">Sacred Geometry</h3>
            <p className="text-muted-foreground">
              Explore patterns that embody cosmic principles and mathematical perfection, connecting the finite with the
              infinite.
            </p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="p-8 neon-border text-center h-full">
            <div className="w-16 h-16 mx-auto mb-4 neon-border-blue rounded-full flex items-center justify-center">
              <Compass className="w-8 h-8 neon-text-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3 neon-text-blue">Cultural Heritage</h3>
            <p className="text-muted-foreground">
              Preserve and celebrate 5,000 years of artistic tradition that continues to inspire contemporary creators
              worldwide.
            </p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="p-8 neon-border text-center h-full">
            <div className="w-16 h-16 mx-auto mb-4 neon-border-orange rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 neon-text-orange" />
            </div>
            <h3 className="text-xl font-semibold mb-3 neon-text-blue">Mathematical Beauty</h3>
            <p className="text-muted-foreground">
              Discover how ancient artists intuitively understood complex mathematical concepts like fractals, symmetry,
              and topology.
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            <Card className="neon-border overflow-hidden">
              <Button
                variant="ghost"
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left hover:bg-background/50 neon-button bg-transparent"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold neon-text-orange">{section.title}</h2>
                  {section.expanded ? (
                    <ChevronUp className="w-6 h-6 neon-text-blue" />
                  ) : (
                    <ChevronDown className="w-6 h-6 neon-text-blue" />
                  )}
                </div>
              </Button>

              <AnimatePresence>
                {section.expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="prose prose-invert max-w-none">
                        {section.content.split("\n\n").map((paragraph, pIndex) => {
                          if (paragraph.startsWith("**") && paragraph.endsWith("**:")) {
                            // Handle bold headers
                            const title = paragraph.slice(2, -3)
                            return (
                              <h4 key={pIndex} className="text-lg font-semibold neon-text-blue mt-6 mb-2">
                                {title}
                              </h4>
                            )
                          } else if (paragraph.startsWith("**") && paragraph.includes("**:")) {
                            // Handle bold inline text
                            const parts = paragraph.split("**")
                            return (
                              <p key={pIndex} className="text-muted-foreground leading-relaxed mb-4">
                                {parts.map((part, partIndex) => {
                                  if (partIndex % 2 === 1 && part.endsWith(":")) {
                                    return (
                                      <span key={partIndex} className="font-semibold neon-text-blue">
                                        {part}
                                      </span>
                                    )
                                  }
                                  return part
                                })}
                              </p>
                            )
                          } else {
                            return (
                              <p key={pIndex} className="text-muted-foreground leading-relaxed mb-4">
                                {paragraph}
                              </p>
                            )
                          }
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center mt-16"
      >
        <Card className="p-12 neon-border">
          <h2 className="text-3xl font-bold mb-4 neon-text">Start Your Kolam Journey</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the meditative beauty of creating Kolam patterns while exploring their mathematical foundations
            and cultural significance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => (window.location.href = "/")} className="neon-button px-8 py-3 text-lg" size="lg">
              Start Drawing
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/gallery")}
              className="neon-button bg-transparent px-8 py-3 text-lg"
              size="lg"
            >
              Explore Gallery
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
