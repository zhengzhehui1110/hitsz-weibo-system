<template>
    <div>
        <!-- {{artical}} -->
        <mu-card class="artical_card">
            <mu-card-header :title="artical.authorName" :sub-title="artical.postTime">
                <mu-avatar slot="avatar" @click.stop="toUserPage">
                    <img v-if="artical.avatar" :src="artical.avatar">
                    <mu-icon v-else value="face"></mu-icon>
                </mu-avatar>
            </mu-card-header>
            <mu-card-text>
                {{artical.text}}
            </mu-card-text>
            <mu-card-actions v-if="isActionAllow">
                <mu-button icon small color="gray">
                    <mu-icon value="thumb_up" @click.stop="like()"></mu-icon>
                </mu-button>
                <mu-button icon small color="gray">
                    <mu-icon value="thumb_down" @click.stop="like()"></mu-icon>
                </mu-button>
                <mu-button flat style="float:right" @click="showDetail=!showDetail">{{showDetail?'收起':'查看'}}评论
                </mu-button>
            </mu-card-actions>
            <mu-container>
                <CommentWrapper :showDetail="showDetail"></CommentWrapper>
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
            }
        },
        data() {
            return {
                showDetail: false
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
            like(isLike) {
                console.log('like:', isLike);
            }

        },
    })
</script>

<style lang="less" scoped>
    .artical_card {
        margin: 10px;
    }
</style>