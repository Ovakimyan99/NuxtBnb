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

  </div>
</template>

<script>
import homes from '/data/homes.json'

export default {
  head() {
    return {
      title: this.home.title
    }
  },
  data() {
    return {
      home: {}
    }
  },
  created() {
    this.home = homes.find(home => home.objectID === this.$route.params.id)
  }
}
</script>