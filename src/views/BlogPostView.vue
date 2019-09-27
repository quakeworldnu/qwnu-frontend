<template>
  <div v-if="blogPost" class="ml-3 mb-2 rounded main-container">
    <div class="box-header">Blog post</div>
    <div class="box-body">
      <div class="box-content">
        <h1>
          <router-link :to="{name: 'blogPost', params: {id: blogPost.id}}">{{blogPost.title}}</router-link>
        </h1>
        <span
          class="box-content-info"
        >{{blogPost.author.username}} / {{blogPost.create_time | formatUnixTimestamp}}</span>
        <div class="box-content-ingress" v-html="blogPost.content"></div>
        <div class="box-content-body" v-html="blogPost.body"></div>
        <div class="box-content-footer">
          <i class="fas fa-comments mr-2"></i>
          {{blogPost.comments_count}}
          <div class="float-right">
            <router-link
              :to="{name: 'adminEditBlogPost', params: {id: blogPost.id}}"
              v-if="$can('edit_blog_post')"
              title="Edit blog post"
            >
              <i class="fas fa-pen mr-2"></i>
            </router-link>
          </div>
        </div>
      </div>
      <comment-list class="mt-2" header="Comments" type="blogPost" :id="blogPost.id"></comment-list>
    </div>
  </div>
</template>

<script>
import BlogPostService from "@/services/BlogPostService"
import CommentList from "@/components/CommentList"
import { parseBbCode } from "@/helpers/BbCode"

export default {
    name: "BlogPostView",
    components: {
        CommentList
    },
    props: {
        id: null
    },
    data: function() {
        return {
            blogPost: null
        }
    },
    mounted() {
        this.getBlogPost()
    },
    watch: {
        id() {
            // Need this watcher in case we click a link to the same page but different article...
            this.getBlogPost();
        }
    },
    methods: {
        getBlogPost() {
            BlogPostService.getBlogPost(this.id)
                .then(response => {
                    this.blogPost = response.data
                    this.blogPost.content = parseBbCode(this.blogPost.content)
                    this.blogPost.body = parseBbCode(this.blogPost.body)
                })
                .catch(error => {
                    console.log("Error: Could not fetch blog post.", error)
                })
        }
    }
}
</script>
