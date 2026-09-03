<script setup>
const props = defineProps({
    comment: {
        type: Object,
        required: true
    }
});
</script>
<template>
    <div style="display: flex; flex-direction: row; align-items: center; margin-top:16px">
        <img src="../assets/avatar.jpg" alt="Avatar" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 8px;" />
        <div>
            <p>{{ comment.author.name }}</p>
        </div>
    </div>
    <div style="display: flex;margin-left: 40px;margin-top:8px;padding: 8px">
        <p style="font-size: 14px; ">{{ comment.content }}</p>
    </div>
</template>