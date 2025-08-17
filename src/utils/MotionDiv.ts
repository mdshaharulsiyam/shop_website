'use client'
import dynamic from "next/dynamic";

const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false } // Disable SSR for animations
);

export default MotionDiv;

