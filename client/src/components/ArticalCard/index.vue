<template>
    <div>
        <!-- {{artical}} -->
        <mu-card class="artical_card">
            <mu-card-header :title="artical.authorName" :sub-title="artical.postTime">
                <mu-avatar slot="avatar">
                    <img v-if="artical.avatar" :src="artical.avatar">
                    <mu-icon v-else value="face"></mu-icon>
                </mu-avatar>
            </mu-card-header>
            <mu-card-text>
                {{artical.text}}
            </mu-card-text>
            <mu-card-actions>
                <mu-button flat>赞</mu-button>
                <mu-button flat>踩</mu-button>
                <mu-button flat style="float:right">评论</mu-button>
            </mu-card-actions>
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
            }
        },
        computed: {

        }
    })
</script>

<style lang="less" scoped>
    .artical_card {
        margin: 10px;
    }
</style>