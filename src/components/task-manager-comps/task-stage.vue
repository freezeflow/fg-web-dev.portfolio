<script setup>
import { ref, computed } from 'vue'
import { Trash } from 'lucide-vue-next'

const title = ref('')
const description = ref('')
const dueDate = ref(null)
const searchTerm = ref('')
const stagedTasks = ref({})

const emit = defineEmits(['send-staged'])

const props = defineProps({
    projectId: {
        type: [String, Number],
        required: true
    },
    createTask: {
        type: Function,
        required: true
    },
    deleteTask: {
        type: Function,
        required: true
    },

    stagedTasks: Object
})

const addNewTask = ref(false)
stagedTasks.value = props.stagedTasks

// Drag logic
function onDragStart(event, task) {
  event.dataTransfer.setData('application/json', JSON.stringify(task))
}

// Add task via store (and stage locally if needed)
async function addTask() {
  if (!title.value.trim()) {
    return
  }

  const formData = {
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    projectId: props.projectId
  }

  try {
    const created = await props.createTask(formData)
    stagedTasks.value[created._id] = created

    // Clear form
    title.value = ''
    description.value = ''
    dueDate.value = null
  } catch (err) {
    console.error('Failed to create task', err)
  }
}

// Search
const filteredTasks = computed(() => {
    return Object.values(stagedTasks.value).filter(task =>
        task.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});

// Emit to parent
function sendToTaskBoard() {
  if (Object.keys(stagedTasks.value).length === 0) return;
  emit('send-staged', stagedTasks.value);
  stagedTasks.value = {};
}
</script>

<template>
    <div class="stage">
        <div class="header">
            <div>
                <h3>Staged tasks</h3>
                <button @click="addNewTask = !addNewTask">+</button>
            </div>
            <div>
                <input
                    type="search"
                    v-model="searchTerm"
                    placeholder="Search task"
                />
            </div>
        </div>

        <div class="staged-task-container">
        <p v-if="addNewTask">Add task</p>
        <div class="add-task" v-if="addNewTask">
            <input v-model="title" type="text" placeholder="Title" />
            <textarea v-model="description" placeholder="Description" />
            <input v-model="dueDate" type="date" />

            <div class="add-btn">
            <button @click="addTask">Add</button>
            </div>
        </div>

        <div class="tasks">
            <p>Tasks</p>
            <div
                v-for="task in filteredTasks"
                :key="task._id"
                class="task-item"
                draggable="true"
                @dragstart="(e) => onDragStart(e, task)"
            >
            <strong>{{ task.title }}</strong>
            <p>{{ task.description }}</p>
            <div>
                <p v-if="task.dueDate">Due: {{ task.dueDate.split("T")[0] }}</p>
                <button @click="props.deleteTask(props.projectId, task.status, task._id)"><Trash /></button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
    .stage{
        color: white;
        background-color: var(--off-color);
        width: 20%;
        height: 96vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 2%;
        gap: 2rem;
        overflow-y: auto;
    }

    .header{
        width: 90%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        padding-bottom: 10px;
        border-bottom: 1px solid white;
    }

    .header div{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .header div h3{
        font-family: var(--header-font);
    }

    .header div button{
        border: 0;
        color: white;
        background-color: var(--secondary);
        border-radius: 100%;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .header div button:hover{
        opacity: 0.8;
    }

    .header div input{
        width: 100%;
        background-color: transparent;
        color: white;
        border: 1px solid var(--secondary);
        padding: 5px 5px;
        border-radius: 5px;
    }

    .staged-task-container{
        width: 85%;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    .staged-task-container> p{
        font-family: var(--paragraph-font);
        text-decoration: underline;
    }

    .add-task{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .add-task input,textarea,select{
        width: 100%;
        padding: 5px 5px;
        border: 1px solid var(--secondary);
        background-color: transparent;
        color: white;
        border-radius: 5px;
        font-family: var(--paragraph-font);
    }

    select option{
        background-color: transparent;
    }

    .add-btn{
        width: 100%;
    }

    .add-btn button{
        width: 50%;
        background-color: var(--secondary);
        border: 0;
        color: white;
        border-radius: 4px;
    }

    .tasks{
        margin-top: 4%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .tasks> p{
        font-family: var(--paragraph-font);
        font-size: 1.2rem;
    }

    .task-item{
        width: 100%;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid var(--secondary);
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-family: var(--paragraph-font);
    }

    .task-item div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .task-item button{
        border: 0;
        background-color: transparent;
        width: 20%;
        cursor: pointer;
    }

    .task-item button svg{
        color: var(--secondary);
        width: 20px;
        height: 20px;
    }

    @media screen and (max-width: 780px){
        .stage{
            display: none;
        }
    }

    
</style>