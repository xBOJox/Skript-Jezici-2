<template>
  <div>
    <h1>Drawing Page</h1>
    <div>
      <canvas id="drawing-canvas" width="800" height="600"></canvas>
    </div>
    <div class="options">
      <input type="color" v-model="color" />
      <button @click="clearCanvas">Clear</button>
      <button @click="saveCanvas">Save</button>
      <button @click="undo">Undo</button>
      <button @click="redo">Redo</button>
      <input type="range" v-model="brushSize" min="1" max="100" />
      <label>Brush Size: {{ brushSize }}</label>
      <select v-model="brushShape">
        <option value="round">Round</option>
        <option value="square">Square</option>
      </select>
      <label>Brush Shape: {{ brushShape }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Draw',
  data() {
    return {
      color: '#000000',
      brushSize: 5,
      brushShape: 'round',
      canvasHistory: [],
      currentCanvasIndex: -1
    }
  },
  mounted() {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');

    let drawing = false;
    let lastX, lastY;

    canvas.addEventListener('mousedown', (e) => {
      drawing = true;
      lastX = e.offsetX;
      lastY = e.offsetY;
    });

    canvas.addEventListener('mousemove', (e) => {
      if (drawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.brushSize;
        ctx.lineCap = this.brushShape;
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
      }
    });

    canvas.addEventListener('mouseup', () => {
      drawing = false;
      this.canvasHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      this.currentCanvasIndex++;
    });
  },
  methods: {
    clearCanvas() {
      const canvas = document.getElementById('drawing-canvas');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.canvasHistory = [];
      this.currentCanvasIndex = -1;
    },
    saveCanvas() {
      const canvas = document.getElementById('drawing-canvas');
      const dataURL = canvas.toDataURL();
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'drawing.png';
      link.click();
    },
    undo() {
      if (this.currentCanvasIndex > 0) {
        this.currentCanvasIndex--;
        const canvas = document.getElementById('drawing-canvas');
        const ctx = canvas.getContext('2d');
        ctx.putImageData(this.canvasHistory[this.currentCanvasIndex], 0, 0);
      }
    },
    redo() {
      if (this.currentCanvasIndex < this.canvasHistory.length - 1) {
        this.currentCanvasIndex++;
        const canvas = document.getElementById('drawing-canvas');
        const ctx = canvas.getContext('2d');
        ctx.putImageData(this.canvasHistory[this.currentCanvasIndex], 0, 0);
      }
    }
  }
}
</script>

<style>
.options {
  margin-top: 20px;
}

button {
  margin-right: 10px;
}

input[type="range"] {
  margin-right: 10px;
}

select {
  margin-right: 10px;
}

label {
  margin-right: 10px;
}
</style>