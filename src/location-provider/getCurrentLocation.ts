const getCurrentLocation = (
  highAccuracy = false,
): Promise<GeolocationPosition> => {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    const successCallback = (position: GeolocationPosition): void => {
      resolve(position)
    }

    const errorCallback = (error: GeolocationPositionError) => {
      reject(error.message)
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        enableHighAccuracy: highAccuracy,
      })
    } else {
      reject('Geolocation not supported')
    }
  })
}

export { getCurrentLocation }
