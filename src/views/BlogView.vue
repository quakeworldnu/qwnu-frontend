<template>
    <div v-if="author" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">{{this.author.username}}'s blog</div>
        <div class="box-body">
            <div
                v-for="blogPost in blogPosts"
                :key="blogPost.id"
                class="box-content mb-2"
            >
                <h1>
                    <router-link
                        :to="{ name: 'blogPost', params: { id: blogPost.id } }"
                        >{{ blogPost.title }}</router-link
                    >
                </h1>
                <span class="box-content-info">
                    <router-link
                        :to="{
                            name: 'user',
                            params: { id: blogPost.author.id },
                        }"
                        >{{ blogPost.author.username }}</router-link
                    >
                    / {{ blogPost.create_time | formatTimestamp }}
                </span>
                <div
                    class="box-content-body"
                    v-html="blogPost.contentBbCode()"
                ></div>
                <div class="box-content-footer">
                    <i class="fas fa-comments mr-2"></i>
                    <router-link
                        :to="{ name: 'blogPost', params: { id: blogPost.id } }"
                        >{{ blogPost.comments_count }}</router-link
                    >
                    <div class="float-right">
                        {{ blogPost.category.name }}
                    </div>
                </div>
            </div>
            <div class="bg-light p-2 rounded">
                <pagination
                    :records="pagination.totalRecords"
                    v-model="pagination.page"
                    :per-page="pagination.pageSize"
                    @paginate="onPageChange"
                ></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import BlogPost from "@/models/BlogPost";
import Pagination from "@/models/Pagination";
import Sorting from "@/models/Sorting";
import BlogPostService from "@/services/BlogPostService";
import UserService from "@/services/UserService";

export default {
    name: "home",
    props: {
        userId: null
    },
    data() {
        return {
            blogPosts: [],
            author: null,
            pagination: new Pagination(),
            sorting: new Sorting({
                sort: "create_time",
                order: "desc",
            }),
        };
    },
    mounted() {
        this.getAuthor();
        this.getBlogPosts();
    },
    methods: {
        onPageChange() {
            this.getBlogPosts();
        },
        getAuthor() {
            UserService.getUser(this.userId)
                .then((user) => {
                    this.author = user;
                })
                .catch((error) => {
                    console.log("Error: Could not fetch author.", error);
                });
        },
        getBlogPosts() {
            BlogPostService.getPublishedBlogPostsByAuthor(this.userId, this.pagination, this.sorting)
                .then((response) => {
                    this.blogPosts = response.blogPosts;
                    this.pagination = response.pagination;
                })
                .catch((error) => {
                    console.log("Error: Could not fetch blog posts.", error);
                });
        },
    },
};
</script>
