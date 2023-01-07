<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  props: {
    tableData: {
      type: Object,
      required: true
    }
  }
});
</script>

<template>
  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">Название</th>
        <th class="text-left">Значение</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in tableData" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.value }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
