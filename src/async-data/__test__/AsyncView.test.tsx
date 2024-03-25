import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { AsyncView } from '../AsyncView'

type Data = {
  greeting: string
}

type Error = {
  message: string
}

const Loading: React.FC = () => {
  return <>Loading</>
}

const Success: React.FC<{ data: Data }> = ({ data }) => {
  return <>{data.greeting}</>
}

const Error: React.FC<{ error: Error }> = ({ error }) => {
  return <>{error.message}</>
}

function renderAsyncView(data?: Data, error?: Error): RenderResult {
  return render(
    <AsyncView<Data, Error>
      data={data}
      error={error}
      renderLoading={<Loading />}
      renderSuccess={(data) => <Success data={data} />}
      renderError={(error) => <Error error={error} />}
    />,
  )
}

test('should render loading if asyncState is loading for the first time', function () {
  const { getByText } = renderAsyncView()
  expect(getByText(/loading/i)).toBeInTheDocument()
})

test('should render success if asyncState is successful', function () {
  const { getByText } = renderAsyncView({ greeting: 'Hello' })
  expect(getByText(/hello/i)).toBeInTheDocument()
})

test('should render error if asyncState is error', function () {
  const { getByText } = renderAsyncView(undefined, { message: 'Error' })
  expect(getByText(/error/i)).toBeInTheDocument()
})
