<template>
  <div class="result-bar">
    <span class="bar">
      <span class="area positive" :style="{ width: `${ results.positive }%` }">
        <span class="animated-bar"></span>
        <span class="label-inside">{{ results.positive || 50 }}%</span>
        <span class="line"></span>
        <span class="label-outside">Credible news! ✌️</span>
      </span>
      <span class="area negative" :style="{ width: `${ results.negative }%` }">
        <span class="animated-bar"></span>
        <span class="label-inside">{{ results.negative || 50 }}%</span>
        <span class="line"></span>
        <span class="label-outside">Fake news! 👎</span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ResultBar',
  props: {
    results: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.result-bar {
  width: 100%;
  position: relative;
  .bar {
    display: flex;
    width: 100%;
    height: 54px;

    @media (max-width: 768px) {
      height: 44px;
    }
    .area {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #333;
      font-weight: 600;
      position: relative;
      width: 50%;
      &.positive {
        .animated-bar {
          border-radius: 4px 0 0 4px;
          position: absolute;
          left: 0;
          background:#A6FCC4;
          height: 100%;
          animation: load;
          animation-delay: .25s;
          animation-duration: .5s;
          animation-fill-mode: forwards;
          animation-timing-function: linear;
        }
        .label-inside {
          z-index: 5;
          animation: fadeIn;
          animation-duration: .5s;
          animation-delay: .4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      }
      &.negative {
        .animated-bar {
          border-radius: 0 4px 4px 0;
          position: absolute;
          left: 0;
          background: #FCA6A6;
          height: 100%;
          animation: load;
          animation-delay: .75s;
          animation-duration: .5s;
          animation-fill-mode: forwards;
          animation-timing-function: linear;
        }
        .label-inside {
          z-index: 5;
          animation: fadeIn;
          animation-duration: .5s;
          animation-delay: .9s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      }
      .line {
        height: 16px;
        width: 2px;
        display: block;
        background: #6D6D6D;
        position: absolute;
        bottom: -24px;
        animation: fadeInDown;
        animation-duration: .5s;
        animation-delay: 1.2s;
        opacity: 0;
        animation-fill-mode: forwards;
      }
      .label-outside {
        font-size: 12px;
        font-weight: 700;
        position: absolute;
        bottom: -48px;
        transition: all .2s ease;
        animation: fadeInDown;
        animation-duration: .5s;
        animation-delay: 1.3s;
        opacity: 0;
        animation-fill-mode: forwards;

        @media (max-width: 768px) {
          font-size: 12px;
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