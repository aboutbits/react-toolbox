import React from 'react'
import { isFunction } from '../util'

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
  if (error != null && error != undefined) {
    return isFunction(renderError) ? renderError(error) : <>{renderError}</>
  } else if (data != null && data != undefined) {
    return isFunction(renderSuccess) ? (
      renderSuccess(data)
    ) : (
      <>{renderSuccess}</>
    )
  } else {
    return isFunction(renderLoading) ? renderLoading() : <>{renderLoading}</>
  }
}

export { AsyncView }
