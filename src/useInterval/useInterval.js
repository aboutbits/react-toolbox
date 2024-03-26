import { useEffect, useRef } from 'react'
const useInterval = (callback, delay) => {
  const savedCallback = useRef(null)
  useEffect(() => {
    if (delay === null) return
    savedCallback.current = callback
  })
  useEffect(() => {
    if (delay === null) return
    const tick = () => {
      if (savedCallback.current !== null) {
        savedCallback.current()
      }
    }
    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}
export { useInterval }
