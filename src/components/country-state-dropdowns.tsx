import { useState, useEffect } from "react"
import { fetchCountries, fetchStates, type Country, type State } from "@/lib/api"

export function CountryStateDropdowns() {
    const [countries, setCountries] = useState<Country[]>([])
    const [states, setStates] = useState<State[]>([])
    const [selectedCountry, setSelectedCountry] = useState<string>("")
    const [selectedState, setSelectedState] = useState<string>("")
    const [loadingCountries, setLoadingCountries] = useState(true)
    const [loadingStates, setLoadingStates] = useState(false)
  
      // Load countries on component mount
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoadingCountries(true)
        const countriesData = await fetchCountries()
        setCountries(countriesData)
        console.log(countriesData)
      } catch (error) {
        console.error("Failed to load countries:", error)
      } finally {
        setLoadingCountries(false)
      }
    }

    loadCountries()
  }, [])

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
            
            setStates([])
          } finally {
            setLoadingStates(false)
          }
        }
    
        loadStates()
    }, [selectedCountry])
    
      return (
        <div className="space-y-6">
        </div>
      )
}