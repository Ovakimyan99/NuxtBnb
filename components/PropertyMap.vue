<template>
  <div>
    <div class="app-wrapper app-padded-vertical">
      <h2 class="app-subtitle">Location</h2>
      <p class="app-description">
        {{ home.location.address }}
        {{ home.location.city }}
        {{ home.location.state }}
        {{ home.location.country }}
      </p>
      <div ref="map" class="app-map"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PropertyMap",
  props: {
    home: {
      type: Object,
      required: true
    }
  },
  mounted() {
    const { lat, lng } = this.home._geoloc
    this.$maps.showMap(this.$refs.map, lat, lng)
  }
}
</script>
