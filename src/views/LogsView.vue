<template>
  <ContentHeader
    :elements="[
      { name: `${$t('home.title')}`, path: 'home', icon: 'ph:house-bold' },
      {
        name: `${$t('logs.title')}`,
        path: 'device',
      },
    ]"
    :title="$t('logs.title')"
  />
  <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-2">
      <span class="font-bold">{{ $t("logs.general") }}</span>
    <LogsTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContentHeader from '@/components/project/global/ContentHeader.vue'
import LogsTable from '@/components/project/logs/LogsTable.vue';
</script>
