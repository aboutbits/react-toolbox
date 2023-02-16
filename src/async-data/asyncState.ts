/**
 * @deprecated Consider directly checking data and error values instead.
 * Using `AsyncState` leads to unnecessary complexity and may disable type
 * inference.
 */
enum AsyncState {
  FETCHING,
  FINISHED_WITH_ERROR,
  FINISHED_WITH_SUCCESS,
}

/**
 * @deprecated Consider directly checking data and error values instead.
 * Using `AsyncState` leads to unnecessary complexity and may disable type
 * inference.
 */
const getAsyncState = (data: unknown, error: unknown): AsyncState => {
  if (error != null && error != undefined) {
    return AsyncState.FINISHED_WITH_ERROR
  } else if (data != null && data != undefined) {
    return AsyncState.FINISHED_WITH_SUCCESS
  } else {
    return AsyncState.FETCHING
  }
}

export { AsyncState, getAsyncState }
