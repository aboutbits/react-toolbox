# React Toolbox

[![npm package](https://badge.fury.io/js/%40aboutbits%2Freact-toolbox.svg)](https://badge.fury.io/js/%40aboutbits%2Freact-toolbox)
[![license](https://img.shields.io/github/license/aboutbits/react-toolbox)](https://github.com/aboutbits/react-toolbox/blob/main/license.md)

This package includes different tools that support you with common tasks.

## Table of content

- [Usage](#usage)
  - [useInterval](#useinterval)
  - [Async Data](#async-data)
  - [LocationProvider](#locationprovider)
  - [useMatchMediaQuery](#usematchmediaquery)
  - [useDebounce](#usedebounce)
  - [useIsMounted](#useismounted)
- [Build & Publish](#build--publish)
- [Information](#information)

## Usage

First, you have to install the package:

```bash
npm install @aboutbits/react-toolbox
```

Second, you can make use of the different tools.

### useInterval

The `useInterval` hook calls a function at specified intervals. The code of this hook is taken from [Dan Abramov's blog post](https://overreacted.io/making-setinterval-declarative-with-react-hooks/).

The hook takes two parameters:

- `callback`: The callback function that should be executed.
- `delay`: The delay in milliseconds or null, if the interval should be paused.

```tsx
import React, { useState } from 'react'
import { useInterval } from '@aboutbits/react-toolbox'

const MyCommponent = () => {
  const [step, setStep] = useState(10)

  useInterval(
    () => {
      setStep(step - 1)
    },
    step === 0 ? null : 1000
  )

  return <p>Countdown: {step}</p>
}
```

### Async Data

This part includes a utility component, that can be used to render loading, success and error views based on async state.

```tsx
import React, { useEffect } from 'react'
import { AsyncView } from '@aboutbits/react-toolbox'

type Data = {
  greeting: string
}

type Error = {
  message: string
}

const MyCommponent = () => {
  const [data, setData] = useState<Data | undefined>()
  const [error, setError] = useState<Error | undefined>()

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => setData(response.json()))
      .catch((error) => setError(error))
  })

  return (
    <AsyncView
      data={data}
      error={error}
      renderLoading={<div>Loading</div>}
      renderSuccess={(data) => <div>{data.greeting}</div>}
      renderError={(error) => <div>{error.message}</div>}
    />
  )
}
```

And using SWR:

```tsx
import React, { useEffect } from 'react'
import { useSWR } from 'swr'
import { AsyncView } from '@aboutbits/react-toolbox'

type Data = {
  greeting: string
}

type Error = {
  message: string
}

const MyCommponent = () => {
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/todos/1')

  return (
    <AsyncView
      data={data}
      error={error}
      renderLoading={'Loading'}
      renderSuccess={'Success'}
      renderError={'Error'}
    />
  )
}
```

### LocationProvider

This part includes a React context that fetches the geolocation at a given interval.

```tsx
import { LocationProvider } from '@aboutbits/react-toolbox'

const MyApp = () => {
  return (
    <LocationProvider highAccuracy={true} delay={20000}>
      {children}
    </LocationProvider>
  )
}
```

The context provider takes two props:

- `highAccuracy`: defines if the location should be fetched with high accuracy. Read more on the [Geolocation API doc](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).
- `delay`: the delay in milliseconds between each fetch

```tsx
import { useContext } from 'react'
import { LocationContext } from '@aboutbits/react-toolbox'

const MyComponent = () => {
  const { location } = useContext(LocationContext)

  return location ? (
    <div>
      Your location is: {location.coords.latitude}, {location.coords.longitude}
    </div>
  ) : (
    <div>Unable to get your location</div>
  )
}
```

### useMatchMediaQuery

This hook is based on the `window.matchQuery` API and can be used to find out if a certain media query matches the current window.

```tsx
import { useMatchMediaQuery } from '@aboutbits/react-toolbox'

const TestComponent = () => {
  const matches = useMatchMediaQuery('(min-width : 500px)')
  if (matches) return <div>visible</div>
  return null
}
```

### useDebounce

Use this hook to prevent the component from re-rendering too many times. Useful to avoid making unnecessary API calls.

```tsx
export default function TestComponent() {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  // Fetch API (optional)
  useEffect(() => {
    // Do fetch here...
    // Triggers when "debouncedValue" changes
  }, [debouncedValue])

  return (
    <div>
      <p>Value real-time: {value}</p>
      <p>Debounced value: {debouncedValue}</p>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  )
}
```

### useIsMounted

In React, a component is deleted from memory once unmounted. Changing the state in an unmounted component will result in an error.
This is preferrably solved passing a cleanup function to [useEffect](https://react.dev/reference/react/useEffect#useeffect).
However, there are some cases like Promise or API calls where it's impossible to know if the component is still mounted at the resolve time.
This hook returns a function that can be used to verify at the resolve time whether the component is still mounted.

```tsx
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function Child() {
  const [data, setData] = useState('loading')
  const isMounted = useIsMounted()

  // simulate an api call and update state
  useEffect(() => {
    void delay(3000).then(() => {
      if (isMounted()) {
        setData('OK')
      }
    })
  }, [isMounted])

  return <p>{data}</p>
}

export default function TestComponent() {
  const [isVisible, setVisible] = useState<boolean>(false)

  const toggleVisibility = () => setVisible((state) => !state)

  return (
    <>
      <button onClick={toggleVisibility}>{isVisible ? 'Hide' : 'Show'}</button>

      {isVisible && <Child />}
    </>
  )
}
```

## Build & Publish

To publish the package commit all changes and push them to main. Then run one of the following commands locally:

```bash
npm version patch
npm version minor
npm version major
```

## Information

About Bits is a company based in South Tyrol, Italy. You can find more information about us on [our website](https://aboutbits.it).

### Support

For support, please contact [info@aboutbits.it](mailto:info@aboutbits.it).

### Credits

- [Martin Malfertheiner](https://github.com/mmalfertheiner)
- [Alex Lanz](https://github.com/alexlanz)
- [All Contributors](../../contributors)

### License

The MIT License (MIT). Please see the [license file](license.md) for more information.
