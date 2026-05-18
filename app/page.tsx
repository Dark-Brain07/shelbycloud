"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Cloud, Database, Lock } from "lucide-react";
import { M_PLUS_Rounded_1c } from "next/font/google";

const mPlus = M_PLUS_Rounded_1c({ weight: ["400", "800"], subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`relative min-h-screen overflow-hidden bg-background ${mPlus.className}`}>
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-pink-500/20 blur-[120px] animate-blob-spin pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[120px] animate-blob-spin pointer-events-none" style={{ animationDelay: "2s" }} />

      {/* Header with Logo */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
          <img src="/shelby_cloud_logo.png" className="w-14 h-14 rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.6)] border-2 border-pink-500/30 object-cover" alt="Shelby Cloud Logo" />
          <span className="font-black text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">Shelby Cloud</span>
        </Link>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mb-8 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            Decentralized Storage
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">Reimagined.</span>
          </h1>

          <p className="text-lg md:text-xl text-cyan-100 max-w-2xl mx-auto mb-12 text-balance leading-relaxed tracking-wide font-medium">
            Experience the future of blob storage. Upload, manage, and distribute your files on the Aptos network with unparalleled speed and anime-level power!
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white rounded-2xl font-bold transition-all overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.4)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative tracking-wider">Enter App</span>
              <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto w-full"
        >
          {[
            { icon: Database, title: "On-Chain Registry", desc: "Verifiable blob commitments stored natively on Aptos." },
            { icon: Cloud, title: "High Throughput", desc: "Lightning fast retrieval from decentralized nodes." },
            { icon: Lock, title: "Erasure Coded", desc: "Maximum durability with advanced erasure coding." },
          ].map((feature, i) => (
            <div key={i} className="bg-surface/80 backdrop-blur-xl p-6 rounded-2xl border border-pink-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all text-left group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-2">{feature.title}</h3>
              <p className="text-pink-100/70 text-sm font-medium tracking-wide">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
