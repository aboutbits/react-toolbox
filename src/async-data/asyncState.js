/**
 * @deprecated Consider directly checking data and error values instead.
 * Using `AsyncState` leads to unnecessary complexity and may disable type
 * inference.
 */
var AsyncState
;(function (AsyncState) {
  AsyncState[(AsyncState['FETCHING'] = 0)] = 'FETCHING'
  AsyncState[(AsyncState['FINISHED_WITH_ERROR'] = 1)] = 'FINISHED_WITH_ERROR'
  AsyncState[(AsyncState['FINISHED_WITH_SUCCESS'] = 2)] =
    'FINISHED_WITH_SUCCESS'
})(AsyncState || (AsyncState = {}))
/**
 * @deprecated Consider directly checking data and error values instead.
 * Using `AsyncState` leads to unnecessary complexity and may disable type
 * inference.
 */
const getAsyncState = (data, error) => {
  if (error != null && error != undefined) {
    return AsyncState.FINISHED_WITH_ERROR
  } else if (data != null && data != undefined) {
    return AsyncState.FINISHED_WITH_SUCCESS
  } else {
    return AsyncState.FETCHING
  }
}
export { AsyncState, getAsyncState }
