const getCurrentLocation = (highAccuracy = false) => {
  return new Promise((resolve, reject) => {
    const successCallback = (position) => {
      resolve(position)
    }
    const errorCallback = (error) => {
      reject(new Error(error.message))
    }
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
