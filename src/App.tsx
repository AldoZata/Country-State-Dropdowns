import React from 'react'
import { CountryStateDropdowns } from '@/components/country-state-dropdowns'

export default function App() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Country & State Selector</h1>
            <p className="text-muted-foreground text-lg">Select a country to view its available states</p>
          </div>

          <div className="bg-card border rounded-lg p-8 shadow-sm">
            <CountryStateDropdowns />
          </div>
        </div>
      </div>
    </main>
  )
}


