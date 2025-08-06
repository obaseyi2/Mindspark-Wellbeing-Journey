import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { format } from 'date-fns'

const moods = [
  { emoji: '😄', label: 'Very Happy', value: 5, color: 'text-green-500' },
  { emoji: '🙂', label: 'Happy', value: 4, color: 'text-blue-500' },
  { emoji: '😐', label: 'Neutral', value: 3, color: 'text-gray-500' },
  { emoji: '😢', label: 'Sad', value: 2, color: 'text-orange-500' },
  { emoji: '😠', label: 'Angry', value: 1, color: 'text-red-500' }
]

interface MoodEntry {
  date: string
  mood: number
  emoji: string
  timestamp: number
}

export function MoodTracker() {
  const [moodHistory, setMoodHistory] = useLocalStorage<MoodEntry[]>('mindspark-moods', [])
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const today = format(new Date(), 'yyyy-MM-dd')
  const todaysMood = moodHistory.find(entry => entry.date === today)

  const handleMoodSelect = (mood: typeof moods[0]) => {
    setSelectedMood(mood.value)
    setIsAnimating(true)
    
    setTimeout(() => {
      const newEntry: MoodEntry = {
        date: today,
        mood: mood.value,
        emoji: mood.emoji,
        timestamp: Date.now()
      }

      setMoodHistory(prev => {
        const filtered = prev.filter(entry => entry.date !== today)
        return [...filtered, newEntry].sort((a, b) => b.timestamp - a.timestamp)
      })
      
      setIsAnimating(false)
    }, 300)
  }

  return (
    <Card className="bg-white shadow-dreamy hover:shadow-glow transition-all duration-500 border border-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          How are you feeling today?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {todaysMood ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-6 bg-gradient-calm rounded-2xl"
          >
            <div className="text-6xl mb-3">{todaysMood.emoji}</div>
            <p className="text-lg font-medium text-muted-foreground">
              Mood logged for today!
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setMoodHistory(prev => prev.filter(entry => entry.date !== today))}
              className="mt-3 text-primary hover:bg-primary/10"
            >
              Change mood
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood, index) => (
              <motion.button
                key={mood.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMoodSelect(mood)}
                disabled={isAnimating}
                className="p-4 rounded-2xl bg-card hover:bg-gradient-inspire transition-all duration-300 shadow-gentle hover:shadow-peaceful group"
              >
                <div className="text-4xl mb-2 group-hover:animate-bounce">
                  {mood.emoji}
                </div>
                <p className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
                  {mood.label}
                </p>
              </motion.button>
            ))}
          </div>
        )}

        {moodHistory.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Recent Moods</h4>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {moodHistory.slice(0, 7).map((entry) => (
                <div 
                  key={entry.timestamp}
                  className="flex-shrink-0 text-center p-2 rounded-xl bg-muted/50"
                >
                  <div className="text-2xl">{entry.emoji}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {format(new Date(entry.timestamp), 'MMM dd')}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}