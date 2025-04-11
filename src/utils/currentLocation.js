export const obtainCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if("geolocation" in navigator) {
            // requesting the current position
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(position.coords)
            }, (e) => {reject("Error getting the current location " + e.message)})
        }else reject("Geolocation is not supported by this browser.")
    })
}