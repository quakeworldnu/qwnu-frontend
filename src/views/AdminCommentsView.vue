<template>
    <div class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Administrate comments</div>
        <div class="box-body">
            <div class="box-content table-responsive mb-2">
                <table class="table">
                    <thead>
                        <tr class="d-flex">
                            <th class="col-1">
                                <sort-button
                                    field="id"
                                    :pagination="pagination"
                                    @changed="getComments()"
                                >ID</sort-button>
                            </th>
                            <th class="col-3">
                                <sort-button
                                    field="create_time"
                                    :pagination="pagination"
                                    @changed="getComments()"
                                >Date</sort-button>
                            </th>
                            <th class="col-2">
                                <sort-button
                                    field="author.username"
                                    :pagination="pagination"
                                    @changed="getComments()"
                                >Author</sort-button>
                            </th>
                            <th class="col-5">
                                <sort-button
                                    field="type"
                                    :pagination="pagination"
                                    @changed="getComments()"
                                >Type</sort-button>
                            </th>
                            <th class="col-1">
                                <sort-button
                                    field="status"
                                    :pagination="pagination"
                                    @changed="getComments()"
                                >Ok?</sort-button>
                            </th>
                        </tr>
                    </thead>
                    <tbody v-for="comment in comments" :key="comment.id">
                        <tr class="comment-row d-flex">
                            <td class="col-1">{{comment.id}}</td>
                            <td class="col-3">{{comment.create_time | formatUnixTimestamp}}</td>
                            <td class="col-2">{{comment.author.username}}</td>
                            <td class="col-5">{{comment.type}} / {{getCommentableTitle(comment)}}</td>
                            <td class="col-1">
                                <router-link :to="{name: 'adminEditComment', params: {id: comment.id}}" v-if="$can('edit_comment')" title="Edit comment">
                                    <i class="fas fa-pen mr-2"></i>
                                </router-link>
                                <i class="fas" :class="getStatusIcon(comment.status)"></i>
                            </td>
                        </tr>
                        <tr class="d-flex">
                            <td class="col-12" v-html="bbCode(comment.content)"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="bg-light p-2 rounded">
                <pagination
                    v-model="pagination.page"
                    :records="pagination.totalRecords"
                    :per-page="pagination.pageSize"
                    @paginate="onPageChange"
                ></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import CommentService from "@/services/CommentService"
import { parseBbCode } from "@/helpers/BbCode"

export default {
    name: "adminComments",
    data: function() {
        return {
            comments: [],
            pagination: {
                page: 1,
                sort: "create_time",
                order: "desc",
                pageSize: 1,
                totalRecords: 0
            }
        }
    },
    mounted() {
        this.getComments()
    },
    methods: {
        bbCode(value) {
            return parseBbCode(value)
        },
        onPageChange() {
            this.getComments()
        },
        getComments() {
            CommentService.getComments(this.pagination)
                .then(response => {
                    this.comments = response.data.data
                    this.pagination.totalRecords = response.data.total
                    this.pagination.pageSize = response.data.per_page
                })
                .catch(error => {
                    console.log("Error: Could not fetch comments.", error)
                })
        },
        getCommentableTitle(comment) {
            var title;
            switch (comment.type) {
                case "news":
                    title = comment.commentable.title;
                    break;
                case "forum":
                    title = comment.commentable.name;
                    break;
                default:
                    title = "Undefined";
            }
            if (title.length > 30) {
                title = title.substring(0, 30) + '...';
            }
            return title;
        },
        getStatusIcon(status) {
            if (status === 1) {
                return "fa-question text-dark" // Pending
            } else if (status === 2) {
                return "fa-check text-success" // Approved
            } else if (status === 3) {
                return "fa-times text-danger" // Disapproved
            } else {
                return "Invalid value?"
            }
        }
    }
}
</script>

<style scoped lang="scss">
.comment-row {
    background-color: #dad0b0;
    color: #75611c;
}
</style>