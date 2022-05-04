<template>
  <div>
    <h1>{{ home.title }}</h1>
    <div style="display: flex">
      <img width="200" height="150" v-for="src in home.images" :src="src" :key="src">
    </div>
    <img src="" alt="">
    {{ home.location.address }} address; {{ home.location.city }} city;
    {{ home.location.country }} country; {{ home.location.state }} state<br/>
    {{ home.reviewValue }} review value<br/>
    {{ home.bathrooms }} bathrooms; {{ home.bedrooms }} bedrooms; {{ home.beds }} beds;<br/>

    <div style="width: 100%; height: 800px" ref="map"></div>
  </div>
</template>

<script>
import homes from '/data/homes.json'

export default {
  head() {
    return {
      title: this.home.title,
      script: [
        {
          src: 'https://maps.googleapis.com/maps/api/js?' +
            'key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg' +
            '&libraries=places&callback=initMap',
          hid: 'map',
          async: true,
          skip: process.client && window.mapLoaded
        },
        {
          innerHTML: "window.initMap = function(){ window.mapLoaded = true }",
          hid: 'map-init',
        }
      ]
    }
  },
  data() {
    return {
      home: {}
    }
  },
  methods: {
    showMap() {
      const { lat, lng } = this.home._geoloc
      const mapOptions = {
        zoom: 18,
        center: new window.google.maps.LatLng(lat, lng),
        disableDefaultUI: true,
        zoomControl: true
      }

      const map = new window.google.maps.Map(this.$refs.map, mapOptions)
      const position = new window.google.maps.LatLng(lat, lng)
      const marker = new window.google.maps.Marker({ position })
      marker.setMap(map)
    }
  },
  created() {
    this.home = homes.find(home => home.objectID === this.$route.params.id)
  },
  mounted() {
    const timerInterval = setInterval(() => {
      if (window.mapLoaded) {
        clearInterval(timerInterval)
        this.showMap()
      }
    }, 200)
  }
}
</script>