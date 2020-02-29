<template>
    <div v-if="comment" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Administrate comment</div>
        <div class="box-body">
            <div class="box-content">
                <div class="box-content-body">
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Author</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="Author"
                                v-model="comment.author.username"
                                disabled="true"
                                required="true"
                            >
                            <small class="col-sm-4" v-if="error.list.author_id">{{error.list.author_id[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Created date</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="Created date"
                                :value="comment.create_time | formatTimestamp"
                                disabled="true"
                                required="true"
                            >
                            <small class="col-sm-4" v-if="error.list.create_time">{{error.list.create_time[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Updated date</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="Created date"
                                :value="comment.update_time | formatTimestamp"
                                disabled="true"
                                required="true"
                            >
                            <small class="col-sm-4" v-if="error.list.update_time">{{error.list.update_time[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Content</label>
                            <textarea
                                class="col-sm-6 form-control form-control-sm"
                                rows="5"
                                placeholder="Content"
                                v-model="comment.content"
                                required="true"
                            ></textarea>
                            <small class="col-sm-4" v-if="error.list.content">{{error.list.content[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Status</label>
                            <select class="col-sm-4 form-control form-control-sm" v-model="comment.status">
                                <option value="1">Pending</option>
                                <option value="2">Approved</option>
                                <option value="3">Deleted</option>
                            </select>
                            <small class="col-sm-4" v-if="error.list.status">{{error.list.status[0]}}</small>
                        </div>

                        <button
                            type="submit"
                            class="btn btn-dark btn-sm bg-dark mt-2"
                            @click.prevent="save()"
                            v-text="loading ? 'Loading...' : 'Save'"
                            :disabled="loading"
                        ></button>
                    </form>
                </div>
                <div class="box-content-footer">&nbsp;
                    <div class="float-right">
                        <confirm-button
                            v-if="!comment.isNew && $can('delete_comment')"
                            icon="fa-trash"
                            text="Really delete this comment?"
                            @confirm="deleteComment()"
                        ></confirm-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommentService from "@/services/CommentService"

export default {
    name: "adminComment",
    props: {
        id: null
    },
    data() {
        return {
            loading: false,
            comment: null,
            error: {
                message: null,
                list: []
            },
            categories: []
        }
    },
    mounted() {
        if (this.id) {
            this.getComment()
        }
    },
    methods: {
        getComment() {
            CommentService.getComment(this.id)
                .then(comment => {
                    this.comment = comment
                })
                .catch(error => {
                    this.$toasted.error('Could not fetch comment');
                    console.log(error);
                })
        },
        save() {
            this.loading = true

            if (this.comment.id) {
                this.updateComment();
            } else {
                this.createComment();
            }
        },
        updateComment() {
            CommentService.updateComment(this.comment.id, this.comment)
                .then(response => {
                    this.$toasted.success('Comment saved');
                })
                .catch(error => {
                    this.$toasted.error('Could not update comment');
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                })
                .finally(() => (this.loading = false))
        },
        createComment() {
            CommentService.createComment(this.comment)
                .then(response => {
                    this.$toasted.success('Comment saved');
                })
                .catch(error => {
                    this.$toasted.error('Could not create comment');
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                })
                .finally(() => (this.loading = false))
        },
        deleteComment() {
            CommentService.deleteComment(this.comment.id)
                .then(response => {
                    this.$toasted.success('Comment deleted');
                    this.$router.push({ path: "/admin/comments" });
                })
                .catch(error => {
                    this.$toasted.error('Could not delete comment');
                    console.log(error);
                })
        }
    },
    computed: {}
}
</script>
