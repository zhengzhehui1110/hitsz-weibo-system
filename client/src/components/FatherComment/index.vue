<template>
    <div>
        <!-- {{comment}} -->
        <mu-list textline="two-line">
            <mu-list-item nested open :ripple="false" button>

                <mu-list-item-content @click.stop="openInput(comment.authorName)">
                    <mu-list-item-title @click.stop="toUserPage(comment.authorId)">{{comment.authorName}}
                    </mu-list-item-title>
                    {{comment.text}}
                </mu-list-item-content>
                <mu-list-item-action>
                    <mu-list-item-after-text>{{dateFormat(comment.postTime, 'MM-dd')}}</mu-list-item-after-text>
                    <mu-checkbox color="yellow700" uncheck-icon="star_border" checked-icon="star">
                    </mu-checkbox>
                </mu-list-item-action>
                <!-- 添加子评论 -->
                <mu-list-item :ripple="false" slot="nested" v-if="showInput">
                    <mu-text-field v-model="postComment.text" placeholder="留下回复吧~" solo multi-line full-width
                        :rowsMax="8" :max-length="30" action-icon="done" :action-click="post"
                        :prefix="'回复'+postComment.fatherCommentAuthorName">
                    </mu-text-field>
                </mu-list-item>
                <!-- 以下是子评论 -->
                <mu-list-item :ripple="false" slot="nested" v-for="item in comment.children" :key="item._id">
                    <mu-list-item-content @click.stop="openInput(item.authorName)">
                        <mu-list-item-title @click.stop="toUserPage(item.authorId)">{{item.authorName}}
                        </mu-list-item-title>
                        <mu-list-item-sub-title>回复 {{item.fatherCommentAuthorName}}
                        </mu-list-item-sub-title>
                        {{item.text}}
                    </mu-list-item-content>
                    <mu-list-item-action style="float:right">
                        <mu-list-item-after-text>{{dateFormat(item.postTime, 'MM-dd')}}</mu-list-item-after-text>
                        <mu-checkbox color="yellow700" uncheck-icon="star_border" checked-icon="star">
                        </mu-checkbox>
                    </mu-list-item-action>
                </mu-list-item>



            </mu-list-item>
            <!-- <mu-divider></mu-divider> -->



        </mu-list>
    </div>
</template>

<script>
    export default {
        props: {
            comment: {
                type: Object,
                require: true,
            }
        },
        data() {
            return {
                showInput: false,
                postComment: { // 发表子评论
                    text: '',
                    authorId: this.$user.getInfo()._id,
                    authorName: this.$user.getInfo().userName,
                    postTime: '',
                    articalId: this.comment.articalId,
                    fatherCommentId: this.comment._id,
                    fatherCommentAuthorName: '',
                }
            }
        },
        methods: {
            dateFormat(date, fmt) { // 日期格式化
                return new Date(date).format(fmt)
            },
            async post() { // 发表评论（不是回复）
                this.postComment.postTime = Date.now()
                // this.postComment.fatherCommentAuthorName = fatherCommentAuthorName || ''
                console.log('发表回复：', this.postComment);
                await this.axios.post(this.$url.comment.post, this.postComment)
                this.postComment.text = ''
                this.$emit('updateComments') // 触发事件使该动态下所有评论更新
            },
            openInput(replyToName) {
                console.log('click');
                // 如果两次点击同一条评论或第一次打开，则关掉或打开回复框；如果两次点击不一样的评论，则只需改变回复者的名称
                if (!this.postComment.fatherCommentAuthorName || replyToName === this.postComment
                    .fatherCommentAuthorName) this.showInput = !this.showInput

                this.postComment.fatherCommentAuthorName = this.showInput ? replyToName : ''
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
    }
</script>

<style lang="less" scoped>

</style>