<template>
    <mu-container class="page">
        <mu-tabs :value.sync="isLogin" inverse color="primary" indicator-color="primary" text-color="rgba(0, 0, 0, .54)"
            center full-width @change="clearFormMsg">
            <mu-tab>登录</mu-tab>
            <mu-tab>注册</mu-tab>
        </mu-tabs>

        <mu-form ref="login" class="content login flex_col" v-if="!isLogin" :model="loginData">
            <div class="title">登录</div>
            <mu-form-item prop="user" :rules="rules.loginIdRules" label="用户" label-position="left">
                <mu-text-field v-model="loginData.user" placeholder="请输入邮箱/手机号" full-width></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="password" :rules="rules.passwordRules" label="密码" label-position="left">
                <mu-text-field v-model="loginData.password" placeholder="请输入密码" full-width
                    :action-icon="!pswordShow ? 'visibility_off' : 'visibility'" :action-click="passwordToggle"
                    :type="pswordShow ? 'text' : 'password'">
                </mu-text-field>
            </mu-form-item>
            <mu-form-item>
                <mu-button color="primary" class="btn" @click="submitLogin">登录</mu-button>
            </mu-form-item>
        </mu-form>

        <mu-form ref="sign_up" class="content login flex_col" v-if="isLogin" :model="signUpData">
            <div class="title">注册</div>
            <mu-form-item prop="userName" :rules="rules.nameRules" label="昵称" label-position="left">
                <mu-text-field v-model="signUpData.userName" placeholder="请输入昵称" :max-length="10" full-width>
                </mu-text-field>
            </mu-form-item>
            <mu-form-item prop="email" :rules="rules.emailRules" label="邮箱" label-position="left">
                <mu-text-field v-model="signUpData.email" placeholder="请输入邮箱" full-width></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="mobile" :rules="rules.mobileRules" label="手机" label-position="left">
                <mu-text-field v-model="signUpData.mobile" placeholder="请输入手机号" full-width></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="password" :rules="rules.passwordRules" label="密码" label-position="left">
                <mu-text-field v-model="signUpData.password" placeholder="请输入密码" full-width
                    :action-icon="!pswordShow ? 'visibility_off' : 'visibility'" :action-click="passwordToggle"
                    :type="pswordShow ? 'text' : 'password'">
                </mu-text-field>
            </mu-form-item>
            <mu-form-item>
                <mu-button color="primary" class="btn" @click="submitSignUp">注册</mu-button>
            </mu-form-item>
        </mu-form>
    </mu-container>
</template>

<script>
    import regs from '@/global/regs'
    export default {
        name: 'Login',
        components: {},
        mixins: [],
        props: {},
        data() {
            return {
                isLogin: 0, // 登录：0；注册：1
                loginData: {
                    user: '', // 邮箱或手机号
                    password: '',
                },
                signUpData: {
                    userName: '',
                    email: '',
                    mobile: '',
                    password: '',
                },
                pswordShow: false, // 是否显示密码
                rules: { // 校验规则
                    loginIdRules: [{
                            validate: (val) => !!val,
                            message: '请输入邮箱或手机号'
                        },
                        {
                            validate: (val) => {
                                return regs.email.test(val) || regs.mobile.test(val)
                            },
                            message: '请输入正确的邮箱或手机号'
                        },
                    ],
                    nameRules: [{
                            validate: (val) => !!val,
                            message: '请输入昵称'
                        },
                        {
                            validate: (val) => {
                                return regs.userName.test(val)
                            },
                            message: '昵称只能包含数字、字母、汉字、下划线'
                        },
                    ],
                    emailRules: [{
                            validate: (val) => !!val,
                            message: '请输入邮箱'
                        },
                        {
                            validate: (val) => {
                                return regs.email.test(val)
                            },
                            message: '请输入正确的邮箱'
                        },
                    ],
                    mobileRules: [{
                            validate: (val) => !!val,
                            message: '请输入手机号'
                        },
                        {
                            validate: (val) => {
                                return regs.mobile.test(val)
                            },
                            message: '请输入正确的手机号'
                        },
                    ],
                    passwordRules: [{
                            validate: (val) => !!val,
                            message: '请输入密码'
                        },
                        {
                            validate: (val) => {
                                return regs.password.test(val)
                            },
                            message: '密码只能包含数字、字母'
                        },
                        {
                            validate: (val) => {
                                return val && val.length >= 8 && val.length <= 20
                            },
                            message: '密码长度为8~20'
                        },
                    ],
                }
            }
        },
        computed: {},
        created() {
            // test
            // console.log(sessionStorage);
        },
        methods: {
            passwordToggle() { // 切换密码显示
                this.pswordShow = !this.pswordShow
            },
            clearFormMsg() { // 切换登录和注册时，清除输入框报错提示
                this.$refs.login && this.$refs.login.clear()
                this.$refs.sign_up && this.$refs.sign_up.clear()
            },
            async submitLogin() { // 提交登录
                if (!await this.$refs.login.validate()) return
                // console.log('check log in', check);
                let res = await this.axios.post(this.$url.user.logIn, this.loginData)
                if (!res) return
                // 登陆成功，跳转到主页
                this.$user.setInfo(res.data.data) // 用户信息存储在sessionStorage
                this.clearFormMsg()
                this.$router.push({ // 跳转到首页，默认先展示全部动态页
                    path: 'home/articals'
                })
            },
            async submitSignUp() { // 提交注册
                if (!await this.$refs.sign_up.validate()) return
                console.log('check sign up');
                // await this.$httpHandler.post(this.$url.user.signUp, this.signUpData)
                if (!await this.axios.post(this.$url.user.signUp, this.signUpData)) return
                this.$toast.success('注册成功')
                this.clearFormMsg()
                this.signUpData = {
                    userName: '',
                    email: '',
                    mobile: '',
                    password: '',
                }
                this.isLogin = 0
            },
        },

    }
</script>

<style lang="less" scoped>
    .mu-form-item {
        width: 100%;
    }

    .mu-demo-form {
        width: 100%;
    }

    .page {
        height: 100vh;
        width: 100%;
        padding: 0;
        position: relative;
    }

    .content {
        position: absolute;
        width: 80%;
        height: 65%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;

        .title {
            font-size: 30px;
            margin: 20px;
        }

        .btn {
            width: 100%;
            margin: 30px 0;
        }
    }
</style>