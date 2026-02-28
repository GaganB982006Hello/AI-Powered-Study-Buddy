'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FlashcardProps {
    front: string;
    back: string;
    className?: string;
}

export const Flashcard: React.FC<FlashcardProps> = ({ front, back, className }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={cn("perspective-1000 w-full max-w-md h-64 cursor-pointer", className)}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-full transition-all duration-500 preserve-3d"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Question</span>
                    <p className="text-xl font-medium text-center">{front}</p>
                    <div className="absolute bottom-4 text-xs text-zinc-400">Click to flip</div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center p-6 bg-zinc-900 text-zinc-100 rounded-2xl shadow-xl border border-zinc-700 rotate-y-180"
                >
                    <span className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2">Answer</span>
                    <p className="text-xl font-medium text-center">{back}</p>
                    <div className="absolute bottom-4 text-xs opacity-70">Click to flip back</div>
                </div>
            </motion.div>
        </div>
    );
};
