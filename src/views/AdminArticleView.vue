<template>
    <div v-if="article" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Administrate article</div>
        <div class="box-body">
            <div class="box-content">
                <h1>{{article.title}}</h1>
                <div class="box-content-body">
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Title</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="Title"
                                v-model="article.title"
                                required="true"
                            >
                            <small class="col-sm-4" v-if="error.list.title">{{error.list.title[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Content (Ingress)</label>
                            <textarea
                                class="col-sm-6 form-control form-control-sm"
                                rows="5"
                                placeholder="Content"
                                v-model="article.content"
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
                                v-model="article.body"
                                required="true"
                            ></textarea>
                            <small class="col-sm-4" v-if="error.list.body">{{error.list.body[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Status</label>
                            <select class="col-sm-4 form-control form-control-sm" v-model="article.status">
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
                            <select class="col-sm-4 form-control form-control-sm" v-model="article.category_id">
                                <option
                                    v-for="category in categories"
                                    :key="category.id"
                                    :value="category.id"
                                    :selected="article.category === category"
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
                            @click.prevent="saveArticle()"
                            v-text="loading ? 'Loading...' : 'Save'"
                            :disabled="loading"
                        ></button>
                    </form>
                </div>
                <div class="box-content-footer">&nbsp;
                    <div class="float-right">
                        <confirm-button
                            v-if="!article.isNew && $can('delete_article')"
                            icon="fa-trash"
                            text="Really delete this article?"
                            @confirm="deleteArticle()"
                        ></confirm-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Article from "@/models/Article";
import ArticleService from "@/services/ArticleService";
import CategoryService from "@/services/CategoryService";

export default {
    name: "adminArticle",
    props: {
        id: null
    },
    data() {
        return {
            loading: false,
            article: new Article(),
            error: {
                message: null,
                list: []
            },
            categories: []
        }
    },
    mounted() {
        if (this.id) {
            this.getArticle();
        }
        this.getCategories();
    },
    methods: {
        getArticle() {
            ArticleService.getArticle(this.id)
                .then(article => {
                    this.article = article;
                })
                .catch(error => {
                    console.log("Error: Could not fetch article.", error);
                })
        },
        saveArticle() {
            this.loading = true

            if (this.article.isNew) {
                this.createArticle();
            } else {
                this.updateArticle();
            }
        },
        updateArticle() {
            ArticleService.updateArticle(this.article.id, this.article)
                .then(response => {
                    console.log("Success!");
                })
                .catch(error => {
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                    console.log("Could not update article.")
                })
                .finally(() => (this.loading = false));
        },
        createArticle() {
            ArticleService.createArticle(this.article)
                .then(response => {
                    console.log("Success!");
                })
                .catch(error => {
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                    console.log("Could not create article.");
                })
                .finally(() => (this.loading = false))
        },
        deleteArticle() {
            ArticleService.deleteArticle(this.article.id)
                .then(response => {
                    this.$router.push({ path: "/admin/articles" });
                })
                .catch(error => {
                    console.log(error);
                    console.log("Could not delete article.");
                })
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
    }
}
</script>
