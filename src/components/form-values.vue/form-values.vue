<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  data() {
    return {
      valid: false,
      iterationCount: 100,
      rules: {
        required: (value: string) => !!value || 'Поле не должно быть пустым',
        counter: (value: string | number) => {  
          return value.toString().length <= 10 || 'Максимум 10 символов';
        },
        nonZero: (value: string) => {
          return !/^0/gm.test(value) || 'Поле не должно начинаться с 0';
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.iterationCount);
    }
  },
  emits: ['submit']
});
</script>

<template>
  <v-form v-model="valid" @submit.prevent="onSubmit">
    <v-container>
      <v-row>
        <v-col cols="12" md="12" class="column">
          <h2>Введи количество итераций</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="10" class="column">
          <v-text-field
            type="number"
            @wheel="() => {}"
            :hide-spin-buttons="true"
            v-model="iterationCount"
            counter
            maxlength="10"
            :rules="Object.values(rules)"
            step="10"
            clearable
            label="Итерации"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2" class="column">
          <v-btn color="primary" class="button" type="submit">
            Рассчитать
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<style scoped lang="scss">
.column {
  display: flex;
  flex-direction: column;

  .button {
    height: calc(100% - 22px);
  }
}
</style>
