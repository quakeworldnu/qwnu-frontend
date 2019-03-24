<template>
    <div class="ml-3 mb-2 rounded main-container">
        <div class="box-header">News</div>
        <div class="box-body">
            <div v-for="article in articles" :key="article.id" class="box-content mb-2">
                <h1><router-link :to="{name: 'article', params: {id: article.id}}">{{article.title}}</router-link></h1>
                <span class="box-content-info">{{article.author.username}} / {{article.create_time | formatUnixTimestamp}}</span>
                <div class="box-content-body" v-html="article.content"></div>
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
import ArticleService from "@/services/ArticleService";
import { parseBbCode } from "@/helpers/BbCode";

export default {
    name: "home",
    data: function() {
        return {
            articles: [],
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
        this.getArticles();
    },
    methods: {
        onPageChange() {
            this.getArticles();
        },
        getArticles() {
            ArticleService.getPublishedArticles(this.pagination)
                .then(response => {
                    this.articles = response.data.data;
                    this.pagination.totalRecords = response.data.total;
                    this.pagination.pageSize = response.data.per_page;

                    for (let i = 0; i < this.articles.length; i++) {
                        this.articles[i].content = parseBbCode(this.articles[i].content);
                    }
                })
                .catch(error => {
                    console.log("Error: Could not fetch articles.", error);
                })
        }
    }
}
</script>
