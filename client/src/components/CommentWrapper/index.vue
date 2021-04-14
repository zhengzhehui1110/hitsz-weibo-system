<template>
    <div class="comment_wrapper">
        <mu-divider></mu-divider>
        <mu-text-field v-model="postComment.text" placeholder="留下评论吧~" solo multi-line full-width :rowsMax="8"
            :max-length="140" action-icon="done">
        </mu-text-field>
        <div v-if="showDetail">comment...</div>
    </div>
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
            showDetail: {
                type: Boolean,
                require: true
            }
        },
        data() {
            return {
                postComment: { // 发表评论
                    text: '',
                }
            }
        },
        computed: {

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

        },
    })
</script>

<style lang="less" scoped>
    .comment_wrapper {
        padding: 5px;
    }
</style>