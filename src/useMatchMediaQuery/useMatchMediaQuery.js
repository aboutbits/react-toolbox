import { useState, useEffect } from 'react'
function useMatchMediaQuery(query) {
  if (typeof window !== 'object' || !window.matchMedia) return
  const [matches, setMatches] = useState(window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) setMatches(media.matches)
    const listener = () => setMatches(media.matches)
    if (media.addEventListener) {
      media.addEventListener('change', listener)
    }
    return () =>
      media.removeEventListener && media.removeEventListener('change', listener)
  }, [matches, query])
  return matches
}
export { useMatchMediaQuery }
