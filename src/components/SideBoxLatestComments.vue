<template>
  <div class="mb-2 rounded">
    <div class="box-header">
      <i class="fas fa-comments"></i>
      Activity
    </div>
    <div class="box-body">
      <div>
        <div v-for="comment in comments" :key="comment.id" class="box-content-record">
          <router-link :to="link(comment)">{{getTitle(comment)}}</router-link>
          <span
            class="box-content-record-info"
          >{{comment.create_time | formatUnixTimestamp('fromNow') }} in {{comment.type}}</span>
          <span class="box-content-record-author">
            <router-link :to="{name: 'user', params: {id: comment.author.id}}">
                {{comment.author.username}}
            </router-link>
          </span>
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
    data() {
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

            // Shouldn't really happen unless we have malformed data from backend...
            if (!comment.commentable) {
                return title;
            }

            switch (comment.type) {
                case "blog":
                    title = comment.commentable.title
                    break
                case "forum":
                    title = comment.commentable.name
                    break
                case "news":
                    title = comment.commentable.title
                    break
            }
            return title
        },
        link(comment) {
            let link = null
            switch (comment.type) {
                case "blog":
                    link = {
                        name: "blogPost",
                        params: { id: comment.post_id }
                    }
                    break
                case "forum":
                    link = {
                        name: "forumTopic",
                        params: { id: comment.post_id }
                    }
                    break
                case "news":
                    link = {
                        name: "article",
                        params: { id: comment.post_id }
                    }
                    break
            }
            return link
        }
    },
    computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
