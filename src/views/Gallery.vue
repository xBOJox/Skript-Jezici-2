<template>
  <div>
    <h1>Gallery</h1>
    <div class="gallery">
      <div v-for="image in images" :key="image.id" class="image">
        <img :src="image.url" :alt="image.title" />
        <h2>{{ image.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      images: [
        { id: 1, title: 'Image 1', url: 'https://picsum.photos/200/300' },
        { id: 2, title: 'Image 2', url: 'https://picsum.photos/200/301' },
        { id: 3, title: 'Image 3', url: 'https://picsum.photos/200/302' },
        // Add more images here...
      ]
    }
  }
}
</script>

<style>
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.image {
  margin: 20px;
  width: 200px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image h2 {
  padding: 10px;
  font-weight: bold;
}
</style>