import { createContext, useEffect, useState } from 'react'
import { jsx as _jsx } from 'react/jsx-runtime'
import { useInterval } from '../index'
import { getCurrentLocation } from './getCurrentLocation'
export const LocationContext = createContext({
  location: null,
})
export const LocationProvider = ({ highAccuracy, delay, children }) => {
  const [location, setLocation] = useState({
    location: null,
  })
  const updateLocation = () => {
    getCurrentLocation(highAccuracy)
      .then((position) => {
        setLocation({ location: position })
      })
      .catch(() => {
        setLocation({ location: null })
      })
  }
  useEffect(() => {
    updateLocation()
  }, [])
  useInterval(() => {
    updateLocation()
  }, delay)
  return _jsx(LocationContext.Provider, { value: location, children })
}
