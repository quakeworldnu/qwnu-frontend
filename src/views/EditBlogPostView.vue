<template>
    <div v-if="blogPost" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">
            <router-link :to="{ name: 'blogPosts' }">Blog posts</router-link>
            / {{ title }}
        </div>
        <div class="box-body">
            <div class="box-content">
                <div class="box-content-body">
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Title</label>
                            <input
                                type="text"
                                class="col-sm-6 form-control form-control-sm"
                                v-model="blogPost.title"
                                required="true"
                            />
                            <small class="col-sm-4" v-if="error.list.title">{{
                                error.list.title[0]
                            }}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Content (Ingress)</label>
                            <textarea
                                class="col-sm-6 form-control form-control-sm"
                                rows="5"
                                placeholder="Content"
                                v-model="blogPost.content"
                                required="true"
                            ></textarea>
                            <small class="col-sm-4" v-if="error.list.content">{{error.list.content[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Body</label>
                            <textarea
                                class="col-sm-6 form-control form-control-sm"
                                rows="10"
                                placeholder="Body"
                                v-model="blogPost.body"
                                required="true"
                            ></textarea>
                            <small class="col-sm-4" v-if="error.list.body">{{error.list.body[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Status</label>
                            <select class="col-sm-4 form-control form-control-sm" v-model="blogPost.status">
                                <option value="0">Deleted</option>
                                <option value="1">Draft</option>
                                <option value="2">Published</option>
                            </select>
                            <small
                                class="col-sm-4"
                                v-if="error.list.status"
                            >{{error.list.status[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Category</label>
                            <select class="col-sm-4 form-control form-control-sm" v-model="blogPost.category_id">
                                <option
                                    v-for="category in categories"
                                    :key="category.id"
                                    :value="category.id"
                                    :selected="blogPost.category === category"
                                >
                                    {{category.name}}
                                </option>
                            </select>
                            <small
                                class="col-sm-4"
                                v-if="error.list.category_id"
                            >{{error.list.category_id[0]}}</small>
                        </div>

                        <button
                            type="submit"
                            class="btn btn-dark btn-sm bg-dark mt-2"
                            @click.prevent="saveBlogPost()"
                            v-text="loading ? 'Loading...' : 'Save'"
                            :disabled="loading"
                        ></button>
                    </form>
                </div>
                <div v-if="!blogPost.isNew && ($can('delete_blog_post') || ($can('delete_own_blog_post') && isOwnBlogPost))" class="box-content-footer">
                    &nbsp;
                    <div class="float-right">
                        <confirm-button
                            icon="fa-trash"
                            text="Really delete this blog post?"
                            title="Delete blog post"
                            @confirm="deleteBlogPost()"
                        ></confirm-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import BlogPostService from "@/services/BlogPostService";
import CategoryService from "@/services/CategoryService";
import BlogPost from "@/models/BlogPost";

export default {
    name: "EditBlogPostView",
    props: {
        id: null
    },
    data() {
        return {
            blogPost: new BlogPost(),
            categories: [],
            loading: false,
            error: {
                message: null,
                list: []
            }
        };
    },
    mounted() {
        if (this.id) {
            this.getBlogPost();
        }
        this.getCategories();
    },
    watch: {
        id() {
            // Need this watcher in case we click a link to the same page but different blog post...
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
                    this.$toasted.error("Could not fetch blog post");
                    console.log(error);
                });
        },
        saveBlogPost() {
            this.loading = true;

            if (this.blogPost.isNew) {
                this.createBlogPost();
            } else {
                this.updateBlogPost();
            }
        },
        updateBlogPost() {
            BlogPostService.updateBlogPost(this.blogPost.id, this.blogPost)
                .then(response => {
                    this.$toasted.success("Blog post saved");
                    this.$router.push({ name: "blogPost", params: { id: this.blogPost.id } })
                })
                .catch(error => {
                    this.$toasted.error("Could not save blog post");
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                })
                .finally(() => this.loading = false);
        },
        createBlogPost() {
            BlogPostService.createBlogPost(this.blogPost)
                .then(blogPost => {
                    this.$toasted.success("Blog post saved");
                    this.$router.push({ name: "blogPost", params: { id: blogPost.id } })
                })
                .catch(error => {
                    this.$toasted.error("Could not save blog post");
                    console.log(error);
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                })
                .finally(() => (this.loading = false));
        },
        deleteBlogPost() {
            BlogPostService.deleteBlogPost(this.blogPost.id).then(response => {
              this.$toasted.success("Blog post deleted");
              this.$router.push({ name: "blogPosts" })
            })
            .catch(error => {
                this.$toasted.error("Could not delete blog post");
                console.log(error);
            })
            .finally(() => (this.loading = false));
        },
        getCategories() {
            CategoryService.getCategories()
                .then(categories => {
                    this.categories = categories;
                })
                .catch(error => {
                    console.log(error);
                    console.log("Could not fetch categories.");
                })
        }
    },
    computed: {
        ...mapGetters({
            $user: 'user'
        }),
        title() {
            return this.blogPost.isNew ? "New blog post" : this.blogPost.title;
        },
        isOwnBlogPost() {
          return this.$user.id === this.blogPost.author.id;
        }
    }
};
</script>
