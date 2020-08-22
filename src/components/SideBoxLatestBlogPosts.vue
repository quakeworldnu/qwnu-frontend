<template>
    <div class="mb-2 rounded">
        <div class="box-header">
            <i class="fas fa-book-open"></i>
            Latest blog posts
        </div>
        <div class="box-body">
            <div>
                <div
                    v-for="blogPost in blogPosts"
                    :key="blogPost.id"
                    class="box-content-record"
                >
                    <router-link
                        :to="{ name: 'blogPost', params: { id: blogPost.id } }"
                        >{{ blogPost.title }}</router-link
                    >
                    <span class="box-content-record-info">{{
                        blogPost.create_time | formatTimestamp("fromNow")
                    }}</span>
                    <span class="box-content-record-author">
                        <router-link
                            :to="{
                                name: 'user',
                                params: { id: blogPost.author.id }
                            }"
                        >
                            {{ blogPost.author.username }}
                        </router-link>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from "@/models/Pagination";
import Sorting from "@/models/Sorting";
import BlogPostService from "@/services/BlogPostService";

export default {
    name: "SideBoxLatestBlogPosts",
    props: {},
    data() {
        return {
            error: null,
            blogPosts: [],
            pagination: new Pagination({
                per_page: 5
            }),
            sorting: new Sorting({
                sort: "create_time",
                order: "desc"
            })
        };
    },
    mounted() {
        this.getBlogPosts();
    },
    methods: {
        getBlogPosts() {
            BlogPostService.getPublishedBlogPosts(this.pagination, this.sorting)
                .then(response => {
                    this.blogPosts = response.blogPosts;
                })
                .catch(error => {
                    this.error = "Could not fetch latest blog posts.";
                });
        }
    },
    computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
