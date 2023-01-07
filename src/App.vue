<script lang="ts">
import { defineComponent } from 'vue';
import FormTable from './components/form-table.vue/form-table.vue';
import FormValues from './components/form-values.vue/form-values.vue';
import type { TableData } from './components/form-table.vue/types';

import { MontyHall, MontyHallResult } from './utils';

export default defineComponent({
  components: {
    FormValues,
    FormTable
  },
  data() {
    return {
      results: null as MontyHallResult | null
    };
  },
  methods: {
    initMontyHall(iterationCount: number | null) {
      if (iterationCount) {
        const montyHall = new MontyHall(iterationCount);
        this.results = montyHall.init();
      }
    }
  },
  computed: {
    tableData(): TableData[] {
      if (this.results) {
        return [
          { name: 'Количество итераций', value: this.results.iterationCount },
          { name: 'Поражения', value: this.results.countOfLose },
          { name: 'Победы', value: this.results.countOfWin },
          {
            name: 'Итоговый процент побед',
            value: this.results.percentOfWinning
          }
        ];
      }
      return [];
    }
  }
});
</script>

<template>
  <section class="app">
    <div class="app__wrapper">
      <div class="app__card">
        <h1 class="app__card-title">Симуляция кейса Монти-Холла</h1>
      </div>
      <form-values class="app__form-values" @submit="initMontyHall" />
      <transition name="show">
        <v-container v-if="tableData.length" class="app__container">
          <form-table :tableData="tableData" />
        </v-container>
      </transition>
    </div>
  </section>
</template>

<style scoped lang="scss">
.app {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }

  &__form-values {
    width: 100%;
  }
  &__card {
    width: fit-content;
    max-width: 100%;
    position: absolute;
    top: 13%;

    &-title {
      font-size: 3.25rem;
      line-height: 4rem;
      font-weight: 600;
      text-align: center;

      @media screen and (width < 1024px) {
        font-size: 2.25rem;
        line-height: 3rem;
      }

      @media screen and (width < 768px) {
        font-size: 1.25rem;
        line-height: 2rem;
      }
    }
  }

  &__container {
    clip-path: inset(0 0 0 0);
  }

  .show {
    &-enter {
      &-from {
        height: 0px;
      }

      &-active {
        padding: 0 16px;
        transition: padding 0.2s ease-in-out, height 0.2s ease-in-out;
      }

      &-to {
        padding: 16px;
        height: 298px;
      }
    }
    &-leave {
      &-from {
        height: 298px;
      }

      &-active {
        padding: 16px;
        transition: padding 0.2s ease-in-out, height 0.2s ease-in-out;
      }

      &-to {
        padding: 0 16px;
        height: 0px;
      }
    }
  }
}
</style>
