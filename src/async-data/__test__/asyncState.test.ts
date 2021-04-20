import { AsyncState, getAsyncState } from '../asyncState'

test('given no data and no error, than it should return fetching state', function () {
  const result = getAsyncState(null, null)

  expect(result).toBe(AsyncState.FETCHING)
})

test('given data and no error, than it should return success state', function () {
  const data = { greeting: 'Hello World!' }
  const result = getAsyncState(data, null)

  expect(result).toBe(AsyncState.FINISHED_WITH_SUCCESS)
})

test('given no data, but an error, than it should return error state', function () {
  const result = getAsyncState(null, 'Error')

  expect(result).toBe(AsyncState.FINISHED_WITH_ERROR)
})

test('given data and an error, than it should return error state', function () {
  const result = getAsyncState('Some Data', 'Error')

  expect(result).toBe(AsyncState.FINISHED_WITH_ERROR)
})

test('given empty string as data, than it should return success state', function () {
  const result = getAsyncState('', null)

  expect(result).toBe(AsyncState.FINISHED_WITH_SUCCESS)
})
