<template>
  <div>
    <div class="app-host-header" :style="`background-image: url(${home.images[0]})`"></div>
    <div class="app-house-body">
      <img src="@/images/icons/heart.svg" class="app-fav">
      <h2>{{ home.title }}</h2>
      <div class="app-address">
        {{ home.location.address }} {{ home.location.city }} {{ home.location.state }}<br>
      </div>
      <div class="app-amenities">
        <p>
        {{ pluralize(home.guests, 'guest') }}, {{ pluralize(home.debdrooms, 'room') }}, {{ pluralize(home.beds, 'bed') }}, {{ pluralize(home.bathrooms, 'bath') }}<br>
        </p>
        <p>{{ features }}</p>
      </div>
      <div class="app-flex">
        <div class="app-rating">
          {{ home.reviewValue }}
          <span>({{ home.reviewCount }})</span>
        </div>
        <div class="app-price">${{ home.pricePerNight }} / night</div>
      </div>
    </div>
  </div>
</template>

<script>
import pluralize from "@/utils/pluralize";

export default {
  name: 'HomeRow',
  props: {
    home: {
      requrid: true,
      type: Object
    }
  },
  computed: {
    features() {
      return this.home.features.slice(0, 3).join(', ')
    }
  },
  methods: {
    pluralize
  }
}
</script>
