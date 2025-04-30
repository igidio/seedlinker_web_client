<template>

  <div class="flex flex-col items-center gap-2 mb-4">
    <UiLogo :size="52"/>
    <span class="font-bold text-3xl">Seedlinker</span>
  </div>


  <div class="flex flex-row justify-center items-center ">
    <LoginForm/>
  </div>



</template>
<script setup lang="ts">
import LoginForm from '@/components/project/auth/LoginForm.vue'
import UiLogo from '@/components/ui/UiLogo.vue'
</script>
