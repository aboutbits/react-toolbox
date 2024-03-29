import { cleanup, renderHook } from '@testing-library/react'
import { useInterval } from '../useInterval'

afterEach(cleanup)
jest.useFakeTimers()

test('it should execute the callback after every interval', function () {
  const handler = jest.fn()

  renderHook(() => {
    useInterval(handler, 100)
  })

  expect(handler).toHaveBeenCalledTimes(0)
  jest.advanceTimersByTime(500)
  expect(handler).toHaveBeenCalledTimes(5)
})

test('if you pass a `delay` of `null`, the timer is "paused"', () => {
  const handler = jest.fn()

  renderHook(() => {
    useInterval(handler, null)
  })

  jest.advanceTimersByTime(5000)
  expect(handler).toHaveBeenCalledTimes(0)
})

test('if you pass a new `handler`, the timer will not restart', () => {
  const handler1 = jest.fn()
  const handler2 = jest.fn()
  let handler = handler1

  const { rerender } = renderHook(() => {
    useInterval(handler, 1000)
  })

  jest.advanceTimersByTime(500)

  handler = handler2
  rerender()

  jest.advanceTimersByTime(500)
  expect(handler1).toHaveBeenCalledTimes(0)
  expect(handler2).toHaveBeenCalledTimes(1)
})

test('if you pass a new `delay`, it will cancel the current timer and start a new one', () => {
  const handler = jest.fn()
  let delay = 500

  const { rerender } = renderHook(() => {
    useInterval(handler, delay)
  })

  jest.advanceTimersByTime(1000)
  expect(handler).toHaveBeenCalledTimes(2)

  delay = 1000
  rerender()
  jest.advanceTimersByTime(5000)
  expect(handler).toHaveBeenCalledTimes(7)
})

test('if you pass a new `delay` of `null`, it will cancel the current timer and "pause"', () => {
  const handler = jest.fn()
  let delay: number | null = 500

  const { rerender } = renderHook(() => {
    useInterval(handler, delay)
  })

  jest.advanceTimersByTime(1000)
  expect(handler).toHaveBeenCalledTimes(2)

  delay = null
  rerender()
  jest.advanceTimersByTime(5000)
  expect(handler).toHaveBeenCalledTimes(2)
})

test('passing the same parameters causes no change in the timer', () => {
  const handler = jest.fn()

  const { rerender } = renderHook(() => {
    useInterval(handler, 1000)
  })

  jest.advanceTimersByTime(500)

  rerender()

  jest.advanceTimersByTime(500)
  expect(handler).toHaveBeenCalledTimes(1)
})
