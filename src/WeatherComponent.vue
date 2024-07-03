<template>
  <div>
    <h1>Weather Data</h1>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>
    <div v-if="weather">
      <p>Place: {{ weather.place }}</p>
      <p>Latitude: {{ weather.latitude }}</p>
      <p>Longitude: {{ weather.longitude }}</p>
      <p>Temperature: {{ weather.temperature }}</p>
      <p>Description: {{ weather.description }}</p>
      <img :src="`./assets/${weather.icon}.png`" alt="Weather Icon"/>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { ref } from 'vue';

export default {
  setup() {
    const place = ref('Delhi'); // Initial location
    const error = ref(null);
    const loading = ref(false);

    const fetchWeather = async () => {
      loading.value = true;
      error.value = null;

      try {
        const { data } = await useQuery(weatherQuery, {
          variables: { place: place.value },
          apolloClient: {
            uri: process.env.VUE_APP_GRAPHQL_ENDPOINT,
          },
        });

        if (data && data.weather) {
          const weatherData = data.weather;
          return weatherData;
        } else {
          console.error('Weather data not found!');
        }
      } catch (err) {
        console.error('Error fetching weather data:', err);
        error.value = 'Failed to fetch weather data.';
      } finally {
        loading.value = false; 
      }
    };

    const weatherQuery = gql`
      query($place: String!) {
        weather(place: $place) {
          place
          latitude
          longitude
          temperature
          description
          icon
        }
      }
    `;

    return { place, error, loading, fetchWeather };
  },
};
</script>
