'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { motion } from 'motion/react';
import { useState } from 'react';
import { cn } from '@/libs/utils';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

interface FaqSectionProps {
  data: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function FaqSection({
  data,
  title = 'Frequently Asked Questions',
  subtitle = 'Find answers to common questions about our gym facilities and services',
  className,
}: FaqSectionProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className={cn('mx-auto max-w-4xl', className)}>
      {/* Header */}
      {(title || subtitle) && (
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {title && (
            <h2 className="mb-4 font-bold font-display text-2xl text-white sm:text-3xl md:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      {/* FAQ Container */}
      <div className="rounded-3xl border border-white/10 bg-surface/30 p-6 backdrop-blur-sm sm:p-8">
        <Accordion.Root
          className="space-y-4"
          collapsible
          onValueChange={(value) => setOpenItem(value)}
          type="single"
          value={openItem || ''}
        >
          {data.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              key={item.id}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Accordion.Item
                className="overflow-hidden rounded-2xl border border-white/10 bg-surface/20 transition-all duration-300 hover:bg-surface/40"
                value={item.id.toString()}
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between p-6 text-left transition-all duration-300 hover:bg-white/5">
                    <div className="flex flex-1 items-center gap-4">
                      {item.icon && (
                        <div className="flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 transition-all duration-300 group-hover:bg-primary/30">
                            <span className="text-2xl">{item.icon}</span>
                          </div>
                        </div>
                      )}
                      <span className="font-semibold text-lg text-white transition-colors duration-300 group-hover:text-primary">
                        {item.question}
                      </span>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <motion.div
                        animate={{
                          rotate: openItem === item.id.toString() ? 180 : 0,
                        }}
                        className="h-6 w-6 text-primary"
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content asChild forceMount>
                  <motion.div
                    animate={
                      openItem === item.id.toString() ? 'open' : 'collapsed'
                    }
                    className="overflow-hidden"
                    initial="collapsed"
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    variants={{
                      open: {
                        opacity: 1,
                        height: 'auto',
                        marginTop: 0,
                        marginBottom: 24,
                      },
                      collapsed: {
                        opacity: 0,
                        height: 0,
                        marginTop: 0,
                        marginBottom: 0,
                      },
                    }}
                  >
                    <div className="px-6 pt-0 pb-6">
                      <div className="rounded-xl border border-primary/20 bg-black/20 p-4 backdrop-blur-sm">
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
