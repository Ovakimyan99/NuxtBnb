<template>
  <div class="app">
    <header class="app-header">
      <div class="app-logo">
        <img src="@/images/logo.svg" alt="logo">
      </div>
      <div class="app-search">
        <input type="text" ref="citySearch" @change="changed" placeholder="Enter your address">
        <input type="text" class="datepicker" placeholder="Check in">
        <input type="text" class="datepicker" placeholder="Check out">
        <button>
          <img src="@/images/icons/search.svg" alt="search">
        </button>
      </div>
      <div class="app-user-menu">
        <img src="@/images/icons/house.svg" alt="house">
        <div class="name">Host</div>
        <img class="avatar" src="@/images/user.jpg" alt="avatar">
      </div>
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'default',
  mounted() {
    this.$maps.makeAutoComplete(this.$refs.citySearch)
  },
  methods: {
    changed(event) {
      const place = event.detail
      if (!place.geometry) return

      this.$router.push({
        name: 'search',
        query: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          label: this.$refs.citySearch.value
        }
      })
    }
  }
}
</script>
