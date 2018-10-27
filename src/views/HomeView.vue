<template>
    <div class="ml-3 mb-2 rounded-top rounded-bottom main-container">
        <div class="py-1 px-2 box-header rounded-top">News</div>
        <div class="p-2 pb-0 box-body rounded-bottom">
            <div v-for="article in articles" :key="article.id" class="p-3 box-content rounded-top rounded-bottom">
                <h1><router-link :to="{name: 'articles', params: {id: article.id}}">{{article.title}}</router-link></h1>
                <span class="box-content-info">{{article.author.username}} / {{article.create_time}}</span>
                <div class="box-content-body" v-html="article.content"></div>
                <div class="box-content-footer">
                    <i class="fas fa-comments mr-2"></i>
                    <a href="">7</a>
                    <div class="float-right">
                        {{article.category.name}}
                    </div>
                </div>
            </div>
            <div class="bg-light p-2 rounded">
                <pagination :records="pagination.totalRecords" v-model="page" :per-page="pagination.pageSize" @paginate="onPageChange"></pagination>
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
            ArticleService.getArticles(this.pagination)
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
