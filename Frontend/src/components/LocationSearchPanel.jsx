import React, { useState, useEffect } from 'react'
import axios from 'axios'

const LocationSearchPanel = (props) => {
  // 'query' holds the current text in the input field (either pickup or destination),
  // 'setQuery' is the setter function to update that field in the parent component.
  // 'setOpenPanel' is used to close the panel after a suggestion is chosen.
  // Optionally, you can use 'setVehiclePanel', if needed once the selection is done.
  const { query, setQuery, setOpenPanel, setVehiclePanel } = props
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query && query.length > 2) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/Maps/get-suggestions`, {
            params: { input: query },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          setSuggestions(response.data)
        } catch (err) {
          console.error("Error fetching suggestions:", err)
        }
      } else {
        setSuggestions([])
      }
    }

    // Debounce the API call for 300 ms
    const debounceTimer = setTimeout(() => {
      fetchSuggestions()
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query])

  return (
    <div className="p-4">
      {suggestions.map((suggestion, idx) => (
        <div
          key={idx}
          onClick={() => {
            setQuery(suggestion)
            // setOpenPanel(false)
            // Optionally, trigger any subsequent action
            // if(setVehiclePanel) setVehiclePanel(true)
          }}
          className="flex items-center rounded-xl border-gray-50 border-2 p-3 justify-start gap-4 my-2 cursor-pointer active:border-black"
        >
          <div className="bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-fill"></i>
          </div>
          <span className="font-medium">{suggestion}</span>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel
