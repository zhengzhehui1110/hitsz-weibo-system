<template>
    <!-- <div> -->
    <mu-list-item :ripple="false" slot="nested">
        <mu-list-item-content>
            <mu-list-item-title>{{comment.authorName}}</mu-list-item-title>
            <mu-list-item-sub-title style="color: rgba(0, 0, 0, .7)">回复 {{comment.fatherCommentAuthorName}}
            </mu-list-item-sub-title>
            {{comment.text}}
        </mu-list-item-content>
        <mu-list-item-action style="float:right">
            <mu-list-item-after-text>{{dateFormat(comment.postTime, 'MM-dd')}}</mu-list-item-after-text>
            <!-- <mu-checkbox color="yellow700" uncheck-icon="star_border" checked-icon="star">
            </mu-checkbox> -->
        </mu-list-item-action>
    </mu-list-item>

    <!-- </div> -->
</template>

<script>
    export default {
        props: {
            comment: {
                type: Object,
                require: true,
            },
            articalId: {
                type: String,
                require: true
            }
        },
        data() {
            return {}
        },
        methods: {
            dateFormat(date, fmt) {
                return new Date(date).format(fmt)
            }
        }
    }
</script>