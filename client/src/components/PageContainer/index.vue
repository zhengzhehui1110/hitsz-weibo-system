<template>
    <div class="page">
        <mu-appbar class="app_bar" color="primary" :title="userName" z-depth="5">

            <mu-button flat icon slot="right" @click.stop="openDrawer=!openDrawer">
                <mu-icon value="menu"></mu-icon>
            </mu-button>

        </mu-appbar>

        <mu-drawer :open.sync="openDrawer" :docked="false" class="index_drawer">

            <mu-list>
                <mu-list-item button @click="toPage('Friends')">
                    <mu-list-item-action>
                        <mu-icon value="group"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>好友</mu-list-item-title>
                </mu-list-item>

                <mu-list-item button @click="toPage('Search')">
                    <mu-list-item-action>
                        <mu-icon value="search"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>搜索</mu-list-item-title>
                </mu-list-item>

                <mu-list-item button>
                    <mu-list-item-action>
                        <mu-icon value="settings"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>设置</mu-list-item-title>
                </mu-list-item>

                <mu-list-item button @click="quit">
                    <mu-list-item-action>
                        <mu-icon value="exit_to_app"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>退出</mu-list-item-title>
                </mu-list-item>

            </mu-list>
        </mu-drawer>
        <div class="blank"></div>
        <slot class="content"></slot>
    </div>
</template>

<script>
    export default {
        name: 'PageContainer',
        data() {
            return {
                openDrawer: false
            }
        },
        computed: {
            userName() {
                return this.$user.getInfo().userName
            },
        },
        methods: {
            async quit() { // 退出登录
                // console.log(this.$confirm)
                await this.$confirm('确认退出？', 'Confirm').then(async ({
                    result,
                }) => {
                    // console.log(result);
                    result &&
                        this.axios.post(this.$url.user.exit, this.$user.getInfo())
                    result && this.$router.replace({
                        name: 'Login'
                    })
                    this.$user.setInfo('') // 退出登录后清楚本地用户信息

                })

            },
            toPage(pageName) {
                this.$router.push({
                    name: pageName
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    .page {
        height: 100%;
        overflow: auto;
    }

    .app_bar {
        width: 100%;
        position: fixed;
        z-index: 10;
        opacity: 0.9;
    }

    .mu-icon {
        margin: 0 5px;
    }

    .blank {
        height: 56px;
        opacity: 0;
        // margin: 0 0 10px;
    }

    .index_drawer {
        opacity: 0.95;
    }
</style>