import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { AsyncView } from '../AsyncView'

type Data = {
  greeting: string
} | null

type Error = {
  message: string
}

const Loading: React.FC = () => {
  return <>Loading</>
}

const Success: React.FC<{ data: Data }> = ({ data }) => {
  return <>{data?.greeting}</>
}

const Error: React.FC<{ error: Error }> = ({ error }) => {
  return <>{error.message}</>
}

type RenderAsyncViewProps = {
  isLoading: boolean
  error?: Error
  data?: Data
  allowMissingData?: boolean
}

function renderAsyncView({
  isLoading,
  data,
  error,
  allowMissingData = false,
}: RenderAsyncViewProps): RenderResult {
  return render(
    <AsyncView
      isLoading={isLoading}
      data={data}
      error={error}
      allowMissingData={allowMissingData}
      renderLoading={<Loading />}
      renderSuccess={(data: unknown) => <Success data={data as Data} />}
      renderError={(error) => <Error error={error} />}
    />,
  )
}

test('should render loading if asyncState is loading for the first time', function () {
  const { getByText } = renderAsyncView({ isLoading: true })
  expect(getByText(/loading/i)).toBeInTheDocument()
})

test('should render success if asyncState is successful', function () {
  const { getByText } = renderAsyncView({
    isLoading: false,
    data: { greeting: 'Hello' },
  })
  expect(getByText(/hello/i)).toBeInTheDocument()
})

test.each([null, undefined])(
  'should throw asyncState is successful but data is missing',
  function (value) {
    expect(renderAsyncView({ isLoading: false, data: value })).toThrow()
  },
)

test.each([null, undefined])(
  'should render success if asyncState is successful but data is missing but allowed',
  function (value) {
    expect(
      renderAsyncView({
        isLoading: false,
        data: value,
        allowMissingData: true,
      }),
    ).not.toThrow()
  },
)

test('should render error if asyncState is error', function () {
  const { getByText } = renderAsyncView({
    isLoading: false,
    error: { message: 'Error' },
  })
  expect(getByText(/error/i)).toBeInTheDocument()
})
