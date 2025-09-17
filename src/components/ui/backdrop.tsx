import { motion } from 'motion/react';

export default function Backdrop() {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.8)] fixed top-0 z-100`}></motion.div>
    )
}