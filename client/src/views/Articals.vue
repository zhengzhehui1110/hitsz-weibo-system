<template>
    <div>
        <h1>articals</h1>
        <div v-for="item in articals" :key="item._id">
            {{item}}
        </div>
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
                articals: []
            }
        },
        computed: {},
        async created() {
            await this.getArticals()
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