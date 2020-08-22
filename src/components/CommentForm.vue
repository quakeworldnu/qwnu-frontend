<template>
    <div>
        <form id="comment-form">
            <div class="form-group">
                <p v-if="error.message">Error: {{ error.message }}</p>
            </div>
            <div class="form-group">
                <textarea
                    class="col-sm-12 form-control"
                    rows="5"
                    placeholder="Content"
                    v-model="editedComment.content"
                    required="true"
                    @keydown.enter="event => submitIfCtrlEnter(event)"
                ></textarea>
                <small class="col-sm-4" v-if="error.list.content">{{
                    error.list.content[0]
                }}</small>
            </div>
            <div class="form-group">
                <button
                    type="submit"
                    class="btn btn-dark btn-sm mt-2"
                    v-text="loading ? 'Saving...' : 'Save'"
                    @click.prevent="save()"
                ></button>
                <button
                    v-if="!editedComment.isNew"
                    type="button"
                    class="btn btn-secondary btn-sm mt-2 ml-2"
                    v-text="'Cancel'"
                    @click.prevent="cancel()"
                ></button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import Comment from "@/models/Comment";
import CommentService from "@/services/CommentService";

export default {
    name: "CommentForm",
    props: {
        id: {
            // id of commented news post or similar
            type: Number,
            required: false
        },
        type: {
            type: String,
            required: false,
            validator: function(value) {
                // The value must match one of these strings
                return (
                    ["article", "config", "forum", "blogPost"].indexOf(
                        value
                    ) !== -1
                );
            }
        },
        comment: {
            type: Comment,
            required: false
        }
    },
    data() {
        return {
            editedComment: this.comment,
            error: {
                message: null,
                list: []
            },
            loading: false,
            backup: null
        };
    },
    mounted() {
        Object.assign({}, this.comment);
    },
    methods: {
        cancel() {
            Object.assign(this.editedComment, this.backup);
            this.editedComment._isEditing = false;
        },
        getAction() {
            let action;
            if (!this.editedComment.isNew) {
                action = CommentService.updateComment(
                    this.editedComment.id,
                    this.editedComment
                );
            } else if (this.type === "article") {
                action = CommentService.createCommentOnArticle(
                    this.id,
                    this.editedComment
                );
            } else if (this.type === "blogPost") {
                action = CommentService.createCommentOnBlogPost(
                    this.id,
                    this.editedComment
                );
            } else if (this.type === "config") {
                action = CommentService.createCommentOnConfig(
                    this.id,
                    this.editedComment
                );
            } else if (this.type === "forum") {
                action = CommentService.createCommentOnForumTopic(
                    this.id,
                    this.editedComment
                );
            }
            return action;
        },
        save() {
            this.loading = true;
            let action = this.getAction();

            action
                .then(response => {
                    this.error.message = null;
                    this.error.list = [];
                    this.$emit("saved", this.editedComment);
                    this.editedComment = new Comment({});
                })
                .catch(error => {
                    this.error.message = error.response.data.message;
                    if (error.response.data.errors) {
                        this.error.list = error.response.data.errors;
                    }
                })
                .finally(() => (this.loading = false));
        },
        submitIfCtrlEnter(event) {
            if (event.ctrlKey) {
                this.save();
            }
        }
    },
    computed: {}
};
</script>

<style scoped lang="scss"></style>
