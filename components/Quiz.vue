<template>
  <div class="quiz">
    <span class="question">Question {{ question + 1 }} of {{ totalQuestions }}</span>
    <div class="fakenews">
      <img v-if="currentQuestion.type === 'image'" :src="currentQuestion.url" :alt="currentQuestion.type" />
      <video v-else controls autoplay>
        <source :src="currentQuestion.url" type="video/mp4" />
      </video>
    </div>
    <div class="buttons">
      <span @click="handleAnswer('fakeNews')" :class="yesObject">Yes, it's fake news! ✌️</span>
      <span @click="handleAnswer('notFakeNews')" :class="noObject">No, it's not! 👎</span>
      <button v-if="answered && !finished" @click="handleNext">{{ !finished ? 'Next news' : 'Finish'}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Quiz',
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      question: 0,
      currentQuestion: {},
      answered: false,
      selected: null,
      previousAnswers: [],
      finished: false,
    }
  },
  methods: {
    handleAnswer (answer) {
      if (this.answered) return
      this.selected = answer
      this.answered = true
      if (this.currentQuestion.answer === answer) {
        console.log('correct')
      }
      else {
        console.log('not correct')
      }
      this.previousAnswers.push({answer: answer})
    },
    handleNext () {
      if (this.finished) return
      this.answered = false
      this.selected = null
      this.question++
    },
  },
  watch: {
    questions: {
      immediate: true,
      handler () {
        this.currentQuestion = this.questions[this.question]
      }
    },
    question (number) {
      console.log('fuck', number)
      if (this.totalQuestions !== number) this.currentQuestion = this.questions[number]
      else this.finished = true
    }
  },
  computed: {
    totalQuestions () {
      return this.questions.length
    },
    yesObject () {
      return {
        selected: this.selected === 'fakeNews',
        answered: this.answered && this.selected === 'notFakeNews'
      }
    },
    noObject () {
      return {
        selected: this.selected === 'notFakeNews',
        answered: this.answered && this.selected === 'fakeNews'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.quiz {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 36px;
  .question {
    font-weight: 600;
    margin-bottom: 8px;
  }
  .fakenews {
    height: 60vh;
    margin-bottom: 24px;
    border: 1px solid #ccc;
    img, video{
      object-fit: cover;
      border: none;
      height: 100%;
      width: 100%;
    }
  }
  .buttons {
    display: flex;
    flex-direction: column;
    span {
      background: #F3F3F3;
      cursor: pointer;
      padding: 16px;
      border-radius: 4px;
      font-weight: 600;
      transition: all .2s ease;
      &:hover {
        box-shadow: 0 0 0 2px #333;
      }
      &:first-child {
        margin-bottom: 8px;
      }
      &.selected {
        cursor: auto;
        box-shadow: 0 0 0 2px #333;
      }
      &.answered {
        cursor: auto;
        &:hover {
          box-shadow: none;
        }
      }
    }
    button {
      display: block;
      align-self: flex-end;
      outline: 0;
      padding: 12px 24px;
      font-weight: 600;
      border-radius: 4px;
      margin-top: 8px;
      background: #DBCFFE;
    }
  }
}
</style>