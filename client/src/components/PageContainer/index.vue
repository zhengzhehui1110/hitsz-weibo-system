<template>
    <div class="page">
        <mu-appbar class="app_bar" color="primary" title="微小博" z-depth="5">
            <!-- <mu-button icon slot="left">
                <mu-icon value="menu"></mu-icon>
            </mu-button> -->
            <!-- <span slot="left">微小博</span> -->
            <mu-menu slot="right">
                <mu-button flat icon>
                    <mu-icon value="menu"></mu-icon>
                </mu-button>
                <mu-list slot="content">
                    <mu-list-item button>
                        <mu-icon value="search" color="gray"></mu-icon>
                        <mu-list-item-content>
                            <mu-list-item-title @click="toSearchPage">搜索</mu-list-item-title>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-list-item button @click="quit">
                        <mu-icon value="exit_to_app" color="gray"></mu-icon>
                        <mu-list-item-content>
                            <mu-list-item-title>退出</mu-list-item-title>
                        </mu-list-item-content>
                    </mu-list-item>
                </mu-list>
            </mu-menu>
        </mu-appbar>
        <div class="blank"></div>
        <slot class="content"></slot>
    </div>
</template>

<script>
    export default {
        name: 'PageContainer',
        data() {
            return {}
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
            toSearchPage() {},
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
    }

    .mu-icon {
        margin: 0 5px;
    }

    .blank {
        height: 56px;
        opacity: 0;
        margin: 0 0 10px;
    }
</style>