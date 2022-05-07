<template>
  <div>
    <img style="margin: auto; width: 500px;" src="https://cdnn1.img.crimea.ria.ru/img/07e5/01/05/1119123110_0:286:3132:2048_1920x0_80_0_0_a53254aa184601a4d034e77f3413576b.jpg" alt="">
    <br><br>
    {{ error.message }} {{ error.statusCode }}
  </div>
</template>

<script>
export default {
  name: 'error',
  head() {
    return {
      title: 'BIG PROBLEM, madarfacker'
    }
  },
  props: {
    error: {
      required: true,
      type: Object
    }
  }
}
</script>

<style scoped>

</style>