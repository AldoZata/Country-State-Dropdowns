"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, MapPin, Flag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { fetchCountries, fetchStates, type Country, type State } from "@/lib/api"

export function CountryStateDropdowns() {
  const [countries, setCountries] = useState<Country[]>([])
  const [states, setStates] = useState<State[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [selectedState, setSelectedState] = useState<string>("")
  const [loadingCountries, setLoadingCountries] = useState(true)
  const [loadingStates, setLoadingStates] = useState(false)
  const { toast } = useToast()

  // Load countries on component mount
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoadingCountries(true)
        const countriesData = await fetchCountries()
        setCountries(countriesData)
      } catch (error) {
        console.error("Failed to load countries:", error)
        toast({
          title: "Error",
          description: "Failed to load countries. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoadingCountries(false)
      }
    }

    loadCountries()
  }, [toast])

  // Load states when country is selected
  useEffect(() => {
    const loadStates = async () => {
      if (!selectedCountry) {
        setStates([])
        return
      }

      try {
        setLoadingStates(true)
        setSelectedState("") // Reset state selection
        const statesData = await fetchStates(Number.parseInt(selectedCountry))
        setStates(statesData)
      } catch (error) {
        console.error("Failed to load states:", error)
        toast({
          title: "Error",
          description: "Failed to load states. Please try again.",
          variant: "destructive",
        })
        setStates([])
      } finally {
        setLoadingStates(false)
      }
    }

    loadStates()
  }, [selectedCountry, toast])

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value)
  }

  const handleStateChange = (value: string) => {
    setSelectedState(value)
  }

  const handleSubmit = () => {
    if (!selectedCountry || !selectedState) {
      toast({
        title: "Selection Required",
        description: "Please select both a country and a state.",
        variant: "destructive",
      })
      return
    }

    const country = countries.find((c) => c.id.toString() === selectedCountry)
    const state = states.find((s) => s.id.toString() === selectedState)

    toast({
      title: "Selection Complete",
      description: `You selected ${state?.value}, ${country?.value}`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Country Dropdown */}
      <div className="space-y-2">
        <label htmlFor="country-select" className="text-sm font-medium text-foreground flex items-center gap-2">
          <Flag className="h-4 w-4" />
          Country
        </label>
        <Select value={selectedCountry} onValueChange={handleCountryChange} disabled={loadingCountries}>
          <SelectTrigger id="country-select" className="w-full">
            <SelectValue placeholder={loadingCountries ? "Loading countries..." : "Select a country"} />
          </SelectTrigger>
          <SelectContent>
            {loadingCountries ? (
              <SelectItem value="loading" disabled>
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading countries...
                </div>
              </SelectItem>
            ) : (
              countries.map((country) => (
                <SelectItem key={country.id} value={country.id.toString()}>
                  {country.value}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* State Dropdown */}
      <div className="space-y-2">
        <label htmlFor="state-select" className="text-sm font-medium text-foreground flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          State
        </label>
        <Select value={selectedState} onValueChange={handleStateChange} disabled={!selectedCountry || loadingStates}>
          <SelectTrigger id="state-select" className="w-full">
            <SelectValue
              placeholder={
                !selectedCountry
                  ? "Select a country first"
                  : loadingStates
                    ? "Loading states..."
                    : states.length === 0
                      ? "No states available"
                      : "Select a state"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {loadingStates ? (
              <SelectItem value="loading" disabled>
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading states...
                </div>
              </SelectItem>
            ) : states.length === 0 ? (
              <SelectItem value="no-states" disabled>
                No states available
              </SelectItem>
            ) : (
              states.map((state) => (
                <SelectItem key={state.id} value={state.id.toString()}>
                  {state.value}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <Button onClick={handleSubmit} disabled={!selectedCountry || !selectedState} className="w-full">
        Submit Selection
      </Button>

      {/* Selection Summary */}
      {selectedCountry && selectedState && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Current Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Country:</span>{" "}
                {countries.find((c) => c.id.toString() === selectedCountry)?.value}
              </p>
              <p className="text-sm">
                <span className="font-medium">State:</span>{" "}
                {states.find((s) => s.id.toString() === selectedState)?.value}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
