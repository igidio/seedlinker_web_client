<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-row justify-between">
      <span>{{ $t('home.available_devices') }}:</span>
      <button
        class="btn btn-base btn-xs"
        @click="is_authenticated ? true : show_login_modal()"
      >
        <Icon icon="ph:plug-fill" />
        {{ $t('connect_manually') }}
      </button>
    </div>

    <NewDevice :device="device.device!" v-for="device in connected_by_types.devices" :key="device.device?.uuid"/>

<!--    <div-->
<!--      class="card w-96 bg-base-100 card-xs shadow-sm p-4"-->
<!--      v-for="device in connected_by_types.devices"-->
<!--      :key="device.device?.id"-->
<!--    >-->
<!--      <div class="card-body">-->
<!--        <div class="flex flex-row justify-between">-->
<!--          <h2 class="card-title font-semibold">{{ device.device?.type }}</h2>-->
<!--          <button class="btn btn-base btn-xs">-->
<!--            <Icon icon="ph:plugs-connected-fill" />{{ $t('connect') }}-->
<!--          </button>-->
<!--        </div>-->
<!--        <p>ID: {{ device.device?.uuid }}</p>-->
<!--        <div class="justify-end card-actions"></div>-->
<!--      </div>-->
<!--    </div>-->
    {{ connected_by_types.devices }}
    {{ connected_by_types.clients }}
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDeviceStore } from '@/stores/device.store.ts'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useConfigStore } from '@/stores/config.store.ts'
import NewDevice from '@/components/project/NewDevice.vue'
const modal_is_open = ref<HTMLDialogElement>()

const { show_login_modal } = useConfigStore();

const { connected_by_types } = storeToRefs(useDeviceStore())


const configStore = useConfigStore();
const { is_authenticated } = storeToRefs(configStore)
</script>
