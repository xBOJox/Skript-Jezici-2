<template>
  <div class="pixel-drawing-app">
    <div class="tools">
      <input 
        type="color" 
        v-model="currentColor" 
        class="color-picker"
      >
      <button @click="togglePencilMode" :class="{ active: isPencilActive }">
        ✏️ Pencil
      </button>
      <button @click="toggleEraserMode" :class="{ active: isEraserActive }">
        🩹 Eraser
      </button>
      <div>
        <label>
          Canvas Size:
          <input
            type="number"
            v-model="canvasSize"
            @change="resizeCanvas"
            min="1"
            max="16"
          />
        </label>
      </div>
    </div>
    
    <div class="canvas">
      <div 
        v-for="(row, rowIndex) in canvas" 
        :key="rowIndex" 
        class="canvas-row"
      >
        <div 
          v-for="(pixel, colIndex) in row" 
          :key="colIndex" 
          class="pixel"
          :style="{ backgroundColor: pixel }"
          @mousedown="startDrawing"
          @mousemove="draw"
          @mouseup="stopDrawing"
          @mouseleave="stopDrawing"
        ></div>
      </div>
    </div>
    <div>
      <!-- Save Button -->
      <button @click="saveCurrentDrawing">Save Drawing</button>
      <input
        v-model="drawingName"
        placeholder="Enter drawing name"
        type="text"
      />

      <!-- Load Drawings -->
      <button @click="fetchDrawings">Load Drawings</button>
      <ul>
        <li v-for="drawing in drawings" :key="drawing.id">
          <button @click="loadDrawing(drawing)">{{ drawing.name }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { saveDrawing, loadDrawings } from '@/api/api';
import { useAuthStore } from '@/store/auth';

export default {
  data() {
    return {
      canvas: Array.from({ length: 16 }, () => 
        Array.from({ length: 16 }, () => '#FFFFFF')
      ),
      currentColor: '#000000',
      canvasSize: 16,
      isDrawing: false,
      isPencilActive: true,
      isEraserActive: false,
      drawingName: '', // For saving drawings
      drawings: [], // For listing loaded drawings
    }
  },
  methods: {
    togglePencilMode() {
      this.isPencilActive = !this.isPencilActive;
    },
    startDrawing(event) {
      if (!this.isPencilActive) return;
      this.isDrawing = true;
      this.colorPixel(event);
    },
    draw(event) {
      if (!this.isDrawing) return;
      this.colorPixel(event);
    },
    stopDrawing() {
      this.isDrawing = false;
    },
    toggleEraserMode() {
      this.isEraserActive = !this.isEraserActive;
    },
    colorPixel(event) {
      const pixel = event.target;
      const rowIndex = Array.from(pixel.parentNode.children).indexOf(pixel);
      const colIndex = Array.from(pixel.parentNode.parentNode.children).indexOf(pixel.parentNode);

      this.canvas[colIndex][rowIndex] = this.isEraserActive
        ? "#FFFFFF"
        : this.currentColor;
    },

    resizeCanvas() {
      const newCanvas = Array.from({ length: this.canvasSize }, (_, i) =>
        Array.from({ length: this.canvasSize }, (_, j) =>
          this.canvas[i] && this.canvas[i][j] ? this.canvas[i][j] : "#FFFFFF"
        )
      );
      this.canvas = newCanvas;
    },
    async saveCurrentDrawing() {
      if (!this.drawingName) {
        alert('Please enter a name for the drawing.');
        return;
      }

      // Validate canvas size and content
      if (
        !Array.isArray(this.canvas) ||
        this.canvas.length < 1 ||
        this.canvas.length > 16 ||
        !this.canvas.every(
          (row) =>
            Array.isArray(row) &&
            row.length === this.canvas.length &&
            row.every((color) => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color))
        )
      ) {
        alert('Invalid canvas data. Ensure it is a square matrix with valid colors.');
        return;
      }

      try {
        const authStore = useAuthStore(); // Access the auth store
        const token = authStore.token; // Retrieve the user's token

        // Prepare the data
        const data = {
          name: this.drawingName,
          picture_data: this.canvas,
        };

        // Call the API
        await saveDrawing({
          data,
          token, // Pass the token
        });

        alert('Drawing saved successfully!');
      } catch (error) {
        console.error('Error saving drawing:', error);

        // Handle specific server errors
        if (error.response?.data?.code === 'BAD_PICTURE_DATA') {
          alert('The drawing data is invalid.');
        } else if (error.response?.data?.code === 'INVALID_DATA') {
          alert('The name or drawing data is incorrect.');
        } else {
          alert('Failed to save the drawing.');
        }
      }
    },

    async fetchDrawings() {
      try {
        const authStore = useAuthStore(); // Access the auth store
        const token = authStore.token; // Retrieve the user's token

        const response = await loadDrawings({ token }); // Fetch drawings with the token
        this.drawings = response.data; // Populate the list of drawings
      } catch (error) {
        console.error('Error loading drawings:', error);
        alert('Failed to load drawings.');
      }
    },
    loadDrawing(drawing) {
      this.canvas = drawing.canvas; // Load the selected drawing into the canvas
      this.canvasSize = drawing.canvas.length; // Adjust the canvas size
    },
  }
}
</script>

<style scoped>
.pixel-drawing-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.tools {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.canvas {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
}

.canvas-row {
  display: flex;
}

.pixel {
  width: 20px;
  height: 20px;
  border: 1px solid #eee;
  cursor: pointer;
}

.color-picker {
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
}

button {
  padding: 5px 10px;
}

button.active {
  background-color: #e0e0e0;
}
</style>