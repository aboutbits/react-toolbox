const getCurrentLocation = (highAccuracy = false): Promise<Position> => {
  return new Promise<Position>((resolve, reject) => {
    const successCallback = (position: Position): void => {
      resolve(position)
    }

    const errorCallback = (error: PositionError) => {
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
