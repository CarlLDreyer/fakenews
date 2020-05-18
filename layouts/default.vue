<template>
  <v-app>
    <v-app-bar app flat color="white" class="d-flex justify-center align-center">
      <v-toolbar-title class="logo">{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid class="fill-height d-flex" align-center justify-center>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Default',
  data () {
    return {
      title: 'fakenews.',
    }
  },
}
</script>

<style lang="scss" scoped>
.logo {
  font-weight: 700;
  line-height: 1.4;
  font-size: 24px;
  border-bottom: 4px solid #CAB7FF;
}
</style>
