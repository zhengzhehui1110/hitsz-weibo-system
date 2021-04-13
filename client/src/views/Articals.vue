<template>
    <div>
        <mu-container>
            <!-- <h1>articals</h1> -->
        </mu-container>
        <mu-scale-transition v-for="item in articals" :key="item._id">
            <ArticalCard v-show="show" :artical="item"></ArticalCard>

        </mu-scale-transition>
        <!-- <ArticalCard v-for="item in articals" :key="item._id" :artical="item"></ArticalCard> -->
    </div>
</template>

<script>
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
        computed: {},
        async created() {
            await this.getArticals()
            setTimeout(() => {
                this.show = !this.show
            }, 300)
        },
        methods: {
            async getArticals() {
                let userInfo = this.$user.getInfo()
                console.log('查询用户文章：', userInfo);
                let res = await this.axios.post(this.$url.artical.getArticalsByUser, userInfo)
                this.articals = (res && res.data && res.data.data) || []
            },
        },
    }
</script>

<style lang="less" scoped>

</style>