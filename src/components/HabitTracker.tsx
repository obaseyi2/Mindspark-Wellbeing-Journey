import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { format } from 'date-fns'
import { Droplets, Dumbbell, Coffee, BookOpen, Sunrise, Moon, Heart } from 'lucide-react'

const habits = [
  { id: 'water', name: 'Drink Water', icon: Droplets, color: 'text-blue-500' },
  { id: 'exercise', name: 'Stretch/Exercise', icon: Dumbbell, color: 'text-green-500' },
  { id: 'breaks', name: 'Take Breaks', icon: Coffee, color: 'text-orange-500' },
  { id: 'reading', name: 'Read/Learn', icon: BookOpen, color: 'text-purple-500' },
  { id: 'morning', name: 'Morning Routine', icon: Sunrise, color: 'text-yellow-500' },
  { id: 'sleep', name: 'Good Sleep', icon: Moon, color: 'text-indigo-500' },
  { id: 'mindfulness', name: 'Mindfulness', icon: Heart, color: 'text-pink-500' }
]

interface HabitEntry {
  date: string
  habitId: string
  completed: boolean
  timestamp: number
}

export function HabitTracker() {
  const [habitEntries, setHabitEntries] = useLocalStorage<HabitEntry[]>('mindspark-habits', [])
  
  const today = format(new Date(), 'yyyy-MM-dd')
  
  const isHabitCompleted = (habitId: string) => {
    return habitEntries.some(entry => 
      entry.date === today && 
      entry.habitId === habitId && 
      entry.completed
    )
  }

  const toggleHabit = (habitId: string) => {
    const isCompleted = isHabitCompleted(habitId)
    
    if (isCompleted) {
      // Remove the habit entry
      setHabitEntries(prev => 
        prev.filter(entry => !(entry.date === today && entry.habitId === habitId))
      )
    } else {
      // Add the habit entry
      const newEntry: HabitEntry = {
        date: today,
        habitId,
        completed: true,
        timestamp: Date.now()
      }
      setHabitEntries(prev => [...prev, newEntry])
    }
  }

  const getCompletionRate = () => {
    const completedToday = habits.filter(habit => isHabitCompleted(habit.id)).length
    return (completedToday / habits.length) * 100
  }

  const completionRate = getCompletionRate()

  return (
    <Card className="bg-white shadow-dreamy hover:shadow-glow transition-all duration-500 border border-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          Daily Habits
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-primary-glow"
            />
          </div>
          <span className="text-sm font-medium text-primary">
            {Math.round(completionRate)}%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {habits.map((habit, index) => {
            const isCompleted = isHabitCompleted(habit.id)
            const Icon = habit.icon
            
            return (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => toggleHabit(habit.id)}
                  className={`w-full h-auto p-4 rounded-xl transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-primary/10 border-2 border-primary/30 shadow-gentle' 
                      : 'bg-card hover:bg-muted border-2 border-transparent hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className={`p-2 rounded-full ${isCompleted ? 'bg-primary/20' : 'bg-muted'} transition-colors`}>
                      <Icon className={`h-5 w-5 ${habit.color} ${isCompleted ? 'opacity-100' : 'opacity-70'}`} />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <p className={`font-medium ${isCompleted ? 'text-primary' : 'text-foreground'}`}>
                        {habit.name}
                      </p>
                    </div>

                    <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                      isCompleted 
                        ? 'bg-primary border-primary' 
                        : 'border-muted-foreground/30'
                    }`}>
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </Button>
              </motion.div>
            )
          })}
        </div>

        {completionRate === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-primary/10 rounded-xl border border-green-500/20 text-center"
          >
            <div className="text-2xl mb-2">🎉</div>
            <p className="text-sm font-medium text-green-700 dark:text-green-300">
              Amazing! You completed all habits today!
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}