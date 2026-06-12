const getCurrentLocation = (
  highAccuracy = false,
): Promise<GeolocationPosition> => {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    const successCallback = (position: GeolocationPosition): void => {
      resolve(position)
    }

    const errorCallback = (error: GeolocationPositionError) => {
      reject(new Error(error.message))
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        enableHighAccuracy: highAccuracy,
      })
    } else {
      reject(new Error('Geolocation not supported'))
    }
  })
}

export { getCurrentLocation }
