import React from 'react'
import { isFunction } from '../util'
import { AsyncState } from '../index'
import { getAsyncState } from './asyncState'

type LoadingFunction = () => React.ReactElement<any, any> | null
type SuccessFunction<Data> = (data: Data) => React.ReactElement<any, any> | null
type ErrorFunction<Error> = (
  error: Error
) => React.ReactElement<any, any> | null

type Props<Data, Error> = {
  data?: Data
  error?: Error
  renderLoading?: React.ReactNode | LoadingFunction
  renderSuccess: React.ReactNode | SuccessFunction<Data>
  renderError?: React.ReactNode | ErrorFunction<Error>
}

const AsyncView = <Data, Error>(
  props: Props<Data, Error>
): React.ReactElement<any, any> | null => {
  const {
    data,
    error,
    renderLoading = null,
    renderSuccess,
    renderError = null,
  } = props
  const asyncState = getAsyncState(data, error)

  switch (asyncState) {
    case AsyncState.FETCHING:
      return isFunction(renderLoading) ? renderLoading() : <>{renderLoading}</>
    case AsyncState.FINISHED_WITH_SUCCESS:
      return isFunction(renderSuccess) ? (
        renderSuccess(data as Data)
      ) : (
        <>{renderSuccess}</>
      )
    case AsyncState.FINISHED_WITH_ERROR:
      return isFunction(renderError) ? (
        renderError(error as Error)
      ) : (
        <>{renderError}</>
      )
  }
}

export { AsyncView }
