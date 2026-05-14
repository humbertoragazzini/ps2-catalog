import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="min-h-screen bg-bg-darker relative overflow-hidden selection:bg-primary/30 selection:text-primary">
      {/* Animated Background Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.15, 0.05],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12"
        >
          {children}
        </motion.main>
        
        <footer className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-600 text-xs font-medium uppercase tracking-[0.2em]">
            PS2 Vault Tracker &copy; {new Date().getFullYear()} • Powered by Antigravity
          </p>
        </footer>
      </div>
    </div>
  );
};
