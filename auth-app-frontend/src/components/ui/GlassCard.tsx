import { motion } from 'framer-motion';
import React from 'react'

const GlassCard = ({ title, children, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className={`rounded-xl p-6 bg-background/60 backdrop-blur-xl border border-border shadow-xl ${className}`}
  >
    <h2 className="font-semibold text-lg mb-4">{title}</h2>
    {children}
  </motion.div>
);

export default GlassCard
