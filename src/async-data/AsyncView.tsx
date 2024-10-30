import React, { ReactElement, ReactNode } from 'react'
import { isFunction } from '../util'

type LoadingFunction = () => ReactNode
type SuccessFunction<Data> = (data: Data) => ReactNode
type ErrorFunction<Error> = (error: NonNullable<Error>) => ReactNode

type Props<Data, Error> = {
  data?: Data
  error?: Error
  isLoading: boolean
  renderLoading?: ReactNode | LoadingFunction
  renderError?: ReactNode | ErrorFunction<Error>
} & (
  | {
      allowMissingData: true
      renderSuccess: ReactNode | SuccessFunction<Data>
    }
  | {
      allowMissingData?: false
      renderSuccess: ReactNode | SuccessFunction<NonNullable<Data>>
    }
)

const AsyncView = <Data, Error>(
  props: Props<Data, Error>,
  // The `ReactElement<any, any> | null` type is for React 17 compatibility (see type FunctionComponent). With React 18 it can be a ReactNode and we can remove the Fragment wrappers.
): ReactElement<any, any> | null => {
  const {
    data,
    error,
    isLoading,
    renderLoading = null,
    renderSuccess,
    renderError = null,
    allowMissingData = false,
  } = props

  if (isLoading) {
    return <>{isFunction(renderLoading) ? renderLoading() : renderLoading}</>
  }

  if (error !== null && error !== undefined) {
    return <>{isFunction(renderError) ? renderError(error) : renderError}</>
  }

  if ((data === undefined || data === null) && !allowMissingData) {
    throw new Error(
      'Data passed into AsyncView was null or undefined. Use allowMissingData=true if this is intended.',
    )
  }

  return (
    <>
      {isFunction(renderSuccess)
        ? renderSuccess(data as NonNullable<Data>)
        : renderSuccess}
    </>
  )
}

export { AsyncView }
