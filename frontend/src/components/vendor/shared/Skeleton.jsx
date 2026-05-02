import { motion } from 'framer-motion'

export default function Skeleton({ className }) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 0.8 }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }}
      className={`bg-stone-200 dark:bg-white/5 rounded-xl ${className}`}
    />
  )
}
