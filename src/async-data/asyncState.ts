enum AsyncState {
  FETCHING,
  FINISHED_WITH_ERROR,
  FINISHED_WITH_SUCCESS,
}

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
