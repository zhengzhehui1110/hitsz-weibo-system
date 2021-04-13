<template>
  <div class="page">
    <PageContainer>
      <router-view></router-view>
      <div class="blank"></div>
    </PageContainer>
    <mu-bottom-nav :value.sync="shift" shift class="bottom_nav">
      <mu-bottom-nav-item value="articals" title="Movies" icon="ondemand_video"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="post" title="Music" icon="music_note"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="my" title="Books" icon="books"></mu-bottom-nav-item>
    </mu-bottom-nav>
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
        shift: 'articals',
      }
    },
    computed: {},
    created() {
      console.log('登录成功:', this.$global.userInfo);
    },
    methods: {},

  }
</script>

<style lang="less" scoped>
  .bottom_nav {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
</style>