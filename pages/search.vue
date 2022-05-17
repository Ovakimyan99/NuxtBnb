<template>
  <div class="app-search-results-page">
    <div class="app-search-results">
      <div class="app-search-results-listing">
        <h2 class="app-title">Status in {{ label }}</h2>
        <nuxt-link
          v-for="home in homes"
          :key="home.objectID"
          :to="`/home/${home.objectID}`"
        >
          <HomeRow
            :home="home"
            @mouseover.native="highlightMarker(home.objectID, true)"
            @mouseout.native="highlightMarker(home.objectID, false)"
            class="app-house"
          />
        </nuxt-link>
      </div>
      <div class="app-search-results-map">
        <div class="app-map" ref="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  head() {
    return {
      title: `Homes around ${label.data}`
    }
  },
  mounted() {
    this.updateMap()
  },
  methods: {
    highlightMarker(homeId, isHightlighted) {
      document.getElementsByClassName(`home-${homeId}`)[0]?.classList?.toggle('marker-highlight', isHightlighted)
    },
    updateMap() {
      this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers())
    },
    getHomeMarkers() {
      if (this.home.length === 0) return null
      return this.homes.map((home) => {
        return {
          ...home._geoloc,
          pricePerNight: home.pricePerNight,
          id: home.objectID
        }
      })
    }
  },
  async beforeRouteUpdate(to, from, next) {
    const data = await $dataApi.getHomeByLocation(to.query.lat, to.query.lng)

    this.homes = data.json.hits
    this.label = to.query.label
    this.lat = to.query.lat
    this.lng = to.query.lng
    this.updateMap()
    next()
  },
  async asyncData({ query, $dataApi }) {
    const data = await $dataApi.getHomeByLocation(query.lat, query.lng)

    return {
      homes: data.json.hits,
      label: query.label,
      lat: query.lat,
      lng: query.lng
    }
  }
}
</script>

<style>
.marker {
  background-color: white;
  border: 1px solid lightgray;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  font-size: 19px;
}

.marker-highlight {
  color: white !important;
  background-color: black;
  border-color: black;
}
</style>