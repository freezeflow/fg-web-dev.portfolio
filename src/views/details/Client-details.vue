<template>
    <admin-nav 
        v-if="clientRole"
    />
    <div :class="clientRole? 'logged-client-details-view' : 'client-details-view'">
        <div class="client-details">
            <client-details
                v-if="client"
                :clientInfo="client"
                :projects="projects"
                :is-client="clientRole"
                @delete="(isDeleting = true)"
                @edit="(isUpdating = true)"
                @add-project="(isAddingProject = true)"
                @remove="(id) => handleOpenRemoveProject(id)"
            />
        </div>
        <div class="client-files" v-if="!clientRole">
            <div class="file-view-control">
                <button @click="isAdding = true">Add files</button>
                <input type="search" name="" id="" placeholder="Search assets" />
            </div>
            <div class="file-tables">
                <client-files
                v-if="files"
                    v-for="file in files"
                    :file="file"
                    :downloadFile="clientStore.downloadClientFile.bind(clientStore)"
                    :deleteFile="clientStore.deleteClientFile.bind(clientStore)"
                />
            </div>
            
        </div>
    </div>

    <teleport to="body">
        <delete-card 
            v-if="client && isDeleting"
            :title="client.name"
            @close="isDeleting = false"
            @validation-result="handleDelete"
        />

        <update-client 
            v-if="client && isUpdating"
            :update-client="clientStore.updateClient.bind(clientStore)"
            @close="isUpdating = false"
            :client-info="client"
        />

        <add-projects 
            v-if="client && isAddingProject"
            :update-client="clientStore.updateClient.bind(clientStore)"
            @close="isAddingProject = false"
            :client-id="client._id"
            :projects="nonClientProjects"
            :client-projects="client.projects"
            @add="handleAddProject(id)"
        />

        <remove-project 
            v-if="client && isRemoving"
            :update-client="clientStore.updateClient.bind(clientStore)"
            @close="isRemoving = false"
            :client-info="client"
            :projectName="removeProjectName"
            @remove="handleRemoveProject()"
        />

        <upload-file
            v-if="isAdding"
            :validateSize="formUtil.isFileSizeValid.bind(formUtil)"
            :uploadFile="clientStore.uploadClientFile.bind(clientStore)"
            :clientId="client._id"
            @close="isAdding = false"
        />
    </teleport>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useClientStore } from '@/stores/client.store';
import { useProjectStore } from '@/stores/projects.store';
import { useLoggedClientStore } from '@/stores/logged.client.store';
import clientDetails from '@/components/client-comps/client-details.vue'
import clientFiles from '@/components/client-comps/client-files.vue';
import deleteCard from '@/components/delete-card.vue';
import uploadFile from '@/components/client-comps/upload-file.vue';
import updateClient from '@/components/client-comps/update-client.vue';
import addProjects from '@/components/client-comps/add-projects.vue';
import removeProject from '@/components/client-comps/remove-project.vue';
import adminNav from '@/components/admin-nav.vue';
import { formUtility } from '@/utils/form.utils';
import router from '@/router';

const formUtil = new formUtility()
const clientStore = useClientStore()
const projectStore = useProjectStore()
const isAddingProject = ref(false)
const clientRole = ref()
const projects = ref([])
const removeProjectId = ref()
const removeProjectName = ref()
const isDeleting = ref(false)
const isUpdating = ref(false)
const isAdding = ref(false)
const isRemoving = ref(false)
const client = ref(null)
const nonClientProjects = ref([])

const files = ref([])
let loggedClientStore

const handleDelete = (result) =>{
    if(result.success) clientStore.deleteClient(client.value._id)
    router.push('/clients')
}

const handleOpenRemoveProject = (project) =>{
    removeProjectName.value = project.title
    removeProjectId.value = project.id
    isRemoving.value = true
}

const handleRemoveProject = async () => {
    const filteredProjects = client.value.projects.filter(p => {
        return p._id !== removeProjectId.value
    })

    const form = {
        projects: filteredProjects.map(p => p._id)
    }

    await clientStore.updateClient(client.value._id, form)
    isRemoving.value = false
}

onMounted(async () => {
    const stored = localStorage.getItem('selectedClient')
    
    if (stored) {
        client.value = JSON.parse(stored)
        await clientStore.getFilesByClient(client.value._id)
        nonClientProjects.value = await clientStore.getNonClientProjects()
        const storedFiles = localStorage.getItem('clientFiles')
        const ids = client.value.projects.map(p => p._id)

        // Use the new multi-project fetcher
        if(ids.length != 0) projects.value = await projectStore.getProjects(ids, true)

        files.value = JSON.parse(storedFiles)
    }
})
</script>