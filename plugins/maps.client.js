export default function (context, inject) {
  let isLoaded = false
  let waiting = []
  addScript()

  inject('maps', {
    showMap,
    makeAutoComplete
  })

  function addScript() {
    const script = document.createElement('script')
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places&callback=initMap'
    script.async = true
    window.initMap = initGoogleMaps
    document.head.appendChild(script)
  }

  function initGoogleMaps() {
    isLoaded = true
    waiting.forEach((item) => {
      if (typeof item.fn === 'function') {
        item.fn(...item.arguments)
      }
    })

    waiting = []
  }

  function makeAutoComplete(input) {
    if (!isLoaded) {
      waiting.push({
        fn: makeAutoComplete,
        arguments
      })
      return
    }

    const autoComplete = new window.google.maps.places.Autocomplete(input, { type: ['(cities)'] });
    autoComplete.addListener('place_chenged', () => {
      const place = autoComplete.getPlace()
      input.dispatchEvent(new CustomEvent('changed', { detail: place }))
    })
  }

  function showMap(canvas, lat, lng, markers) {
    if (!isLoaded) {
      waiting.push({
        fn: showMap,
        arguments
      })
      return
    }

    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true,
      styles: [{
        featuresType: 'poi.business',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      }]
    }

    const map = new window.google.maps.Map(canvas, mapOptions)

    if(!markers) {
      const position = new window.google.maps.LatLng(lat, lng)
      const marker = new window.google.maps.Marker({
        position,
        clickable: false
      })
      marker.setMap(map)
      return
    }

    const bounds = new window.googlemaps.LatLngBounds()
    markers.forEach((home) => {
      const position = new window.google.maps.LatLng(home.lat, home.lng)
      new window.google.maps.Marker({
        position,
        label: {
          text: `$${home.pricePerNight}`,
          className: `marker home-${home.id}`
        },
        icon: 'https://maps.gstatic.com/mapfiles/transparent.png',
        clickable: false
      })
      bounds.extend(position)
    })

    map.fitBounds(bounds)
  }
}
