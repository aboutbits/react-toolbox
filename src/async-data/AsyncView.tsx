import React, { ReactElement, ReactNode } from 'react'
import { isFunction } from '../util'

type LoadingFunction = () => ReactNode
type SuccessFunction<Data> = (data: NonNullable<Data>) => ReactNode
type ErrorFunction<Error> = (error: NonNullable<Error>) => ReactNode

type Props<Data, Error> = {
  data?: Data
  error?: Error
  renderLoading?: ReactNode | LoadingFunction
  renderSuccess: ReactNode | SuccessFunction<Data>
  renderError?: ReactNode | ErrorFunction<Error>
}

const AsyncView = <Data, Error>(
  props: Props<Data, Error>
  // The `ReactElement<any, any> | null` type is for React 17 compatibility (see type FunctionComponent). With React 18 it can be a ReactNode and we can remove the Fragment wrappers.
): ReactElement<any, any> | null => {
  const {
    data,
    error,
    renderLoading = null,
    renderSuccess,
    renderError = null,
  } = props
  if (error !== null && error !== undefined) {
    return <>{isFunction(renderError) ? renderError(error) : renderError}</>
  } else if (data !== null && data !== undefined) {
    return (
      <>{isFunction(renderSuccess) ? renderSuccess(data) : renderSuccess}</>
    )
  } else {
    return <>{isFunction(renderLoading) ? renderLoading() : renderLoading}</>
  }
}

export { AsyncView }
