<template>
  <v-layout
    justify-center
    align-center
  >
    <h1>{{ textTop }}</h1>
    <h2>{{ textMiddle }}</h2>
    <h2>{{ textBottom }}</h2>
    <button @click="handleRoute">Latest project</button>
  </v-layout>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      textTop: '🚧 Under construction 🚧',
      textMiddle: 'I could say it\'s coming soon, but it\'s probably not.',
      textBottom: 'Meanwhile check out my latest project.',
    }
  },
  methods: {
    handleRoute () {
      this.$router.push('/fakenews')
    },
  },
}
</script>

<style lang="scss" scoped>
.layout {
  max-width: 900px;
  display: flex;
  flex-direction: column;
  color: #333;
  text-align: center;
  h2 {
    font-size: 16px;
    animation: fadeIn;
    animation-duration: 1s;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  h1 {
    margin-bottom: 16px;
    font-size: 36px;
    line-height: 1;
    animation: fadeIn;
    animation-duration: 1s;

    @media (max-width: 768px) {
      font-size: 28px;
    }
  }
  button {
    background: #E9ECF0;
    padding: 12px 36px;
    font-weight: 700;
    border-radius: 4px;
    outline: 0;
    margin-top: 24px;
    transition: all .1s ease;
    animation: fadeInUp;
    animation-duration: 1s;
    &:hover {
      background: #D7D7D7;
    }
  }
}
</style>