<template>
  <div id="app">
    <WeatherComponent />
  </div>
</template>

<script>
import WeatherComponent from './WeatherComponent.vue';

export default {
  name: 'App',
  components: {
    WeatherComponent,
  },
};
</script>