<template>
    <div>
        <!-- {{artical._id}} -->
        <mu-card class="artical_card">
            <mu-card-header :title="artical.authorName" :sub-title="dateFormat(artical.postTime, 'yyyy-MM-dd hh:mm')">
                <mu-avatar slot="avatar" @click.stop="toUserPage">
                    <img v-if="artical.avatar" :src="artical.avatar">
                    <mu-icon v-else value="face"></mu-icon>
                </mu-avatar>
            </mu-card-header>
            <mu-card-text>
                {{artical.text}}
            </mu-card-text>
            <mu-card-actions v-if="isActionAllow">
                <mu-button icon small color="gray" @click.stop="like(true)">
                    <mu-icon value="thumb_up" :color="isLike===true?'primary':''"></mu-icon>
                </mu-button>
                <mu-button icon small color="gray" @click.stop="like(false)">
                    <mu-icon value="thumb_down" :color="isLike===false?'primary':''"></mu-icon>
                </mu-button>
                <mu-button flat style="float:right" @click="showDetail=!showDetail">{{showDetail?'收起':'查看'}}评论
                </mu-button>
            </mu-card-actions>
            <mu-container>
                <mu-divider></mu-divider>
                <!-- 发表评论 -->
                <mu-container class="comment_input_wrapper">
                    <mu-text-field v-model="postComment.text" placeholder="留下评论吧~" solo multi-line full-width
                        :rowsMax="8" :max-length="50" action-icon="done" :action-click="post">
                    </mu-text-field>
                </mu-container>
                <!-- 展示评论 -->
                <CommentWrapper v-if="showDetail" :articalId="artical._id"></CommentWrapper>
                <mu-button style="width:100%" color="primary" flat v-if="showDetail" @click="showDetail=!showDetail">
                    <mu-icon value="expand_less"></mu-icon>
                </mu-button>
            </mu-container>
        </mu-card>

    </div>
</template>

<script>
    export default ({
        name: 'ArticalCard',
        components: {},
        mixins: [],
        props: {
            artical: {
                type: Object,
                require: true
            },
            isActionAllow: {
                type: Boolean,
                default: true,
            },

        },
        data() {
            return {
                showDetail: false,
                postComment: { // 发表评论
                    text: '',
                    authorId: this.$user.getInfo()._id,
                    authorName: this.$user.getInfo().userName,
                    postTime: '',
                    articalId: this.artical._id,
                },
                isLike: undefined,
            }
        },
        computed: {
            userInfo() {
                return this.$user.getInfo()
            }
        },

        async created() {
            await this.queryLike()
        },
        methods: {
            toUserPage() {
                // 跳转到某个用户的个人主页
                this.$router.push({
                    path: '/home/person',
                    query: {
                        _id: this.artical.authorId
                    }
                })
            },
            async like(isLike) {
                console.log('like:', isLike);
                await this.axios.post(this.$url.like.likeArtical, {
                    isLike: isLike,
                    user: this.userInfo._id,
                    artical: this.artical._id
                })
                await this.queryLike()
            },
            async queryLike() { // 查询当前用户是否已点赞或踩当前文章
                let res = await this.axios.post(this.$url.like.query, {
                    user: this.userInfo._id,
                    artical: this.artical._id
                })
                this.isLike = res.data && res.data.data && res.data.data.isLike
                console.log('islike:', this.isLike);
            },
            async post() { // 发表评论（不是回复）
                this.postComment.postTime = Date.now()
                this.postComment.articalId = this.artical._id
                console.log('发表评论：', this.postComment);
                await this.axios.post(this.$url.comment.post, this.postComment)
                this.showDetail = false // 强制刷新评论
                setImmediate(() => {
                    this.showDetail = true
                    this.postComment.text = ''
                })

            },
            dateFormat(date, fmt) { // 日期格式化
                return new Date(date).format(fmt)
            },

        },
    })
</script>

<style lang="less" scoped>
    .artical_card {
        margin: 10px;
    }

    .comment_input_wrapper {
        padding: 10px 0;
    }
</style>