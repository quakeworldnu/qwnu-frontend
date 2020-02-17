<template>
    <div class="ml-3 mb-2 rounded main-container">
        <div class="box-header">News</div>
        <div class="box-body">
            <div v-for="article in articles" :key="article.id" class="box-content mb-2">
                <h1><router-link :to="{name: 'article', params: {id: article.id}}">{{article.title}}</router-link></h1>
                <span class="box-content-info">
                    <router-link :to="{name: 'user', params: {id: article.author.id}}">{{article.author.username}}</router-link> /
                    {{article.create_time | formatTimestamp}}
                </span>
                <div class="box-content-body" v-html="article.contentBbCode()"></div>
                <div class="box-content-footer">
                    <i class="fas fa-comments mr-2"></i>
                    <router-link :to="{name: 'article', params: {id: article.id}}">{{article.comments_count}}</router-link>
                    <div class="float-right">
                        {{article.category.name}}
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
import Article from "@/models/Article";
import Pagination from "@/models/Pagination";
import Sorting from "@/models/Sorting";
import ArticleService from "@/services/ArticleService";

export default {
    name: "home",
    data() {
        return {
            articles: [],
            pagination: new Pagination({
                current_page: 1,
                per_page: 1,
                total: 0
            }),
            sorting: new Sorting({
                sort: "create_time",
                order: "desc",
            })
        }
    },
    mounted() {
        this.getArticles();
    },
    methods: {
        onPageChange() {
            this.getArticles();
        },
        getArticles() {
            ArticleService.getPublishedArticles(this.pagination, this.sorting)
                .then(response => {
                    this.articles = response.articles;
                    this.pagination = response.pagination;
                })
                .catch(error => {
                    console.log("Error: Could not fetch articles.", error);
                })
        }
    }
}
</script>
