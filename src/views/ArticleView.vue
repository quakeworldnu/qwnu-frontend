<template>
    <div v-if="article" class="ml-3 mb-2 rounded-top rounded-bottom main-container">
        <div class="py-1 px-2 box-header rounded-top">Article</div>
        <div class="p-2 pb-0 box-body rounded-bottom">
            <div class="p-3 box-content rounded-top rounded-bottom">
                <h1><router-link :to="{name: 'articles', params: {id: article.id}}">{{article.title}}</router-link></h1>
                <span class="box-content-info">{{article.author.username}} / {{article.create_time}}</span>
                <div class="box-content-ingress" v-html="article.content"></div>
                <div class="box-content-body" v-html="article.body"></div>
                <div class="box-content-footer">
                    <i class="fas fa-comments mr-2"></i>
                    <a href="">7</a>
                    <div class="float-right">
                        <i class="fas fa-pen mr-2"></i>
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            </div>
            <div class="bg-light p-2 rounded">
                Comments?
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
            article: null,
            articleId: null
        }
    },
    mounted() {
        this.articleId = this.$route.params.id;
        this.getArticle();
    },
    methods: {
        getArticle() {
            ArticleService.getArticle(this.articleId)
                .then(response => {
                    this.article = response.data;
                    this.article.content = parseBbCode(this.article.content);
                    this.article.body = parseBbCode(this.article.body);
                })
                .catch(error => {
                    console.log("Error: Could not fetch article.", error);
                })
        }
    }
}
</script>
