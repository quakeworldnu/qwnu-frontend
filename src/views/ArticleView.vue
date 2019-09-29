<template>
  <div v-if="article" class="ml-3 mb-2 rounded main-container">
    <div class="box-header">Article</div>
    <div class="box-body">
      <div class="box-content">
        <h1>
          <router-link :to="{name: 'article', params: {id: article.id}}">{{article.title}}</router-link>
        </h1>
        <span class="box-content-info">
          <router-link :to="{name: 'user', params: {id: article.author.id}}">{{article.author.username}}</router-link> /
          {{article.create_time | formatUnixTimestamp}}
        </span>
        <div class="box-content-ingress" v-html="article.content"></div>
        <div class="box-content-body" v-html="article.body"></div>
        <div class="box-content-footer">
          <i class="fas fa-comments mr-2"></i>
          {{article.comments_count}}
          <div class="float-right">
            <router-link
              :to="{name: 'adminEditArticle', params: {id: article.id}}"
              v-if="$can('edit_article')"
              title="Edit article"
            >
              <i class="fas fa-pen mr-2"></i>
            </router-link>
          </div>
        </div>
      </div>
      <comment-list class="mt-2" header="Comments" type="article" :id="article.id"></comment-list>
    </div>
  </div>
</template>

<script>
import ArticleService from "@/services/ArticleService"
import CommentList from "@/components/CommentList"
import { parseBbCode } from "@/helpers/BbCode"

export default {
    name: "ArticleView",
    components: {
        CommentList
    },
    props: {
        id: null
    },
    data: function() {
        return {
            article: null
        }
    },
    mounted() {
        this.getArticle()
    },
    watch: {
        id() {
            // Need this watcher in case we click a link to the same page but different article...
            this.getArticle();
        }
    },
    methods: {
        getArticle() {
            ArticleService.getArticle(this.id)
                .then(response => {
                    this.article = response.data
                    this.article.content = parseBbCode(this.article.content)
                    this.article.body = parseBbCode(this.article.body)
                })
                .catch(error => {
                    console.log("Error: Could not fetch article.", error)
                })
        }
    }
}
</script>
