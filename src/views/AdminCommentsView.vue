<template>
    <div class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Administrate comments</div>
        <div class="box-body">
            <div class="box-content mb-2">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr class="d-flex">
                                <th class="col-2">
                                    <sort-button
                                        field="id"
                                        :sorting="sorting"
                                        @changed="getComments()"
                                    >ID</sort-button>
                                </th>
                                <th class="col-3">
                                    <sort-button
                                        field="create_time"
                                        :sorting="sorting"
                                        @changed="getComments()"
                                    >Date</sort-button>
                                </th>
                                <th class="col-2">
                                    <!-- <sort-button
                                        field="author.username"
                                        :sorting="sorting"
                                        @changed="getComments()"
                                    > -->
                                    Author
                                    <!-- </sort-button> -->
                                </th>
                                <th class="col-3">
                                    <sort-button
                                        field="type"
                                        :sorting="sorting"
                                        @changed="getComments()"
                                    >Type</sort-button>
                                </th>
                                <th class="col-2">
                                    <sort-button
                                        field="status"
                                        :sorting="sorting"
                                        @changed="getComments()"
                                    >Ok?</sort-button>
                                </th>
                            </tr>
                        </thead>
                        <tbody v-for="comment in comments" :key="comment.id">
                            <tr class="comment-row d-flex">
                                <td class="col-2">{{comment.id}}</td>
                                <td class="col-3">{{comment.create_time | formatTimestamp}}</td>
                                <td class="col-2">{{comment.author.username}}</td>
                                <td class="col-3">{{comment.type}} / {{getCommentableTitle(comment)}}</td>
                                <td class="col-2">
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
import Pagination from "@/models/Pagination"
import Sorting from "@/models/Sorting"
import { parseBbCode } from "@/helpers/BbCode"

export default {
    name: "adminComments",
    data() {
        return {
            comments: [],
            pagination: new Pagination(),
            sorting: new Sorting({
                sort: "create_time",
                order: "desc"
            })
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
            CommentService.getComments(this.pagination, this.sorting)
                .then(response => {
                    this.comments = response.comments
                    this.pagination = response.pagination
                })
                .catch(error => {
                    console.log("Error: Could not fetch comments.", error)
                })
        },
        getCommentableTitle(comment) {
            if (!comment.commentable) {
                return "Undefined";
            }

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