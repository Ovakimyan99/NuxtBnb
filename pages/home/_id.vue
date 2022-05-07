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
      <short-text :target="60" :text="comment" />
      {{ formatDate(date) }}<br><br>
    </div>
    <hr>

    <div>
      <img :src="user.image" :alt="user.name"><br>
      joined: {{ formatDate(user.joined) }}<br>
      <b>review Count: </b>{{ user.reviewCount }}<br>
      <b>description: </b>{{ user.description }}
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
  async asyncData({ params, $dataApi }) {
    let response = Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeId(params.id),
      $dataApi.getUsersByHomeId(params.id)
    ])
      .catch(error => {
        error({ statusCode: error.status, message: error.statusText })
      })

    response = await response

    return {
      home: response[0].json,
      reviews: response[1].json.hits,
      user: response[2].json.hits[0]
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    }
  },
  mounted() {
    const { lat, lng } = this.home._geoloc
    this.$maps.showMap(this.$refs.map, lat, lng)
  }
}
</script>
