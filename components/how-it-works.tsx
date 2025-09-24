"use client"

import { motion } from "framer-motion"
import { Palette, Search, Download } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Palette,
      title: "Create",
      description: "Generate kolam patterns using traditional parameters or upload your own designs",
    },
    {
      icon: Search,
      title: "Analyze",
      description: "Discover the mathematical principles, symmetries, and geometric transformations",
    },
    {
      icon: Download,
      title: "Export",
      description: "Download your patterns as SVG or PNG files for further use",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 neon-text">How It Works</h2>
          <p className="text-lg text-muted-foreground">Three simple steps to explore kolam patterns</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full neon-border-blue flex items-center justify-center">
                <step.icon className="w-8 h-8 text-neon-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-4 neon-text-orange">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a
              href="/about"
              className="neon-button bg-transparent px-8 py-3 text-lg rounded-lg inline-block text-white hover:text-white"
            >
              Read More About Kolam
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
