React Toolbox
=============

This package includes different tools that support you with common tasks.

## Table of content

- [Usage](#usage)
- [Build & Publish](#build--publish)
  - [useInterval](#useinterval)
- [Information](#information)

## Usage

First, you have to install the package:

```bash
npm install @aboutbits/react-tooling
```

Second, you can make use of the different tools.

### useInterval

The `useInterval` hook calls a function at specified intervals. The code of this hook is taken from [Dan Abramov's blog post](https://overreacted.io/making-setinterval-declarative-with-react-hooks/).

The hook takes two parameters:

- `callback`: The callback function that should be executed.
- `delay`: The delay in milliseconds or null, if the interval should be paused.

```jsx
import React, { useState } from 'react'
import { useInterval } from '@aboutbits/react-tooling'

const MyCommponent = () => {
  const [step, setStep] = useState(0)
  
  useInterval(() => {
    setStep(step + 1)
  }, step < 10 ? 1000 : null)

  return <p>{step}</p>
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

- [Alex Lanz](https://github.com/alexlanz)
- [All Contributors](../../contributors)

### License

The MIT License (MIT). Please see the [license file](license.md) for more information.
