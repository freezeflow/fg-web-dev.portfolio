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

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

const lineChart = ref(null);

const props = defineProps({
  uptime: {
    type: Object
  }
})

function setData(){
  const data = Object.values(props.uptime)
  const fullLabels = Object.keys(props.uptime)

  const labels = fullLabels.map(str =>  str.charAt(0).toUpperCase() + str.slice(1, 3).toLowerCase())

   return {data, labels}
}

const {data, labels} = setData()

onMounted(() => {
  if (!lineChart.value) return;

  const ctx = lineChart.value.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Uptime Score',
        data: data,
        borderColor: '#0584d8',
        backgroundColor: '#010214',
        tension: 0.4,
      }]
    },
    options: {
      responsive: true,
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
            label: function(context) {
              return `Score: ${context.parsed.y}`;
            }
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
          text: 'Average Uptime',
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