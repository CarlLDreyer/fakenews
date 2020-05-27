<template>
  <div class="result-bar">
    <span class="bar">
      <span class="area positive" :style="{ width: `${ results.positive }%` }">
        <span class="label-inside">{{ results.positive }}%</span>
        <span class="line"></span>
        <span class="label-outside">Yes, it's fake news! ✌️</span>
      </span>
      <span class="area negative" :style="{ width: `${ results.negative }%` }">
        <span class="label-inside">{{ results.negative }}%</span>
        <span class="line"></span>
        <span class="label-outside">No, it's not! 👎</span>
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
  animation: fadeIn;
  animation-duration: 1s;
  animation-delay: 1s;
  opacity: 0;
  animation-fill-mode: forwards;
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
      &.positive {
        background:#A6FCC4;
        border-radius: 4px 0 0 4px;
      }
      &.negative {
        background: #FCA6A6;
        border-radius: 0 4px 4px 0;
      }
      .line {
        height: 16px;
        width: 2px;
        display: block;
        background: #6D6D6D;
        position: absolute;
        bottom: -24px;
      }
      .label-outside {
        font-size: 12px;
        font-weight: 700;
        position: absolute;
        bottom: -48px;
        transition: all .2s ease;

        @media (max-width: 768px) {
          font-size: 12px;
        }
      }
    }
  }
}
</style>