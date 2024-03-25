import React from 'react'
import isMatching from 'css-mediaquery'
import { render, RenderResult } from '@testing-library/react'
import { useMatchMediaQuery } from '../useMatchMediaQuery'

beforeEach(() => {
  // mock window.matchMedia (use 'css-mediaquery')
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      addListener: jest.fn(),
      media: query,
      matches: isMatching.match(query, {
        width: 500,
      }),
    }
  })
})

const TestComponent = ({ query }: { query: string }) => {
  const isMatched = useMatchMediaQuery(query)
  if (isMatched) return <div>visible</div>
  return <div>hidden</div>
}

function renderTestComponent(query: string): RenderResult {
  return render(<TestComponent query={query} />)
}

describe('useReactSimpleMatchMedia', () => {
  it('should be visible when min width matches', () => {
    const { getByText } = renderTestComponent('(min-width : 500px)')
    expect(getByText(/visible/i)).toBeInTheDocument()
  })

  it('should not be visible min does not match', () => {
    const { getByText } = renderTestComponent('(min-width : 600px)')
    expect(getByText(/hidden/i)).toBeInTheDocument()
  })

  it('should be visible if between matches', () => {
    const { getByText } = renderTestComponent(
      '(min-width : 500px) and (max-width: 600px)',
    )
    expect(getByText(/visible/i)).toBeInTheDocument()
  })
})
