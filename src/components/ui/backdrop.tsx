import { motion } from 'motion/react';

export default function Backdrop({ navHeight }: { navHeight: number }) {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`w-[100vw] h-[${window.innerHeight - navHeight}px] bg-[rgba(0,0,0,0.8)] fixed bottom-0 z-100`}></motion.div>
    )
}