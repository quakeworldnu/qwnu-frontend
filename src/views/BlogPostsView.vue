<template>
    <div class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Blogs</div>
        <div class="box-body">
            <div v-for="blogPost in blogPosts" :key="blogPost.id" class="box-content mb-2">
                <h1><router-link :to="{name: 'blogPost', params: {id: blogPost.id}}">{{blogPost.title}}</router-link></h1>
                <span class="box-content-info">
                    <router-link :to="{name: 'user', params: {id: blogPost.author.id}}">{{blogPost.author.username}}</router-link>
                    / {{blogPost.create_time | formatUnixTimestamp}}
                </span>
                <div class="box-content-body" v-html="blogPost.content"></div>
                <div class="box-content-footer">
                    <i class="fas fa-comments mr-2"></i>
                    <router-link :to="{name: 'blogPost', params: {id: blogPost.id}}">{{blogPost.comments_count}}</router-link>
                    <div class="float-right">
                        {{blogPost.category.name}}
                    </div>
                </div>
            </div>
            <div class="bg-light p-2 rounded">
                <pagination :records="pagination.totalRecords" v-model="pagination.page" :per-page="pagination.pageSize" @paginate="onPageChange"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import BlogPostService from "@/services/BlogPostService";
import { parseBbCode } from "@/helpers/BbCode";

export default {
    name: "home",
    data: function() {
        return {
            blogPosts: [],
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
        this.getBlogPosts();
    },
    methods: {
        onPageChange() {
            this.getBlogPosts();
        },
        getBlogPosts() {
            BlogPostService.getPublishedBlogPosts(this.pagination)
                .then(response => {
                    this.blogPosts = response.data.data;
                    this.pagination.totalRecords = response.data.total;
                    this.pagination.pageSize = response.data.per_page;

                    for (let i = 0; i < this.blogPosts.length; i++) {
                        this.blogPosts[i].content = parseBbCode(this.blogPosts[i].content);
                    }
                })
                .catch(error => {
                    console.log("Error: Could not fetch blog posts.", error);
                })
        }
    }
}
</script>
