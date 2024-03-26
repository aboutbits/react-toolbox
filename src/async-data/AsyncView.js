import { Fragment as _Fragment, jsx as _jsx } from 'react/jsx-runtime'
import { isFunction } from '../util'
const AsyncView = (props) => {
  const {
    data,
    error,
    renderLoading = null,
    renderSuccess,
    renderError = null,
  } = props
  if (error !== null && error !== undefined) {
    return _jsx(_Fragment, {
      children: isFunction(renderError) ? renderError(error) : renderError,
    })
  } else if (data !== null && data !== undefined) {
    return _jsx(_Fragment, {
      children: isFunction(renderSuccess) ? renderSuccess(data) : renderSuccess,
    })
  } else {
    return _jsx(_Fragment, {
      children: isFunction(renderLoading) ? renderLoading() : renderLoading,
    })
  }
}
export { AsyncView }
