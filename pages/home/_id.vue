<template>
  <div>
    <h1>{{ home.title }}</h1>
    <div style="display: flex">
      <img width="200" height="150" v-for="src in home.images" :src="src" :key="src" :alt="src">
    </div>
    <img src="" alt="">
    {{ home.location.address }} address; {{ home.location.city }} city;
    {{ home.location.country }} country; {{ home.location.state }} state<br/>
    {{ home.reviewValue }} review value<br/>
    {{ home.bathrooms }} bathrooms; {{ home.bedrooms }} bedrooms; {{ home.beds }} beds;<br/>

    <div style="width: 100%; height: 300px" ref="map"></div>

    <div v-for="{ objectID, reviewer, date, comment } in reviews" :key="objectID">
      <img
        :src="reviewer.image"
        :alt="reviewer.name"
      ><br>
      {{ reviewer.name }}<br>
      {{ comment }}<br>
      {{ date }}<br>
    </div>
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
    const homeResponse = await $dataApi.getHome(params.id)
    if (!homeResponse.ok) error({ statusCode: homeResponse.status, message: homeResponse.statusText })

    const reviewResponse = await $dataApi.getReviewsByHomeId(params.id)
    if (!reviewResponse.ok) error({ statusCode: reviewResponse.status, message: reviewResponse.statusText })

    return {
      home: homeResponse.json,
      reviews: reviewResponse.json.hits
    }
  },
  mounted() {
    const { lat, lng } = this.home._geoloc
    this.$maps.showMap(this.$refs.map, lat, lng)
  }
}
</script>
