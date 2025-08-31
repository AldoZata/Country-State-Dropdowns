export interface Country {
    id: number
    value: string
  }
  
  export interface State {
    id: number
    value: string
  }
  
  // Configure via Vite environment variables. Only variables prefixed with VITE_ are exposed to the client.
  const BASE_URL = import.meta.env.VITE_API_BASE_URL as string
  const API_KEY = import.meta.env.VITE_API_KEY as string | undefined
  
  if (!BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined. Add it to your .env file.")
  }
  
  const apiHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  }
  
  if (API_KEY) {
    apiHeaders["X-API-Key"] = API_KEY
  }
  
  /**
   * Fetches the list of countries from the API
   */
  export async function fetchCountries(): Promise<Country[]> {
    try {
      const response = await fetch(`${BASE_URL}/countries`, {
        method: "GET",
        headers: apiHeaders,
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const countries: Country[] = await response.json()
      return countries.sort((a, b) => a.value.localeCompare(b.value))
    } catch (error) {
      console.error("Error fetching countries:", error)
      throw new Error("Failed to fetch countries")
    }
  }
  
  /**
   * Fetches the list of states for a given country ID
   */
  export async function fetchStates(countryId: number): Promise<State[]> {
    try {
      const response = await fetch(`${BASE_URL}/countries/${countryId}/states`, {
        method: "GET",
        headers: apiHeaders,
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const states: State[] = await response.json()
      return states.sort((a, b) => a.value.localeCompare(b.value))
    } catch (error) {
      console.error("Error fetching states:", error)
      throw new Error("Failed to fetch states")
    }
  }
  