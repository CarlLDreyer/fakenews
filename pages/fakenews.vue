<template>
  <v-layout
    justify-center
    align-center
  >
    <Quiz :questions="questions" />
  </v-layout>
</template>

<script>
import Quiz from '@/components/Quiz'
export default {
  name: 'FakeNews',
  data () {
    return {
      questions: [
        {
          url: 'https://firebasestorage.googleapis.com/v0/b/fakenews-2f6d3.appspot.com/o/FakeNews1.png?alt=media&token=0f40faef-b160-4572-b469-3c796e81cd87',
          type: 'image',
          answer: 'fakeNews',
        },{
          url: 'https://firebasestorage.googleapis.com/v0/b/fakenews-2f6d3.appspot.com/o/FakeNews2.mp4?alt=media&token=46ec4680-ba97-4805-9e38-829c507c4084',
          type: 'video',
          answer: 'fakeNews',
        }
      ],
    }
  },
  components: {
    Quiz,
  },
}
</script>

<style lang="scss" scoped>
.layout {
  max-width: 900px;
}
</style>