import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useInterval } from '../index'
import { getCurrentLocation } from './getCurrentLocation'

export type LocationContextValue = {
  location: GeolocationPosition | null
}

export const LocationContext = createContext<LocationContextValue>({
  location: null,
})

export const LocationProvider: React.FC<{
  highAccuracy: boolean
  delay: number
  children?: React.ReactNode
}> = ({ highAccuracy, delay, children }) => {
  const [location, setLocation] = useState<LocationContextValue>({
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

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  )
}
