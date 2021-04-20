import { useEffect, useRef } from 'react'

type Callback = () => unknown | void
type Delay = number | null

const useInterval = (callback: Callback, delay: Delay): void => {
  const savedCallback = useRef<Callback | null>(null)

  useEffect(() => {
    if (delay === null) return
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay === null) return

    const tick = (): void => {
      if (savedCallback.current !== null) {
        savedCallback.current()
      }
    }
    const id = setInterval(tick, delay)
    return (): void => clearInterval(id)
  }, [delay])
}

export { useInterval }
