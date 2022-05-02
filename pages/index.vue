<template>
  <div>
    <div v-for="home in HomeData" :key="home.objectID" style="float: left; margin: 10px">
      <LazyHomeCard :home="home" />
    </div>
  </div>
</template>

<script>
import HomeData from '~/data/homes'

export default {
  data() {
    return {
      HomeData: HomeData.slice(0, 3)
    }
  }
}
</script>
