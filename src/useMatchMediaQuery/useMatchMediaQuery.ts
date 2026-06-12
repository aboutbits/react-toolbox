import { useEffect, useState } from 'react'

function useMatchMediaQuery(query: string): boolean | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (typeof window !== 'object' || !window.matchMedia) {
    return
  }

  const [matches, setMatches] = useState(window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)

    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => {
      setMatches(media.matches)
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (media.addEventListener) {
      media.addEventListener('change', listener)
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      media.removeEventListener?.('change', listener)
    }
  }, [matches, query])

  return matches
}

export { useMatchMediaQuery }
