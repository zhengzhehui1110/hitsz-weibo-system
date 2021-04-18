<template>
    <PageContainer>
        <!-- <div>search</div> -->
        <mu-container>
            <mu-text-field v-model="searchWord" full-width :max-length="30" action-icon="search" :action-click="search"
                placeholder="输入关键词">
            </mu-text-field>
        </mu-container>
        <ArticalCard v-for="item in articals" :key="item._id" :artical="item"></ArticalCard>
    </PageContainer>
</template>

<script>
    export default {
        name: 'Search',
        props: {},
        data() {
            return {
                searchWord: '',
                articals: [],
            }
        },
        computed: {},
        created() {},
        methods: {
            async search() {
                let res = await this.axios.post(this.$url.artical.search, {
                    exp: this.searchWord
                })
                this.articals = (res && res.data && res.data.data) || []
                this.searchWord = ''
            },
        },
    }
</script>

<style lang="less" scoped>

</style>