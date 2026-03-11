"use client"

import { motion } from "framer-motion"

export function AnimatedMesh() {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <motion.div
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.25),transparent_40%)] bg-[length:200%_200%]"
            />
        </div>
    )
}