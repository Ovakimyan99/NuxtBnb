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
export default {
  head() {
    return {
      title: this.home.title
    }
  },
  async asyncData({ params, $dataApi, error }) {
    const response = await $dataApi.getHome(params.id)
    if (!response.ok) error({ statusCode: response.status, message: response.statusText })
    return {
      home: response.json
    }
  },
  mounted() {
    const { lat, lng } = this.home._geoloc
    this.$maps.showMap(this.$refs.map, lat, lng)
  }
}
</script>
