<template>
  <div class="page">
    <PageContainer>
      <router-view></router-view>
      <div class="blank"></div>
    </PageContainer>
    <mu-bottom-nav :value.sync="shift" shift color="white" class="bottom_nav" @change="navigateTo(shift)">
      <mu-bottom-nav-item value="Articals" title="首页" icon="home"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="PostArtical" title="发动态" icon="create"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="my" title="我的" icon="books"></mu-bottom-nav-item>
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
        shift: 'Articals',
      }
    },
    computed: {},
    created() {
      console.log('登录成功:', this.$global.userInfo);
    },
    methods: {
      navigateTo(pageName) {
        this.$router.push({
          name: pageName
        })
      }
    },

  }
</script>

<style lang="less" scoped>
  .bottom_nav {
    width: 100%;
    position: absolute;
    bottom: 0;
    color: #707070;
    opacity: 0.9;
  }

  .mu-bottom-item-active.is-shift {
    color: #2196f3;
  }
</style>