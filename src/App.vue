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
    initMontyHall(iterationCount: number, doorsCount: number) {
      if (iterationCount) {
        const montyHall = new MontyHall(iterationCount, doorsCount);
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

      <div class="app__flex">
        <transition name="show">
          <v-container v-if="tableData.length" class="app__container">
            <form-table :tableData="tableData" />
          </v-container>
        </transition>
      </div>
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
    transition: flex 0.2s ease-in-out;
    width: 100%;
    flex: 0;
    display: flex;
    align-items: center;
  }
  &__card {
    transition: flex 0.2s ease-in-out;
    width: fit-content;
    max-width: 100%;
    display: flex;
    flex: 1;
    align-items: center;

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
    overflow: hidden;
  }

  &__flex {
    flex: 1;
    display: flex;
    width: 100%;
    transition: flex 0.2s ease-in-out;
  }

  .show {
    &-enter {
      &-from {
        height: 0px;
      }

      &-active {
        padding: 0 16px;
        transition: padding .2s ease-in-out, height .2s ease-in-out;
      }

      &-to {
        padding: 16px;
        height: 100%;
      }
    }
    &-leave {
      &-from {
        height: 100%;
      }

      &-active {
        padding: 16px;
        transition: padding .2s ease-in-out, height .2s ease-in-out;
      }

      &-to {
        padding: 0 16px;
        height: 0px;
      }
    }
  }
}
</style>
