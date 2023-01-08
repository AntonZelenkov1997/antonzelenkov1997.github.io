<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  data() {
    return {
      valid: true,
      iterationCount: 100,
      doorsCount: 3,
      rules: {
        required: (value: string) => {
          return !!value || 'Поле не должно быть пустым';
        },
        counter: (value: string | number) => {
          return value.toString().length <= 10 || 'Максимум 10 символов';
        },
        nonZero: (value: string) => {
          return !/^0/gm.test(value) || 'Поле не должно начинаться с 0';
        },
        nonSeparators: (value: string) => {
          return (
            !/[.,]+/gm.test(value) ||
            'Поле не должно иметь разделяющих запятых или точек'
          );
        },
        nonLessThanThree: (value: string) => {
          return Number(value) > 2 || 'Дверей не может быть меньше 3';
        }
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.valid || this.valid === null) {
        this.$emit('submit', Number(this.iterationCount), Number(this.doorsCount));
      }
    }
  },
  emits: ['submit']
});
</script>

<template>
  <v-form v-model="valid" @submit.prevent="onSubmit">
    <v-container>
      <v-row>
        <v-col cols="12" md="5" class="column">
          <v-text-field
            type="number"
            @wheel="() => {}"
            :hide-spin-buttons="true"
            v-model="iterationCount"
            counter
            maxlength="10"
            :rules="[
              rules.required,
              rules.counter,
              rules.nonZero,
              rules.nonSeparators
            ]"
            step="10"
            clearable
            label="Итерации"
            required
          />
        </v-col>
        <v-col cols="12" md="5" class="column">
          <v-text-field
            type="number"
            @wheel="() => {}"
            :hide-spin-buttons="true"
            v-model="doorsCount"
            counter
            maxlength="10"
            :rules="Object.values(rules)"
            step="10"
            clearable
            label="Двери"
            required
          />
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

    @media screen and (width < 960px) {
      height: var(--v-btn-height);
    }
  }
}
</style>
