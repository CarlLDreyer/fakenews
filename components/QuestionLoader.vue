<template>
  <div class="question-loader ">
    <span class="question">Question {{ questionNumber }} of {{ totalQuestions }}</span>
    <div class="content-loader">
      <img v-lazy="question.url" />
    </div>
    <div class="footer">
      <span class="loader"><span class="filled"></span></span>
      <span class="buttons">
        <button @click="handleAnswer('fakeNews')">Fake news! 👎</button>
        <button @click="handleAnswer('notFakeNews')">Credible news! ✌️</button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionLoader',
  data () {
    return {
      answered: false,
    }
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    questionNumber: {
      type: Number,
      required: true,
    }
  },
  methods: {
    handleAnswer(answer) {
      this.answered = true
      this.$emit('questionAnswered', answer)
    }
  },
  watch: {
    question: {
      immediate: true,
      handler () {
        setTimeout(() => {
          if (!this.answered) this.$emit('questionAnswered', 'timesUp')
        }, 10000)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.question-loader {
  width: 100%;
  position: relative;
  animation: fadeIn;
  animation-duration: .5s;
  .question {
    font-weight: 600;
    margin-bottom: 8px;
    display: flex;
  }
  .content-loader {
    height: auto;
    max-height: 480px;
    overflow: hidden;
    border: 1px solid #ccc;
    margin-bottom: 8px;
    animation: fadeIn;
    animation-duration: .5s;

    img {
      border: none;
      width: 100%;
      height: calc(100vw / 1.875);
      max-height: 480px;
    }
  }
  .footer {
    display: flex;
    flex-direction: column;
    .loader {
      width: 100%;
      background: #E9ECF0;
      height: 16px;
      margin-bottom: 8px;
      .filled {
        display: block;
        background: #D5D8E0;
        animation: load 10s linear;
        height: 100%;
      }
    }
    .buttons {
      display: flex;
      width: 100%;

      @media (max-width: 768px) {
        flex-direction: column;
      }
      button {
        background: #E9ECF0;
        width: 50%;
        padding: 16px 0;
        font-weight: 700;
        border-radius: 4px;
        outline: 0;
        transition: all .1s ease;
        &:first-child {
          margin-right: 3px;

          @media (max-width: 768px) {
            margin-right: 0;
          }
        }
        &:last-child {
          margin-left: 3px;

          @media (max-width: 768px) {
            margin-top: 4px;
            margin-left: 0;
          }
        }
        &:hover {
          background: #D7D7D7;
        }

        @media (max-width: 768px) {
          width: 100%;
        }
      }
    }
  }
}
@keyframes load {
  from { width: 0 }
  to { width: 100% }
}
</style>