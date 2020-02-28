<template>
  <div v-if="blogPost" class="ml-3 mb-2 rounded main-container">
    <div class="box-header">Blog post</div>
    <div class="box-body">
      <div class="box-content">
        <h1>
          <router-link :to="{name: 'blogPost', params: {id: blogPost.id}}">{{blogPost.title}}</router-link>
        </h1>
        <span class="box-content-info">
            <router-link :to="{name: 'user', params: {id: blogPost.author.id}}">{{blogPost.author.username}}</router-link>
            / {{blogPost.create_time | formatTimestamp}}
        </span>
        <div class="box-content-ingress" v-html="blogPost.contentBbCode()"></div>
        <div class="box-content-body" v-html="blogPost.bodyBbCode()"></div>
        <div class="box-content-footer">
          <i class="fas fa-comments mr-2"></i>
          {{blogPost.comments_count}}
          <div class="float-right">
            <router-link
              :to="{name: 'editBlogPost', params: {id: blogPost.id}}"
              v-if="$can('edit_blog_post') || ($can('edit_own_blog_post') && isOwnBlogPost)"
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
import { mapGetters } from "vuex";
import BlogPostService from "@/services/BlogPostService"
import CommentList from "@/components/CommentList"

export default {
    name: "BlogPostView",
    components: {
        CommentList
    },
    props: {
        id: null
    },
    data() {
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
                .then(blogPost => {
                    this.blogPost = blogPost;
                })
                .catch(error => {
                    console.log("Error: Could not fetch blog post.", error)
                })
        }
    },
    computed: {
        ...mapGetters({
            $user: 'user'
        }),
        isOwnBlogPost() {
          return this.$user.id === this.blogPost.author.id;
        }
    }
}
</script>
