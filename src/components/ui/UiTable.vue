<template>
  <div class="w-full bg-base-100 shadow-lg p-4 rounded-box">
    <table class="table table-xs w-full border-separate border-spacing-2 text-start">
      <!-- head -->
      <thead>
        <slot name="header">
          <tr class="text-starts">
            <th>Table head 1</th>
            <th>Table head 2</th>
            <th>Table head 3</th>
            <th>Table head 4</th>
          </tr>
        </slot>
      </thead>
      <tbody>
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
