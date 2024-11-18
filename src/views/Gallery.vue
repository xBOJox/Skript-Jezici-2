<template>
  <div class="gallery-page">
    <div class="gallery">
      <div
        v-for="picture in pictures"
        :key="picture.picture_id"
        class="gallery-item"
      >
        <div class="picture-name">{{ picture.name }}</div>
        <div
          class="picture-preview"
          :style="{ backgroundImage: 'url(' + picture.thumbnail_url + ')' }"
        ></div>
      </div>
    </div>

    <div class="pagination">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage <= 1"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage >= totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { loadDrawings } from '@/api/api'; // Assuming you have this function set up to call your API

export default {
  data() {
    return {
      pictures: [], // Store the pictures
      currentPage: 1, // Start on the first page
      totalPages: 1, // Total pages based on the total number of pictures
      picturesPerPage: 10, // Default number of pictures per page
    };
  },
  created() {
    this.fetchPictures(); // Fetch the pictures when the component is created
  },
  methods: {
    async fetchPictures() {
      try {
        const response = await loadDrawings({
          limit: this.picturesPerPage,
          page: this.currentPage,
          older_first: false, // Set sorting order
        });

        // Assuming response has the structure: { pictures: [], total: number }
        this.pictures = response.data.pictures;
        this.totalPages = Math.ceil(response.data.total / this.picturesPerPage); // Calculate total pages
      } catch (error) {
        console.error('Error loading pictures:', error);
      }
    },
    changePage(newPage) {
      if (newPage > 0 && newPage <= this.totalPages) {
        this.currentPage = newPage;
        this.fetchPictures(); // Re-fetch the pictures for the new page
      }
    },
  },
};
</script>

<style scoped>
.gallery-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.gallery-item {
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  position: relative;
}

.picture-name {
  padding: 5px;
  font-weight: bold;
  text-align: center;
}

.picture-preview {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.pagination {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
}
</style>
