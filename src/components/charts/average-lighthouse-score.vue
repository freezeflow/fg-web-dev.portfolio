<script setup>
import { onMounted, ref } from 'vue';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip
} from 'chart.js';

const props = defineProps({
  score: {
    type: Object
  }
})

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

const lineChart = ref(null);

const dayOrder = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

// Labels: Mon, Tue, ...
const labels = dayOrder.map(day => day.slice(0,1).toUpperCase() + day.slice(1,3));

// Collect all numbers (ignoring nulls)
let sum = 0, count = 0;
dayOrder.forEach(day => {
  const metrics = props.score[day];
  if (!metrics) return;
  Object.values(metrics).forEach(val => {
    if (val !== null && val !== undefined) {
      sum += val;
      count++;
    }
  });
});

const data = count > 0 ? [sum / count] : [null];

onMounted(() => {
  if (!lineChart.value) return;

  const ctx = lineChart.value.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Lighthouse Score',
        data: data,
        borderColor: '#6c0396',
        backgroundColor: '#010214',
        tension: 0.4,
        pointStyle: 'rect',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      elements: {
        line: {
          borderWidth: ctx => {
            const scale = Math.min(ctx.chart.width, ctx.chart.height);
            return Math.max(1, Math.min(4, scale / 200)); // min 1, max 4
          }
        },
        point: {
          radius: ctx => {
            const scale = Math.min(ctx.chart.width, ctx.chart.height);
            return Math.max(2, Math.min(8, scale / 80)); // min 2, max 8
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#fff',
            font: ctx => {
              const scale = Math.min(ctx.chart.width, ctx.chart.height);
              return { size: Math.max(10, Math.min(16, scale / 50)) }; // min 10, max 16
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: { color: '#fff' },
          ticks: {
            color: '#fff',
            font: ctx => {
              const scale = Math.min(ctx.chart.width, ctx.chart.height);
              return { size: Math.max(10, Math.min(16, scale / 50)) }; // min 10, max 16
            }
          }
        }
      },
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            label: context => `Score: ${context.parsed.y}`
          },
          titleFont: ctx => {
            const scale = Math.min(ctx.chart.width, ctx.chart.height);
            return { size: Math.max(12, Math.min(18, scale / 45)) }; // min 12, max 18
          },
          bodyFont: ctx => {
            const scale = Math.min(ctx.chart.width, ctx.chart.height);
            return { size: Math.max(11, Math.min(16, scale / 55)) }; // min 11, max 16
          }
        },
        title: {
          display: true,
          text: 'Average Lighthouse Score',
          color: '#fff',
          font: ctx => {
            const scale = Math.min(ctx.chart.width, ctx.chart.height);
            return {
              size: Math.max(14, Math.min(22, scale / 30)), // min 14, max 22
              family: 'Arial, Helvetica, sans-serif',
              weight: 'lighter'
            };
          }
        },
        legend: {
          labels: {
            color: '#fff',
            font: ctx => {
              const scale = Math.min(ctx.chart.width, ctx.chart.height);
              return { size: Math.max(10, Math.min(16, scale / 40)) }; // min 10, max 16
            }
          }
        }
      }
    }
  });
});
</script>

<template>
  <div class="chart-container">
    <canvas ref="lineChart"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  max-width: 700px;
  height: 300px; /* adjust as needed */
  display: flex;
  justify-content: center;
  align-items: center;
}
canvas {
  background-color: #070707;
  border-radius: 8px;
}
</style>
