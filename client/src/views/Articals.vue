<template>
    <div>
        <mu-scale-transition>
            <ArticalCard v-if="!articals.length && show" :artical="defaultArtical" :isActionAllow="false"></ArticalCard>

        </mu-scale-transition>
        <mu-scale-transition v-for="item in articals" :key="item._id">
            <ArticalCard v-show="show" :artical="item"></ArticalCard>

        </mu-scale-transition>
        <!-- <ArticalCard v-for="item in articals" :key="item._id" :artical="item"></ArticalCard> -->
    </div>
</template>

<script>
    const DEFAULT_ARTICAL = { // 首页没有动态时的显示内容
        text: '快来发布第一条动态吧~',
        avatar: '',
        authorName: '一个好人',
        pic: '',
    }
    export default {
        name: 'Articals',
        components: {},
        mixins: [],
        props: {},
        data() {
            return {
                articals: [],
                show: false,
            }
        },
        computed: {
            defaultArtical() {
                return DEFAULT_ARTICAL
            },
        },
        async created() {
            await this.getArticals()
            setTimeout(() => {
                this.show = !this.show
            }, 300)
        },
        methods: {
            async getArticals() {
                let userInfo = this.$user.getInfo()
                // userInfo._id = '60753a970862a540f0dbf952'
                console.log('查询用户文章：', userInfo);
                let res = await this.axios.post(this.$url.artical.getAll)
                this.articals = (res && res.data && res.data.data) || []
            },

        },
    }
</script>

<style lang="less" scoped>
    .default_artical {}
</style>