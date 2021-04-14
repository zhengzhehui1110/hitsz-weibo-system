<template>
    <div>
        <mu-paper class="cover_pic_wrap">
            <img class="cover_pic" src="" alt="">
            <mu-paper class="avatar" circle :z-depth="5">
                <!-- <mu-avatar :size="80"></mu-avatar> -->
            </mu-paper>
        </mu-paper>

        <div class="slogan flex_col">
            <span>{{userInfo.slogan}}</span>
        </div>
        <mu-scale-transition>
            <ArticalCard v-if="!articals.length && show" :artical="defaultArtical" :isActionAllow="false"></ArticalCard>
        </mu-scale-transition>
        <mu-scale-transition v-for="item in articals" :key="item._id">
            <ArticalCard v-show="show" :artical="item"></ArticalCard>
        </mu-scale-transition>
    </div>
</template>

<script>
    const DEFAULT_ARTICAL = { // 首页没有动态时的显示内容
        text: '这里空空如也~',
        avatar: '',
        authorName: '一个好人',
        postTime: '刚刚',
        pic: '',
    }
    export default ({
        name: 'Person',
        components: {},
        mixins: [],
        props: {},
        data() {
            return {
                articals: [],
                show: false,
                userInfo: {},

            }
        },
        computed: {
            defaultArtical() {
                return DEFAULT_ARTICAL
            },
            // userInfo() {
            //     return (this.$route.params._id && this.$route.params) || this.$user.getInfo()
            // }
            userId() { // 用于监视页面查询参数是否有变化以便强制刷新
                return this.$route.query._id
            }
        },
        async created() {
            await this.getArticals()
            setTimeout(() => {
                this.show = !this.show
            }, 300)
        },
        methods: {
            async getArticals() {
                let userInfo
                // console.log('test', userInfo.data);

                if (this.$route.query && this.$route.query._id) { // 根据是否传参判断是进入用户本人的主页还是其他用户的主页
                    // 不是用户本人，需要额外请求用户信息
                    userInfo = this.$route.query
                    userInfo = await this.axios.post(this.$url.user.query, {
                        userId: userInfo._id
                    })
                    userInfo = userInfo.data.data
                } else userInfo = this.$user.getInfo()
                // console.log('test query user:');
                console.log('查询用户文章：', userInfo);
                let res = await this.axios.post(this.$url.artical.getArticalsByUser, userInfo)
                this.userInfo = userInfo
                this.articals = (res && res.data && res.data.data) || []
            },
        },
        watch: {
            userId: {
                async handler(nv, ov) {
                    console.log('change');
                    if (nv != ov) {
                        await this.getArticals()
                    }
                },
                deep: true
            },

        },

    })
</script>

<style lang="less" scoped>
    .cover_pic_wrap {
        height: 60vw;
        position: relative;

        .cover_pic {
            height: 100%;
            width: 100%;
        }

        .avatar {
            position: absolute;
            width: 80px;
            height: 80px;
            left: 0;
            right: 0;
            bottom: -30px;
            margin: auto;
            z-index: 3;
            box-shadow: 10px;

        }

        .person_name {
            position: absolute;
            top: 0;
            right: 0;
        }
    }

    .slogan {
        margin: 40px 10vw 0;
        // float: right;
    }
</style>