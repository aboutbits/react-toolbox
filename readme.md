React Toolbox
=============

[![npm package](https://badge.fury.io/js/%40aboutbits%2Freact-toolbox.svg)](https://badge.fury.io/js/%40aboutbits%2Freact-toolbox)
[![license](https://img.shields.io/github/license/aboutbits/react-toolbox)](https://github.com/aboutbits/react-toolbox/blob/main/license.md)

This package includes different tools that support you with common tasks.

## Table of content

- [Usage](#usage)
  - [useInterval](#useinterval)
  - [Async Data](#async-data)
  - [LocationProvider](#locationprovider)
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
  
  useInterval(() => {
    setStep(step - 1)
  }, step === 0 ? null : 1000)

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
            .then(response => setData(response.json()))
            .catch(error => setError(error))
    })

    return (
        <AsyncView
            data={data}
            error={error}
            renderLoading={<div>Loading</div>}
            renderSuccess={(data) => <div>{data.greeting}</div>}
            renderError={(error) => <div>{error.message}</div>} />
    );
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
            renderError={'Error'} />
    );
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
  
  return null
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
