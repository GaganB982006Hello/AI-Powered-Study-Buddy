'use client';

import React, { useState } from 'react';
import { Flashcard } from '@/components/Flashcard';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, Brain, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('High School');
    const [explanation, setExplanation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleExplain = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/explain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, difficulty }),
            });
            const data = await res.json();
            setExplanation(data.explanation);
        } catch (error) {
            console.error(error);
            setExplanation('Oops! Something went wrong. Make sure you have your GEMINI_API_KEY set up.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            {/* Hero Section */}
            <section className="pt-20 pb-10 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                >
                    <Sparkles size={16} />
                    <span>AI-Powered Study Buddy</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent"
                >
                    Master Any Topic. <br /> Simply.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto text-zinc-500 dark:text-zinc-400 text-lg mb-10"
                >
                    Your personal tutor for simplifying complex concepts, summarizing notes, and testing your knowledge with AI-generated flashcards.
                </motion.p>
            </section>

            {/* Feature Section: Explain it Simply */}
            <section className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-card rounded-3xl p-8 shadow-2xl shadow-primary/5 border border-border">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-primary rounded-lg text-white">
                            <Zap size={24} />
                        </div>
                        <h2 className="text-2xl font-bold">Explain it Simply</h2>
                    </div>

                    <div className="grid gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">What concept are you struggling with?</label>
                            <input
                                type="text"
                                placeholder="e.g. Quantum Entanglement, Photosynthesis, Stock Market"
                                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                            <div className="flex gap-2">
                                {['Child', 'High School', 'College'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setDifficulty(level)}
                                        className={cn(
                                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                            difficulty === level
                                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                                : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                        )}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleExplain}
                            disabled={loading || !topic}
                            className="w-full py-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                        >
                            {loading ? "Thinking..." : "Simplify This"}
                        </button>
                    </div>

                    <AnimatePresence>
                        {explanation && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-10 p-6 rounded-2xl bg-zinc-900/50 border border-border whitespace-pre-wrap leading-relaxed"
                            >
                                {explanation}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Flashcard Demo Section */}
            <section className="max-w-4xl mx-auto px-6 py-20 text-center">
                <div className="flex flex-col items-center gap-4 mb-12">
                    <div className="p-2 bg-emerald-500 rounded-lg text-white">
                        <Brain size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-center">Interactive Flashcards</h2>
                    <p className="text-zinc-500">Active recall is the fastest way to learn. Try our interactive generator.</p>
                </div>

                <div className="flex justify-center">
                    <Flashcard
                        front="What is Quantum Entanglement?"
                        back="A phenomenon where particles become linked, such that the state of one instantly influences the state of the other, regardless of distance."
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 text-center border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-center gap-2 font-bold text-xl mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white italic text-xs">AI</div>
                    StudyBuddy
                </div>
                <p className="text-zinc-500 text-sm">Powered by Google Gemini & Next.js</p>
            </footer>
        </main>
    );
}
