<template>
  <div class="w-full p-4 text-sm">
    <table class="table table-xs w-full border-separate border-spacing-2 text-start">
      <!-- head -->
      <thead>
        <slot name="header">
          <tr>
            <th>Table head 1</th>
            <th>Table head 2</th>
            <th>Table head 3</th>
            <th>Table head 4</th>
          </tr>
        </slot>
      </thead>
      <tbody class="text-center divide-y">
        <slot name="body">
          <tr>
            <td>Item 1</td>
            <td>Item 2</td>
            <td>Item 3</td>
            <td>Item 4</td>
          </tr>
        </slot>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts"></script>
