'use client'

import { deleteEntry, updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import DeleteConfirmation from './DeleteConfirmation'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

const DEFAULT_PROMPTS = [
  `What would I do if money were no object?`,
  `What activities have recently energized or drained me?`,
  `If I knew I'd die in 2 years, how would I spend my time?`,
  `Rating myself out of 10 in work, health and relationships. What's one step to improve each?`,
  `What am I grateful for today?`,
  `What is a boundary I need to set in my life?`,
  `What did I learn from my last relationship or an observed one?`,
  `What's a small frustration I can improve or let go of?`,
  `A letter to someone I miss or thanking someone who impacted my life.`,
  `What excites me? What drains me? What did I learn this week?`,
]

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)
  const [entryDate, setEntryDate] = useState(entry.createdAt)
  const [usePrompts, setUsePrompts] = useState(false)
  const [startedTyping, setStartedTyping] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false)
  const [selectedPrompts, setSelectedPrompts] = useState(entry.prompts || [])
  const [promptResponses, setPromptResponses] = useState(
    Array.isArray(entry.content)
      ? entry.content
      : selectedPrompts.map((prompt) => ({ prompt, response: '' }))
  )

  const router = useRouter()

  const handlePromptToggle = () => {
    setUsePrompts(!usePrompts)
    if (!usePrompts) {
      setIsPromptModalOpen(true)
    } else {
      // Convert back to plain text if needed
      setValue(
        typeof value === 'string'
          ? value
          : value.map((item) => item.response).join('\n\n')
      )
      setPromptResponses([])
    }
  }

  const handlePromptSelection = (prompt) => {
    const isSelected = selectedPrompts.includes(prompt)
    const newSelectedPrompts = isSelected
      ? selectedPrompts.filter((p) => p !== prompt)
      : [...selectedPrompts, prompt]

    setSelectedPrompts(newSelectedPrompts)

    // Update prompt responses
    const newPromptResponses = newSelectedPrompts.map(
      (p) =>
        promptResponses.find((pr) => pr.prompt === p) || {
          prompt: p,
          response: '',
        }
    )
    setPromptResponses(newPromptResponses)
  }

  const handlePromptResponseChange = (prompt, response) => {
    const updatedResponses = promptResponses.map((pr) =>
      pr.prompt === prompt ? { ...pr, response } : pr
    )
    setPromptResponses(updatedResponses)

    // Update value for autosave if using prompts
    if (usePrompts) {
      setValue(updatedResponses)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (1 + date.getMonth()).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const { mood, summary, subject, negative, color } = analysis
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]

  const handleSave = async () => {
    try {
      const dataToSave = usePrompts ? promptResponses : { content: value }

      await updateEntry(entry.id, {
        content: dataToSave,
        prompts: selectedPrompts,
      })
    } catch (error) {
      console.error('Error saving entry:', error)
    }
  }

  useAutosave({
    data: { id: entry.id, content: value },
    onSave: async ({ content }) => {
      setIsLoading(true)
      try {
        const data = await updateEntry(entry.id, {
          content: usePrompts ? promptResponses : content,
          prompts: selectedPrompts,
        })
        setAnalysis(data.analysis)
      } catch (error) {
        console.error('Autosave error:', error)
      }
      setIsLoading(false)
    },
  })

  return (
    <>
      {/* Prompt Selection Modal */}
      <Dialog open={isPromptModalOpen} onOpenChange={setIsPromptModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Prompts</DialogTitle>
            <DialogDescription>
              Choose the prompts you want to use in your journal entry
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            {DEFAULT_PROMPTS.map((prompt) => (
              <div
                key={prompt}
                className={`p-2 border rounded cursor-pointer ${
                  selectedPrompts.includes(prompt)
                    ? 'bg-blue-100 border-blue-500'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handlePromptSelection(prompt)}
              >
                {prompt}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Editor Layout */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 text-sm md:text-xl">
        <div className="col-span-2">
          {/* Prompt Toggle */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={usePrompts}
                onCheckedChange={handlePromptToggle}
              />
              <span>Use Prompts</span>
            </div>

            {usePrompts && (
              <Button
                variant="outline"
                onClick={() => setIsPromptModalOpen(true)}
              >
                Edit Prompts
              </Button>
            )}
          </div>

          {/* Conditional Rendering Based on Prompt Usage */}
          {usePrompts ? (
            <div className="space-y-4">
              {selectedPrompts.map((prompt) => (
                <div key={prompt} className="mb-4">
                  <label className="block mb-2 font-bold">{prompt}</label>
                  <textarea
                    placeholder={`Reflect on: ${prompt}`}
                    value={
                      promptResponses.find((pr) => pr.prompt === prompt)
                        ?.response || ''
                    }
                    onChange={(e) =>
                      handlePromptResponseChange(prompt, e.target.value)
                    }
                    className="w-full bg-slate-700/40 p-2 rounded-lg min-h-[100px]"
                  />
                </div>
              ))}
            </div>
          ) : (
            <textarea
              placeholder="Write your journal entry here..."
              value={
                typeof value === 'string'
                  ? value
                  : value.map((item) => item.response).join('\n\n')
              }
              onChange={(e) => setValue(e.target.value)}
              className="bg-slate-700/40 w-full h-[calc(60vh-70px)] md:h-[calc(100vh-100px)] p-2 rounded-lg outline-none text-sm md:text-lg"
            />
          )}
        </div>

        {/* Rest of the existing analysis section remains the same */}
        <div className="border border-slate-400/30 mx-2 md:mx-4 rounded-lg ">
          {/* ... (existing analysis rendering code) ... */}
        </div>
      </div>
    </>
  )
}

export default Editor
