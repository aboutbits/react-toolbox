import { useState, useEffect } from 'react'

export default function (query: string): boolean | undefined {
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
