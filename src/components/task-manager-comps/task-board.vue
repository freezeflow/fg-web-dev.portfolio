<script setup>
import { computed, ref } from 'vue'
import { useTaskStore } from '@/stores/task.store'
import { Trash } from 'lucide-vue-next';

const taskStore = useTaskStore()
const emit = defineEmits(['drop-task'])
const selectedBoard = ref()
const props = defineProps({
  title: String,
  projectId: String,
  changeTaskStatus: Function,
  deleteTask: Function,
  todo: Object,
  busy: Object,
  complete: Object,
  overdue: Object,
  isClient: Boolean
})

// Group tasks by status
const tasksByStatus = computed(() => {
  const groups = {
    todo: props.todo,
    busy: props.busy,
    complete: props.complete,
    overdue: props.overdue
  }

  Object.values(taskStore.tasksByStatus).forEach(task => {
    if (groups[task.status]) {
      groups[task.status].push(task)
    }
  })
  return groups
})

// Drag logic
function onDragStart(event, task) {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('application/json', JSON.stringify(task))
  event.dataTransfer.setData('from-stage', task.status === 'staged' ? 'true' : 'false')
}

async function onDrop(event, newStatus) {
  const data = event.dataTransfer.getData('application/json')
  const task = JSON.parse(data)
  const taskId = task._id
  const oldStatus = task.status
  console.log(oldStatus)
  const fromStage = event.dataTransfer.getData('from-stage') === 'true'

  if (taskId && newStatus) {
    const upTask = await props.changeTaskStatus(taskId, oldStatus, newStatus, props.projectId)
    console.log(upTask.result)
    if (fromStage) {
    // Notify parent to remove from stagedTasks
    emit('drop-task', { id: taskId })
    }
  }
}

const openBoard = (boardTitle) => {
  selectedBoard.value = selectedBoard.value === boardTitle ? null : boardTitle
}
</script>

<template>
  <div class="kanban-board">
    <div
      class="kanban-column"
      v-for="status in ['todo', 'busy', 'complete']"
      :key="status"
      :class="{ open: selectedBoard === status }"
    >
      <h3 class="column-title"><span :class="status"></span>{{ status.toUpperCase() }}</h3>
      <div class="mobile-column-title" :class="status" @click="openBoard(status)">
        <h3>{{ status.toUpperCase() }}</h3>
      </div>
      <div class="content">
        <div
          v-if="!isClient"
          class="drop-zone"
          @dragover.prevent
          @drop="onDrop($event, status)"
        >
          Drop here to move to {{ status.toUpperCase() }}
        </div>
        <div
          class="task-card"
          v-for="task in tasksByStatus[status]"
          :key="task._id"
          :draggable="isClient? false:true"
          @dragstart="onDragStart($event, task)"
        >
          <strong>{{ task.title }}</strong>
          <p>{{ task.description }}</p>
          <span class="date"><small>Due: {{ new Date(task.dueDate).toLocaleDateString() }}</small> <button v-if="!isClient" @click="props.deleteTask(props.projectId, task.status, task._id)"><Trash/></button></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kanban-board {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  width: 80%;
  height: calc(100vh - 2rem);
  font-family: var(--paragraph-font);
}

.kanban-column {
  flex: 1;
  border-radius: 1rem;
  border: 2px solid var(--off-color);
  padding: 1rem;
  overflow-y: auto;
}

.kanban-column::-webkit-scrollbar {
  height: 4px; /* Horizontal scrollbar height */
  width: 3px;
}

.kanban-column::-webkit-scrollbar-track {
  background: var(--bg-color); /* Track background */
  border-radius: 4px;
}

.kanban-column::-webkit-scrollbar-thumb {
  background: var(--secondary); /* Scrollbar thumb */
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
}

.kanban-column::-webkit-scrollbar-thumb:hover {
  background: #0458c7; /* Hover state */
}

.mobile-column-title{
  display: none;
}

.column-title {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--secondary);
  background-color: var(--off-color);
  width: 100%;
  height: 5%;
  border-radius: 5px;
  font-family: var(--header-font);
  position: relative;
  
}

.column-title span{
  position: absolute;
  left: 0;
  width: 3%;
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.complete{background-color: rgb(0, 209, 0);}
.busy{background-color: var(--secondary);}
.todo{background-color: orange;}

.task-card {
  background-color: #f6f6f6;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-top: 1rem;
  cursor: grab;
  border: 1px solid #ddd;
}

.task-card:active{
  cursor: grabbing;
}

.drop-zone {
  margin-bottom: 0.5rem;
  padding: 1rem;
  border: 2px dashed #aaa;
  border-radius: 0.5rem;
  text-align: center;
  color: #999;
}

.date{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center
}

.date> button svg{
  width: 15px;
  height: auto;
}

.date> button{
  border: 1px solid rgb(139, 139, 139);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.date> small{
  color: rgb(70, 70, 70);
}

@media screen and (max-width: 780px) {
  .kanban-board{
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 0;
    justify-content: end;
  }

  .kanban-column{
    flex: unset;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
    gap: 1rem;
    width: 40px;
    overflow: hidden;
    border-radius: 0;
    transition: all 0.5s ease-in-out;
  }

  .kanban-column.open{
    width: 100%;
  }

  .column-title{
    display: none;
  }

  .mobile-column-title h3{
    transform: rotate(270deg);
    font-size: 1rem;
    color: var(--secondary);
    transform-origin: center;
    white-space: nowrap;
    width: fit-content;
    align-self: center;
    justify-self: center;
  }

  .mobile-column-title {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--off-color);
    width: 40px;
    flex-shrink: 0;
  }

  .mobile-column-title::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 6px;
    height: 100%;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
  }

  .mobile-column-title.todo::before { background-color: orange; }
  .mobile-column-title.busy::before { background-color: var(--secondary); }
  .mobile-column-title.complete::before { background-color: rgb(0, 209, 0); }

  .drop-zone{
    display: none;
  }

  .content{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .content .task-card{
    margin-top: 0;
  }
}
</style>
