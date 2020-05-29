<template>
  <v-layout
    justify-center
    align-center
  >
    <h1>{{ textTopFirst }}</h1>
    <h1>{{ textTopSecond }}</h1>
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
      textTopFirst: '404',
      textTopSecond: 'Page not found',
      textMiddle: 'I got my best people looking for it! 🕵️‍♂️🕵️‍♀️',
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

<style scoped>
h1 {
  font-size: 20px;
}
</style>

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
    font-size: 32px;
    line-height: 1;
    animation: fadeIn;
    animation-duration: 1s;
    &:first-child {
      font-size: 54px;
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      font-size: 32px;
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
