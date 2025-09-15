<script setup>
    import { Trash2, Download } from 'lucide-vue-next';
    const props = defineProps({
        file: Object,
        downloadFile: Function,
        deleteFile: Function
    })
</script>

<template>
  <table>
    <tbody>
        <tr>
            <th>File Name</th>
            <td>{{ props.file.fileName }}</td>
        </tr>
        <tr>
            <th>Type</th>
            <td>{{ props.file.fileType }}</td>
        </tr>
        <tr>
            <th>Upload Date</th>
            <td>{{ props.file.createdAt.split("T")[0] }}</td>
        </tr>
        <tr>
            <th>Notes</th>
            <td>{{ props.file.note }}</td>
        </tr>
        <tr>
            <th>Actions</th>
            <td class="actions">
                <button @click="props.downloadFile(props.file.fileName)"><Download /></button>
                <button @click="props.deleteFile(props.file._id)"><Trash2 /></button>
            </td>
        </tr>
    </tbody>
  </table>
</template>

<style scoped>
    table{
        width: 100%;
        border-collapse: collapse;
        color: white;
        font-family: var(--paragraph-font);
    }

    table th,
    table td {
        border: 1px solid var(--secondary);
        padding: 0.75rem;
        text-align: left;
    }

    button{
        background-color: transparent;
        border: 0;
        outline: 0;
        cursor: pointer;
        width: fit-content;
        height: fit-content;
    }

    button svg{
        width: 15px;
        color: var(--secondary);
        transition: all 0.3s ease-in-out;
    }

    button:hover svg{
        color: white;
    }

    .actions{
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }
</style>