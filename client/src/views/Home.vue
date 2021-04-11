<template>
  <div class="page">
    <PageContainer>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test1</div>
      <div>test1</div>
      <div>test1</div>
      <div>test1</div>
      <div>test1</div>
      <div>test1</div>
      <div>test1</div>
      <div>test1</div>
    </PageContainer>

  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {},
    mixins: [],
    props: {},
    data() {
      return {

      }
    },
    computed: {},
    created() {
      this.axios.get('users')
    },
    methods: {

    },

  }
</script>

<style lang="less" scoped>

</style>