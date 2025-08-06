import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Heart, Plus, X } from 'lucide-react'

interface GratitudeItem {
  id: string
  text: string
  timestamp: number
  date: string
}

export function GratitudeWall() {
  const [gratitudeItems, setGratitudeItems] = useLocalStorage<GratitudeItem[]>('mindspark-gratitude', [])
  const [newGratitude, setNewGratitude] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = () => {
    if (!newGratitude.trim()) return

    const newItem: GratitudeItem = {
      id: Date.now().toString(),
      text: newGratitude.trim(),
      timestamp: Date.now(),
      date: new Date().toLocaleDateString()
    }

    setGratitudeItems(prev => [newItem, ...prev])
    setNewGratitude('')
    setIsAdding(false)
  }

  const handleRemove = (id: string) => {
    setGratitudeItems(prev => prev.filter(item => item.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
    if (e.key === 'Escape') {
      setIsAdding(false)
      setNewGratitude('')
    }
  }

  return (
    <Card className="bg-white shadow-dreamy hover:shadow-glow transition-all duration-500 border border-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl font-semibold text-primary">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            Gratitude Wall
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdding(!isAdding)}
            className="text-primary hover:bg-primary/10"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <Input
                placeholder="What are you grateful for today?"
                value={newGratitude}
                onChange={(e) => setNewGratitude(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-card border-border focus:border-primary"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleAdd}
                  disabled={!newGratitude.trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsAdding(false)
                    setNewGratitude('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          <AnimatePresence>
            {gratitudeItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="group p-4 bg-card rounded-xl shadow-sm hover:shadow-gentle transition-all duration-200 border border-border hover:border-primary/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-foreground leading-relaxed">{item.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">{item.date}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {gratitudeItems.length === 0 && !isAdding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-muted-foreground"
          >
            <Heart className="h-12 w-12 mx-auto mb-3 text-red-300" />
            <p className="text-sm">Start building your gratitude wall!</p>
            <p className="text-xs mt-1">Click the + button to add what you're grateful for</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}