<template>
  <div>
    <h1>{{ image.title }}</h1>
    <img :src="image.url" :alt="image.title" />
  </div>
</template>

<script>
export default {
  name: 'Picture',
  data() {
    return {
      image: {
        id: 1,
        title: 'Image 1',
        url: 'https://picsum.photos/200/300'
      }
    }
  }
}
</script>

<style>
img {
  width: 100%;
  height: 100vh;
  object-fit: contain;
}
</style>