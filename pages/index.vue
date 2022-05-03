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
  head() {
    return {
      title: 'Homepage',
      meta: [
        {
          description: 'This a homepage!'
        }
      ]
    }
  },
  data() {
    return {
      HomeData: HomeData.slice(0, 3)
    }
  }
}
</script>
