<template>
  <div class="app-section">
    <div class="app-wrapper">
      <div class="app-masonry">
        <div
          :style="`background-image: url(${image})`"
          v-for="image in images"
          :key="image"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PropertyGallery",
  props: {
    images: {
      type: Array,
      required: true
    }
  }
}
</script>
