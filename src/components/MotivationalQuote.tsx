import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw, Quote } from 'lucide-react'

const quotes = [
  {
    text: "The present moment is the only time over which we have dominion.",
    author: "Thích Nhất Hạnh"
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha"
  },
  {
    text: "You are enough just as you are.",
    author: "Meghan Markle"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde"
  },
  {
    text: "Yesterday is history, tomorrow is a mystery, today is a gift.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  },
  {
    text: "Progress, not perfection.",
    author: "Anonymous"
  }
]

export function MotivationalQuote() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getRandomQuote = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      setCurrentQuote(quotes[randomIndex])
      setIsRefreshing(false)
    }, 300)
  }

  useEffect(() => {
    // Set a random quote on component mount
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setCurrentQuote(quotes[randomIndex])
  }, [])

  return (
    <Card className="bg-white shadow-dreamy hover:shadow-glow transition-all duration-500 border border-white/50 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={getRandomQuote}
          disabled={isRefreshing}
          className="text-primary hover:bg-primary/10 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <CardContent className="p-8">
        <motion.div
          key={currentQuote.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="relative">
            <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/30" />
            <blockquote className="text-lg md:text-xl font-medium text-foreground leading-relaxed pl-6">
              "{currentQuote.text}"
            </blockquote>
          </div>
          
          <footer className="text-right">
            <cite className="text-sm text-muted-foreground font-medium not-italic">
              — {currentQuote.author}
            </cite>
          </footer>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 h-1 bg-gradient-to-r from-primary to-primary-glow rounded-full origin-left"
        />
      </CardContent>
    </Card>
  )
}