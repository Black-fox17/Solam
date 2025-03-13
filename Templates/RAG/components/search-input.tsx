"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchInput() {
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    // TODO: Implement AI search functionality
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSearch} className="relative mb-8">
      <div className="relative flex gap-2">
        <Input
          placeholder="Describe what you're looking for... (e.g. 'a comfortable office chair under $200')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12"
        />
        <Button type="submit" className="h-12 px-8" disabled={isLoading}>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </motion.div>
            ) : (
              <motion.div
                key="search"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </form>
  )
}

