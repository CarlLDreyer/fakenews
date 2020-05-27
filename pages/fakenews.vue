<template>
  <v-layout
    justify-center
    align-center
  >    
    <template v-if="hasStarted">
      <Quiz :questions="questions" />
    </template>
    <template v-if="!hasStarted">
      <h2>{{ one }}</h2>
      <h1>{{ two }}</h1>
      <button @click="handlePlay">Let's find out</button>
      <p>{{ three }}</p>
    </template>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Quiz from '@/components/Quiz'
export default {
  layout: 'fakenews',
  name: 'FakeNews',
  data () {
    return {
      one: '86% have fallen for fake news at least once*',
      two: 'Are you one of them?',
      three: '* according to the CIGI-Ipsos Global Survey.',
      // questions: [
      //   {
      //     url: '/fakenews/ImageTwo.png',
      //     type: 'image',
      //     answer: 'notFakeNews',
      //   }, {
      //     url: '/fakenews/ImageOne.png',
      //     type: 'image',
      //     answer: 'fakeNews',
      //   },{
      //     url: '/fakenews/VideoOne.mp4',
      //     type: 'video',
      //     answer: 'fakeNews',
      //   }, {
      //     url: '/fakenews/ImageFour.png',
      //     type: 'image',
      //     answer: 'fakeNews',
      //   }
      // ],
      questions: [
        {
          url: '/fakenews/ImageTwo.png',
          type: 'image',
          answer: 'notFakeNews',
        }
      ],
    }
  },
  methods: {
    ...mapActions([
      'startFakeNewsQuiz',
    ]),
    handlePlay () {
      this.startFakeNewsQuiz()
    },
  },
  computed: {
    ...mapGetters([
      'hasStarted',
    ]),
  },
  components: {
    Quiz,
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
    font-size: 42px;
    line-height: 1;
    animation: fadeIn;
    animation-duration: 1s;
    @media (max-width: 768px) {
      font-size: 32px;
    }
  }
  p {
    position: fixed;
    font-weight: 500;
    font-size: 12px;
    bottom: 0;
    margin-bottom: 8px;
    animation: fadeIn;
    animation-duration: 1s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
    opacity: 0;
    @media (max-width: 768px) {
      font-size: 10px;
    }
  }
  button {
    background: #E9ECF0;
    padding: 12px 36px;
    font-weight: 700;
    border-radius: 4px;
    outline: 0;
    transition: all .1s ease;
    animation: fadeInUp;
    animation-duration: 1s;
    &:hover {
      background: #D7D7D7;
    }
  }
}
</style>