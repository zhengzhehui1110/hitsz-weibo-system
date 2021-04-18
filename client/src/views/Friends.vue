<template>
    <PageContainer>
        <!-- <div>
            firends
        </div> -->
        <!-- <div v-for="item in followees" :key="item._id">
            {{item}}
        </div> -->
        <!-- {{followees}} -->
        <mu-list textline="two-line">
            <mu-sub-header>我关注的</mu-sub-header>
            <mu-list-item avatar button :ripple="false" v-for="item in followees" :key="item._id"
                @click="toUserPage(item._id)">
                <mu-list-item-action>
                    <mu-avatar>
                        <img :src="item.avatar">
                    </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-content>
                    <mu-list-item-title>{{item.userName}}</mu-list-item-title>
                    <mu-list-item-sub-title>{{item.slogan}}</mu-list-item-sub-title>
                </mu-list-item-content>
                <!-- <mu-list-item-action>
                    <mu-button icon>
                        <mu-icon value="male"></mu-icon>
                    </mu-button>
                </mu-list-item-action> -->
            </mu-list-item>
        </mu-list>

        <mu-list textline="two-line">
            <mu-sub-header>关注我的</mu-sub-header>
            <mu-list-item avatar button :ripple="false" v-for="item in followers" :key="item._id"
                @click="toUserPage(item._id)">
                <mu-list-item-action>
                    <mu-avatar>
                        <img :src="item.avatar">
                    </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-content>
                    <mu-list-item-title>{{item.userName}}</mu-list-item-title>
                    <mu-list-item-sub-title>{{item.slogan}}</mu-list-item-sub-title>
                </mu-list-item-content>
                <!-- <mu-list-item-action>
                    <mu-button icon>
                        <mu-icon value="male"></mu-icon>
                    </mu-button>
                </mu-list-item-action> -->
            </mu-list-item>
        </mu-list>
    </PageContainer>

</template>

<script>
    // const DEFAULT_ARTICAL = { // 首页没有动态时的显示内容
    //     text: '这里空空如也~',
    //     avatar: '',
    //     authorName: '一个好人',
    //     postTime: '刚刚',
    //     pic: '',
    // }
    export default ({
        name: 'Friends',
        components: {},
        mixins: [],
        props: {},
        data() {
            return {
                followees: [],
                followers: [],
                show: false,
                userInfo: {},

            }
        },
        computed: {

            // userInfo() {
            //     return (this.$route.params._id && this.$route.params) || this.$user.getInfo()
            // }
            userId() { // 用于监视页面查询参数是否有变化以便强制刷新
                return this.$route.query._id
            }
        },
        async created() {
            await this.getFriends()
        },
        methods: {
            async getFriends() {
                let res = await this.axios.post(this.$url.follow.queryMyFollowee, {
                    _id: this.$user.getInfo()._id
                })
                this.followees = (res.data && res.data.data) || []
                res = await this.axios.post(this.$url.follow.queryMyFollower, {
                    _id: this.$user.getInfo()._id
                })
                this.followers = (res.data && res.data.data) || []

            },
            toUserPage(id) {
                // 跳转到某个用户的个人主页
                this.$router.push({
                    path: '/home/person',
                    query: {
                        _id: id
                    }
                })
            },
        },
        watch: {
            // userId: {
            //     async handler(nv, ov) {
            //         console.log('change');
            //         if (nv != ov) {
            //             await this.getArticals()
            //         }
            //     },
            //     deep: true
            // },

        },

    })
</script>

<style lang="less" scoped>

</style>