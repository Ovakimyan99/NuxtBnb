<template>
  <div>
    <div v-for="home in HomesData" :key="home.objectID" style="float: left; margin: 10px">
      <nuxt-link :to="`/home/${home.objectID}`" prefetch>
        <HomeCard :home="home" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import homes from '~/data/homes'

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
      HomesData: homes.slice(0, 3)
    }
  }
}
</script>
