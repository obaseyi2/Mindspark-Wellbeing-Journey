import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { format } from 'date-fns'
import { BookOpen, Sparkles } from 'lucide-react'

const journalPrompts = [
  "What made you smile today?",
  "Describe a moment when you felt truly peaceful.",
  "What are you most grateful for right now?",
  "What would you like to let go of today?",
  "Describe your ideal day from start to finish.",
  "What's one thing you learned about yourself today?",
  "If today had a color, what would it be and why?",
  "What are three words that describe how you feel right now?"
]

interface JournalEntry {
  date: string
  content: string
  prompt?: string
  timestamp: number
}

export function JournalEntry() {
  const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>('mindspark-journal', [])
  const [currentEntry, setCurrentEntry] = useState('')
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const today = format(new Date(), 'yyyy-MM-dd')
  const todaysEntry = journalEntries.find(entry => entry.date === today)

  const getRandomPrompt = () => {
    const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)]
    setCurrentPrompt(randomPrompt)
  }

  const handleSave = async () => {
    if (!currentEntry.trim()) return

    setIsSaving(true)
    
    setTimeout(() => {
      const newEntry: JournalEntry = {
        date: today,
        content: currentEntry,
        prompt: currentPrompt || undefined,
        timestamp: Date.now()
      }

      setJournalEntries(prev => {
        const filtered = prev.filter(entry => entry.date !== today)
        return [...filtered, newEntry].sort((a, b) => b.timestamp - a.timestamp)
      })

      setCurrentEntry('')
      setCurrentPrompt(null)
      setIsSaving(false)
    }, 500)
  }

  const handleEdit = () => {
    if (todaysEntry) {
      setCurrentEntry(todaysEntry.content)
      setCurrentPrompt(todaysEntry.prompt || null)
      setJournalEntries(prev => prev.filter(entry => entry.date !== today))
    }
  }

  if (todaysEntry && !currentEntry) {
    return (
      <Card className="bg-white shadow-dreamy hover:shadow-glow transition-all duration-500 border border-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-primary">
            <BookOpen className="h-6 w-6" />
            Today's Journal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {todaysEntry.prompt && (
              <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                <p className="text-sm font-medium text-primary mb-2">Today's prompt:</p>
                <p className="text-sm text-muted-foreground italic">"{todaysEntry.prompt}"</p>
              </div>
            )}
            
            <div className="p-4 bg-card rounded-xl border border-border">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {todaysEntry.content}
              </p>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleEdit}
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Edit Entry
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white shadow-dreamy hover:shadow-glow transition-all duration-500 border border-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl font-semibold text-primary">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Daily Journal
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={getRandomPrompt}
            className="text-primary hover:bg-primary/10"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            Get Prompt
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentPrompt && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-gradient-inspire rounded-xl border border-primary/20"
          >
            <p className="text-sm font-medium text-primary mb-2">Writing prompt:</p>
            <p className="text-sm text-foreground italic">"{currentPrompt}"</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPrompt(null)}
              className="mt-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear prompt
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <Textarea
            placeholder="What's on your mind today? Take a moment to reflect and write your thoughts..."
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            className="min-h-[200px] bg-card border-border focus:border-primary resize-none"
          />

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={!currentEntry.trim() || isSaving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gentle hover:shadow-peaceful transition-all duration-300"
            >
              {isSaving ? 'Saving...' : 'Save Entry'}
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}