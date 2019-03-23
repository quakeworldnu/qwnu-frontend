<template>
  <div class="mb-2 rounded-top rounded-bottom">
    <div class="py-1 px-2 box-header rounded-top">
      <i class="fas fa-comments m-1"></i>
      Activity
    </div>
    <div class="pt-2 pr-2 pl-2 pb-0 box-body rounded-bottom">
      <div class="mb-2">
        <div v-for="comment in comments" :key="comment.id" class="box-content-record">
          {{getTitle(comment)}}
          <span
            class="box-content-record-info"
          >{{comment.create_time | formatUnixTimestamp }} in {{comment.type}}</span>
          <span class="box-content-record-author">By {{comment.author.username}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentService from "@/services/CommentService"

export default {
    name: "SideBoxLatestComments",
    props: {},
    data: function() {
        return {
            error: null,
            comments: []
        }
    },
    mounted() {
        this.getComments()
    },
    methods: {
        getComments() {
            CommentService.getLatestComments()
                .then(response => {
                    this.comments = response.data.data
                })
                .catch(error => {
                    this.error = "Could not fetch latest comments."
                })
        },
        getTitle(comment) {
            let title = ""
            if (comment.type === "forum") {
                title = comment.commentable.name
            } else if (comment.type === "news") {
                title = comment.commentable.title
            }
            return title
        }
    },
    computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
