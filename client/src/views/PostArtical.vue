<template>
    <div>
        <mu-scale-transition>
            <mu-container v-if="show">
                <mu-form ref="artical" class="content" :model="artical">
                    <mu-card>
                        <mu-card-header :title="userInfo.userName" :sub-title="'发布动态'">
                            <mu-avatar slot="avatar">
                                <img v-if="userInfo.avatar" :src="userInfo.avatar">
                                <mu-icon v-else value="face"></mu-icon>
                            </mu-avatar>
                        </mu-card-header>
                        <mu-card-media title="" sub-title="">
                            <!-- <img src=""> -->
                            <mu-paper class="default_pic"></mu-paper>
                        </mu-card-media>
                        <mu-card-text>
                            <mu-form-item prop="text" :rules="rules.text">
                                <mu-text-field v-model="artical.text" placeholder="说点什么吧" full-width multi-line
                                    :rows="8" :max-length="140">
                                </mu-text-field>
                            </mu-form-item>
                        </mu-card-text>
                        <mu-card-actions>
                            <mu-button flat @click="clearForm">重置</mu-button>
                            <mu-button flat style="float:right" @click="submit">发布</mu-button>
                        </mu-card-actions>
                    </mu-card>
                </mu-form>
            </mu-container>

        </mu-scale-transition>

    </div>
</template>

<script>
    // import regs from '@/global/regs'

    export default {
        name: 'PostArtical',
        components: {},
        mixins: [],
        props: {},
        data() {
            return {
                show: false,
                artical: {
                    text: '',
                    pic: '',
                    authorId: '',
                    authorName: '',
                    avatar: '',
                },
                rules: { // 校验规则
                    text: [{
                        validate: (val) => !!val,
                        message: '内容不能为空',
                    }, ],
                }
            }
        },
        computed: {
            userInfo() {
                return this.$user.getInfo()
            }
        },
        created() {
            setTimeout(() => {
                this.show = !this.show
            }, 300)
            this.artical.authorId = this.userInfo._id
            this.artical.authorName = this.userInfo.userName
            this.artical.avatar = this.userInfo.avatar
        },
        methods: {
            async submit() { // 发布一条动态
                if (!await this.$refs.artical.validate()) return
                this.artical.postTime = Date.now()
                let res = await this.axios.post(this.$url.artical.post, this.artical)
                if (!res) return
                this.clearForm()
                this.$refs.artical && this.$refs.artical.clear()
                this.$toast.success('发布成功')

            },
            clearForm() {
                this.artical.text = ''
                this.artical.pic = ''
            }
        },
    }
</script>

<style lang="less" scoped>
    .default_pic {
        height: 45vw;
        // height: 100%;
        background-color: rgb(216, 216, 216);
    }
</style>