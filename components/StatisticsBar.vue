<template>
  <div class="stats">
    <apexchart type="bar" :options="options" :series="seriesData"></apexchart>
  </div>
</template>

<script>
export default {
  name: 'StatisticsBar',
  props: {
    statistics: {
      type: Array,
      required: true,
    },
    userAnswers: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalAnswers () {
      let { totalAnswers } = this.statistics.find(e => e.totalAnswers) || null
      return totalAnswers
    },
    seriesData () {
      const shallowCopy = [...this.statistics]
      const parsedData = shallowCopy.filter(e => !e.hasOwnProperty('totalAnswers')).sort((a,b) => (a.correctAnswers > b.correctAnswers) ? 1 : -1).map(e => e.amount)
      return [{
        name: 'People',
        data: parsedData,
      }]
    },
  },
  data () {
    return {
      options: {
        chart: {
          id: 'vuechart-example',
          width: '100%',
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          enalbed: true,
          x: {
            show: true,
            formatter: (x) => {
              return `${x - 1} correct answers`
            },
          },
        },
        annotations: {
          xaxis: [
            {
              x: this.userAnswers,
              borderColor: '#CAB7FF',
              label: {
                borderColor: '#CAB7FF',
                orientation: 'horizontal',
                text: 'You'
              }
            }
          ]
        },
        xaxis: {
          categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          position: 'bottom',
          tickPlacement: 'on'
        },
        yaxis: {
          title: {
            text: 'Amount of people',
          },
        },
      },
    }
  }
}
</script>

<style lang="scss" scoped>
  .stats {
    width: 100%;
    position: relative;
  }
</style>