<template>
    <mu-container class="comment_wrapper">
        <!-- <mu-divider></mu-divider>
        <mu-text-field v-model="postComment.text" placeholder="留下评论吧~" solo multi-line full-width :rowsMax="8"
            :max-length="140" action-icon="done">
        </mu-text-field> -->
        <div>
            <FatherComment v-for="item in comments" :key="item._id" :comment="item" @updateComments="queryComments">
            </FatherComment>
        </div>
        <div v-if="!comments.length" class="default_comment">
            快来发布第一条评论吧~
        </div>
    </mu-container>
</template>

<script>
    export default ({
        name: 'CommentWrapper',
        components: {},
        mixins: [],
        props: {
            aiticalId: {
                type: String,
                require: true
            },

        },
        data() {
            return {
                postComment: { // 发表评论
                    text: '',
                },
                comments: []
            }
        },
        computed: {

        },
        async created() {
            await this.queryComments()
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
            async queryComments() {
                // test comment
                let res = await this.axios.post(this.$url.comment.queryByArtical, {
                    _id: this.aiticalId
                })
                this.comments = (res.data && res.data.data) || []
            }

        },
    })
</script>

<style lang="less" scoped>
    .comment_wrapper {
        padding: 5px;
    }

    .default_comment {
        color: rgb(202, 202, 202);
    }
</style>