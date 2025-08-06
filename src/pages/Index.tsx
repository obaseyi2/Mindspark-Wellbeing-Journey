import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/ThemeToggle'
import { MoodTracker } from '@/components/MoodTracker'
import { JournalEntry } from '@/components/JournalEntry'
import { GratitudeWall } from '@/components/GratitudeWall'
import { HabitTracker } from '@/components/HabitTracker'
import { MotivationalQuote } from '@/components/MotivationalQuote'
import { Sparkles, Brain } from 'lucide-react'

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-inspire rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 left-20 w-72 h-72 bg-gradient-wellness rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gradient-peaceful rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-border/50 shadow-gentle"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-3xl bg-gradient-hero shadow-dreamy">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  MindSpark
                </h1>
                <p className="text-sm text-muted-foreground font-medium">Your mindful wellness companion</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Welcome Section */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12 px-6"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="h-6 w-6 text-primary animate-glow-pulse" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Welcome to your mindful journey
              </h2>
              <Sparkles className="h-6 w-6 text-primary animate-glow-pulse" />
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Take a moment to check in with yourself, reflect on your day, and nurture your mental wellness.
            </p>
          </motion.section>

          {/* Top Row - Mood & Quote */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <MoodTracker />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <MotivationalQuote />
            </motion.div>
          </div>

          {/* Middle Row - Journal & Gratitude */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <JournalEntry />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <GratitudeWall />
            </motion.div>
          </div>

          {/* Bottom Row - Habits */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <HabitTracker />
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 text-center py-12 mt-20"
      >
        <div className="max-w-md mx-auto p-6 bg-white/60 backdrop-blur-sm rounded-3xl shadow-dreamy border border-white/20">
          <p className="text-sm text-muted-foreground font-medium">
            Made with ❤️ for your mental wellness journey
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
