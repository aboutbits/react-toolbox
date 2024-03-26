import { useEffect, useState } from 'react'
export function useDebounce(data, interval) {
  const [liveData, setLiveData] = useState(data)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handler = window.setTimeout(() => {
        setLiveData(data)
      }, interval)
      return () => {
        window.clearTimeout(handler)
      }
    }
    return undefined
  }, [data, interval])
  return liveData
}
