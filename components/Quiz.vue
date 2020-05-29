<template>
  <div class="quiz">
    <template v-if="answered">
      <div class="wrapper">
        <div class="content">
          <span class="question">Question {{ questionIndex + 1 }} of {{ totalQuestions }}</span>
          <span class="answer" :class="[answerObject]">{{ answer }}</span>
          <span class="desc">{{ currentQuestion.answer === 'fakeNews' ? wasFakeNews : wasntFakeNews }}</span>
          <ResultBar :results="currentStats" />
          <button @click="handleNext">{{ finished ? 'How did I do?' : 'Next Question' }}</button>
        </div>
      </div>
    </template>
    <template v-else-if="finished">
      <div class="wrapper">
        <div class="content">
          <transition name="slide-up-out">
            <img v-if="!showMoreTrigger" src="/Trophy.svg" alt="trophy">
          </transition>
          <span class="congrats">Congratulations!</span>
          <div class="anim-wrapper">
            <span class="small">You scored</span>
            <span class="score">{{ correctAnswers }}/{{ totalQuestions }}</span>
            <span class="desc-better">That's better than {{ betterThanPercentage }}% of the players</span>
          </div>
          <transition name="slide-up-in">
            <StatisticsBar v-if="showMoreStats" :statistics="finishedStats" :userAnswers="correctAnswers" />
          </transition>
          <div class="buttons">
            <button v-if="!showMoreTrigger" class="share" @click="handleStatsClick">Statistics</button>
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
import StatisticsBar from '@/components/StatisticsBar'
export default {
  name: 'Quiz',
  methods: {
    handleStatsClick () {
      this.showMoreTrigger = !this.showMoreTrigger
    },
    loadCurrentQuestion () {
      this.currentQuestion = this.questions[this.questionIndex]
    },
    handleAnswer (answer) {
      this.answered = true
      if (answer === this.currentQuestion.answer) this.answer = 'Correct'
      else if (answer === 'timesUp') this.answer = 'Times Up!'
      else this.answer = 'Incorrect'
      this.previousAnswers.push({ answer: this.answer })
      let nextIndex = this.questionIndex + 1 === this.totalQuestions ? this.totalQuestions : this.questionIndex + 1
      if (answer !== 'timesUp') this.logQuestionEvent(nextIndex, answer)
      if (this.questionIndex + 1 === this.totalQuestions) this.finished = true
    },
    logQuestionEvent (questionNumber, userAnswer) {
      this.$axios.$post('https://us-central1-fakenews-2f6d3.cloudfunctions.net/app/regEvent', {
        event: {
          type: 'questionEvent',
          questionNumber: questionNumber,
          userAnswer: userAnswer,
        }
      })
    },
    logCompletedEvent (correctAnswers) {
      this.$axios.$post('https://us-central1-fakenews-2f6d3.cloudfunctions.net/app/regEvent', {
        event: {
          type: 'completedEvent',
          correctAnswers: correctAnswers,
        }
      })
    },
    async fetchCurrentStatistics () {
      let questionNumber = this.questionIndex + 1
      this.$axios.$get('https://us-central1-fakenews-2f6d3.cloudfunctions.net/app/qStats', {
        params: {
          questionNumber: questionNumber
        },
      }).then(response => {
        let { fakeNews, notFakeNews } = response
        let total = fakeNews + notFakeNews
        let fakeNewsPercentage = ((fakeNews / total) * 100).toFixed()
        let notFakeNewsPercentage = ((notFakeNews / total) * 100).toFixed()
        let newData = {
          positive: notFakeNewsPercentage,
          negative: fakeNewsPercentage,
        }
        this.currentStats = newData
      })
      .catch(error => {
        console.error('Error fetching statistics', error)
      })
    },
    async fetchFinishedStats () {
      const data = await this.$axios.$get('https://us-central1-fakenews-2f6d3.cloudfunctions.net/app/aStats')
      this.finishedStats = data
    },
    handleNext () {
      this.answered = false
      this.answer = null
      if (this.questionIndex + 1 !== this.totalQuestions) this.questionIndex++
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
        this.logCompletedEvent(this.correctAnswers)
      }
    },
  },
  mounted () {
    this.fetchFinishedStats()
  },
  watch: {
    questionIndex: {
      immediate: true,
      handler (index) {
        this.loadCurrentQuestion()
        this.fetchCurrentStatistics()
      },
    },
    showMoreTrigger () {
      setTimeout(() => {
        this.showMoreStats = true
      }, 400)
    }
  },
  data () {
    return {
      questionIndex: 0,
      currentQuestion: {},
      answer: null,
      previousAnswers: [],
      answered: false,
      finished: false,
      currentStats: {},
      finishedStats: [],
      showMoreStats: false,
      showMoreTrigger: false,
      wasFakeNews: 'It was fake news, here\'s how everyone else has answered',
      wasntFakeNews: 'It wasn\'t fake news, here\'s how everyone else has answered',
    }
  },
  props: {
    questions: {
      type: Array,
      required: true,
    },
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
    betterThanPercentage () {
      const total = this.finishedStats.find(e => e.hasOwnProperty('totalAnswers'))
      const { totalAnswers } = total
      let previous = 0
      for (let i = 0; i < this.correctAnswers; i++) {
        let prevPercentile = this.finishedStats.find(e => e.correctAnswers === i)
        previous += prevPercentile.amount
      }
      return ((previous / totalAnswers) * 100).toFixed()
    },
  },
  components: {
    ResultBar,
    QuestionLoader,
    StatisticsBar,
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
      min-width: 500px;

      @media (max-width: 768px) {
        width: 100%;
        min-width: auto;
      }
    }
    .anim-wrapper {
      display: flex;
      flex-direction: column;
      animation: fadeIn;
      animation-duration: 1s;
      opacity: 0;
      animation-delay: .75s;
      animation-fill-mode: forwards;
    }
    .question {
      color: grey;
      font-weight: 600;
      animation: fadeInDown;
      animation-duration: .5s;
    }
    img {
      animation: bounceInDown;
      animation-duration: 1s;
    }
    .congrats {
      font-size: 44px;
      font-weight: 700;
      line-height: 1;
      margin-bottom: 8px;
      margin-top: 24px;
      animation: bounceIn;
      animation-duration: 1s;
      opacity: 0;
      animation-delay: .5s;
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
      animation-duration: .75s;
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
    }
    .small {
      color: #8a8a8a;
      font-weight: 600;
      font-size: 16px;
    }
    .desc {
      font-weight: 600;
      font-size: 18px;
      margin-bottom: 16px;
      animation: fadeIn;
      animation-duration: .75s;
      animation-delay: .25s;
      opacity: 0;
      animation-fill-mode: forwards;

      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
    .desc-better {
      font-weight: 600;
      font-size: 18px;
      margin-bottom: 16px;

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
.slide-up-in-enter-active, .slide-up-in-leave-active {
  transition: all 1s;
  max-height: 500px;
}
.slide-up-in-enter, .slide-up-in-leave-to {
  opacity: 0;
  max-height: 0;
}
.slide-up-out-leave-active {
  transition: all .5s ease;
  max-height: 250px;
}
.slide-up-out-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>