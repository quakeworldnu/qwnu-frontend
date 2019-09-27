<template>
  <div>
    <div class="box-content mb-2">
      <div class="mb-2 rounded">
        <h2 v-if="header">{{header}}</h2>
        <div v-for="comment in comments" :key="comment.id">
          <div class="comment-date">
            {{comment.create_time | formatUnixTimestamp}}
            by {{comment.author.username}}
          </div>
          <div class="comment-content" v-html="bbCode(comment.content)"></div>
        </div>
        <div v-if="comments.length === 0">
            No comments yet.
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
    <comment-form :type="type" :id="id" @saved="getComments()"></comment-form>
  </div>
</template>

<script>
import CommentForm from "@/components/CommentForm"
import CommentService from "@/services/CommentService"
import { parseBbCode } from "@/helpers/BbCode"

export default {
    name: "CommentList",
    components: {
        CommentForm
    },
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
            validator: function(value) {
                // The value must match one of these strings
                return ["article", "forum", "blogPost"].indexOf(value) !== -1
            }
        },
        header: {
            type: String,
            required: false
        }
    },
    mounted() {
        this.getComments()
    },
    watch: {
        commentedPostProps(value) {
            this.getComments()
        }
    },
    data: function() {
        return {
            comments: [],
            error: {
                message: null,
                list: []
            },
            pagination: {
                page: 1,
                sort: "create_time",
                order: "asc",
                pageSize: 1,
                totalRecords: 0
            },
            loading: false
        }
    },
    methods: {
        bbCode(value) {
            return parseBbCode(value)
        },
        onPageChange() {
            this.getComments()
        },
        getAction() {
            let action
            if (this.type === "article") {
                action = CommentService.getCommentsByArticle(
                    this.id,
                    this.pagination
                )
            } else if (this.type === "blogPost") {
                action = CommentService.getCommentsByBlogPost(
                    this.id,
                    this.pagination
                )
            } else if (this.type === "forum") {
                action = CommentService.getCommentsByForumTopic(
                    this.id,
                    this.pagination
                )
            }
            return action
        },
        getComments() {
            let action = this.getAction()

            action
                .then(response => {
                    this.comments = response.data.data
                    this.pagination.totalRecords = response.data.total
                    this.pagination.pageSize = response.data.per_page
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => (this.loading = false))
        }
    },
    computed: {
        commentedPostProps() {
            return [this.type, this.id];
        }
    }
}
</script>

<style scoped lang="scss">
.comment-date {
    background-color: #8da1b3;
    padding: 0.5em;
    border-radius: 2px;
}
.comment-content {
    padding: 1em;
    margin-bottom: 1em;
}
</style>
