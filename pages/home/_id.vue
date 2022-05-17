<template>
  <div class="app-container">
    <PropertyGallery :images="home.images" />
    <PropertyDetails :home="home" />
    <PropertyDescription :home="home" />
    <PropertyMap :home="home" />
    <PropertyReviews :reviews="reviews" />
    <PropertyHost :user="user" />
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
  }
}
</script>
