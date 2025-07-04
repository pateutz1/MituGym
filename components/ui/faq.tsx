"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/libs/utils";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

interface FaqSectionProps {
  data: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function FaqSection({ 
  data, 
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our gym facilities and services",
  className 
}: FaqSectionProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className={cn("mx-auto max-w-4xl", className)}>
      {/* Header */}
      {(title || subtitle) && (
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      {/* FAQ Container */}
      <div className="bg-surface/30 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8">
        <Accordion.Root
          type="single"
          collapsible
          value={openItem || ""}
          onValueChange={(value) => setOpenItem(value)}
          className="space-y-4"
        >
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Accordion.Item 
                value={item.id.toString()} 
                className="border border-white/10 rounded-2xl overflow-hidden bg-surface/20 hover:bg-surface/40 transition-all duration-300"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left hover:bg-white/5 transition-all duration-300 group">
                    <div className="flex items-center gap-4 flex-1">
                      {item.icon && (
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300">
                            <span className="text-2xl">{item.icon}</span>
                          </div>
                        </div>
                      )}
                      <span className="font-semibold text-white text-lg group-hover:text-primary transition-colors duration-300">
                        {item.question}
                      </span>
                    </div>

                    <div className="flex-shrink-0 ml-4">
                      <motion.div
                        animate={{ rotate: openItem === item.id.toString() ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-6 h-6 text-primary"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </motion.div>
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                
                <Accordion.Content asChild forceMount>
                  <motion.div
                    initial="collapsed"
                    animate={openItem === item.id.toString() ? "open" : "collapsed"}
                    variants={{
                      open: { 
                        opacity: 1, 
                        height: "auto",
                        marginTop: 0,
                        marginBottom: 24
                      },
                      collapsed: { 
                        opacity: 0, 
                        height: 0,
                        marginTop: 0,
                        marginBottom: 0
                      },
                    }}
                    transition={{ 
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98]
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                        <p className="text-white/80 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
} 