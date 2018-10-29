<template>
    <div class="p-2 box-content rounded">
        <div class="mb-2 rounded">
            <form>
                <div class="form-group">
                    <p v-if="error.message">
                        Error: {{error.message}}
                    </p>
                </div>
                <div class="form-group">
                    <textarea
                        class="col-sm-12 form-control"
                        rows="5"
                        placeholder="Content"
                        v-model="comment.content"
                        required="true"
                    ></textarea>
                    <small class="col-sm-4" v-if="error.list.content">{{error.list.content[0]}}</small>
                </div>
                <div class="form-group">
                    <button
                        type="submit"
                        class="btn btn-dark btn-sm bg-dark mt-2"
                        v-text="loading ? 'Loading...' : 'Save'"
                        @click.prevent="save()"
                    ></button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import CommentService from "@/services/CommentService"

export default {
    name: "CommentForm",
    props: {
        id: {
            // id of commented news post or similar
            type: Number,
            required: true
        },
        type: {
            // 'news', 'blog', 'forum'
            type: String,
            required: true,
            validator: function (value) {
                // The value must match one of these strings
                return ['article', 'forum', 'blog'].indexOf(value) !== -1
            }
        }
    },
    data: function() {
        return {
            comment: {},
            error: {
                message: null,
                list: []
            },
            loading: false
        }
    },
    methods: {
        save() {
            this.loading = true

            CommentService.createCommentOnArticle(this.id, this.comment)
                .then(response => {
                    console.log("Success!")
                    this.error.message = null;
                    this.error.list = [];
                    this.comment = {};
                    this.$emit('saved');
                })
                .catch(error => {
                    this.error.message = error.response.data.message;
                    if (error.response.data.errors) {
                        this.error.list = error.response.data.errors;
                    }
                })
                .finally(() => (this.loading = false))
        }
    },
    computed: {}
}
</script>

<style scoped lang="scss">
</style>
