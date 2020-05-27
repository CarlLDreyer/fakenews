<template>
  <div class="quiz">
    <template v-if="answered">
      <div class="wrapper">
        <div class="content">
          <span class="question">Question {{ questionIndex + 1 }} of {{ totalQuestions }}</span>
          <span class="answer" :class="[answerObject]">{{ answer }}</span>
          <span class="desc">{{ currentQuestion.answer === 'fakeNews' ? wasFakeNews : wasntFakeNews }}</span>
          <ResultBar :results="fakeData" />
          <button @click="handleNext">{{ finished ? 'How did I do?' : 'Next Question' }}</button>
        </div>
      </div>
    </template>
    <template v-else-if="finished">
      <div class="wrapper">
        <div class="content">
          <img src="/Trophy.svg" alt="trophy">
          <span class="congrats">Congratulations!</span>
          <span class="small">You scored</span>
          <span class="score">11/20</span>
          <!-- <span class="score">{{ correctAnswers }}/{{ totalQuestions }}</span> -->
          <span class="desc">That's better than 85% of the players</span>
          <div class="buttons">
            <button class="share">Statistics</button>
            <button class="share">Share</button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <QuestionLoader
        :question="currentQuestion"
        :totalQuestions="totalQuestions"
        :questionNumber="questionIndex + 1"
        @questionAnswered="handleAnswer($event)"
      >
      </QuestionLoader>
    </template>
  </div>
</template>

<script>
import QuestionLoader from '@/components/QuestionLoader'
import ResultBar from '@/components/ResultBar'
export default {
  name: 'Quiz',
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    loadCurrentQuestion () {
      this.currentQuestion = this.questions[this.questionIndex]
    },
    handleAnswer (answer) {
      this.answered = true
      if (answer === this.currentQuestion.answer) this.answer = 'Correct'
      else if (answer === 'timesUp') this.answer = 'Times Up!'
      else this.answer = 'Incorrect'
      this.previousAnswers.push({ answer: this.answer })
      this.$gtag.event('questionAnswered', {
        'event_category': 'question',
        'event_label': this.questionIndex + 1,
        'value': answer,
      })
      
      if (this.questionIndex + 1 === this.totalQuestions) this.finished = true
    },
    handleNext () {
      this.answered = false
      this.answer = null
      this.questionIndex++
      if (this.finished) {
        this.$confetti.start({
          defaultDropRate: 15,
          defaultSize: 8,
          particlesPerFrame: 0.75,
          particles: [
            { type: 'circle' },
            { type: 'rect' },
          ]
        })
        this.$gtag.event('quizAnswered', {
          'event_category': 'quiz',
          'event_label': 'done',
          'value': this.correctAnswers,
        })
      }
    },
  },
  watch: {
    questionIndex: {
      immediate: true,
      handler (index) {
        this.loadCurrentQuestion()
      }
    },
  },
  data () {
    return {
      questionIndex: 0,
      currentQuestion: {},
      answer: null,
      previousAnswers: [],
      answered: false,
      finished: false,
      fakeData: {
        positive: 75,
        negative: 25,
      },
      wasFakeNews: 'It was fake news, here\'s how everyone else has answered',
      wasntFakeNews: 'It wasn\'t fake news, here\'s how everyone else has answered',
    }
  },
  computed: {
    totalQuestions () {
      return this.questions.length
    },
    answerObject () {
      return {
        correct: this.answer === 'Correct',
        incorrect: this.answer === 'Incorrect',
        timesUp: this.answer === 'Times Up!',
      }
    },
    correctAnswers () {
      return this.previousAnswers.filter(a => a.answer === 'Correct').length
    },
  },
  components: {
    ResultBar,
    QuestionLoader,
  },
}
</script>

<style lang="scss" scoped>
.quiz {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #333;
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background: white;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;
      padding: 0 8px;
      transition: all .2s ease;

      @media (max-width: 768px) {
        width: 100%;
      }
    }
    .question {
      color: grey;
      font-weight: 600;
      animation: fadeInDown;
      animation-duration: 1s;
    }
    img {
      animation: bounceInDown;
      animation-duration: 1s;
      margin-bottom: 24px;
    }
    .congrats {
      font-size: 44px;
      font-weight: 700;
      line-height: 1;
      margin-bottom: 8px;
      animation: bounceIn;
      animation-duration: 1s;
      opacity: 0;
      animation-delay: 1s;
      animation-fill-mode: forwards;

      @media (max-width: 768px) {
        font-size: 32px;
      }
    }
    .answer {
      font-size: 52px;
      font-weight: 700;
      line-height: 1;
      margin-bottom: 8px;
      animation: zoomIn;
      animation-duration: 1s;
      &.correct {
        color: #A6FCC4;
      }
      &.incorrect {
        color: #FCA6A6;
      }
      &.timesUp {
        color: #CAB7FF;
      }

      @media (max-width: 768px) {
        font-size: 44px;
      }
    }
    .score {
      font-size: 36px;
      font-weight: 600;
      line-height: 1;
      margin-bottom: 8px;
      animation: fadeIn;
      animation-duration: 1s;
      opacity: 0;
      animation-delay: 1s;
      animation-fill-mode: forwards;
    }
    .small {
      color: #8a8a8a;
      font-weight: 600;
      font-size: 16px;
      animation: fadeIn;
      animation-duration: 1s;
      opacity: 0;
      animation-delay: 1s;
      animation-fill-mode: forwards;
    }
    .desc {
      font-weight: 600;
      font-size: 18px;
      margin-bottom: 16px;
      animation: fadeIn;
      animation-duration: 1s;
      animation-delay: 1s;
      opacity: 0;
      animation-fill-mode: forwards;

      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
    button {
      position: absolute;
      bottom: -124px;
      outline: 0;
      background: #E9ECF0;
      padding: 12px 36px;
      font-weight: 700;
      border-radius: 4px;
      transition: all .1s ease;
      animation: fadeInUp;
      animation-duration: 1s;
      animation-delay: 1.5s;
      opacity: 0;
      animation-fill-mode: forwards;
      &.share {
       position: relative;
       bottom: auto;
      }
      &:hover {
        background: #D7D7D7;
      }
    }
  }
}
</style>