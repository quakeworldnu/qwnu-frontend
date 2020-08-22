<template>
    <div v-if="article" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Administrate article</div>
        <div class="box-body">
            <div class="box-content">
                <h1>{{article.title}}</h1>
                <div class="box-content-body">
                    <form @drop.prevent="addFile" @dragover.prevent>
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
import File from "@/models/File";
import ArticleService from "@/services/ArticleService";
import CategoryService from "@/services/CategoryService";
import FileService from "@/services/FileService";

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
        addFile(e) {
            let file = new File()
            let files = e.dataTransfer.files;
            file.name = files[0].name;
            file.file = files[0];
            FileService.createFile(file).then(file => {
                let tag = `[url=${this.filePath(file.filename)}]${file.filename}[/url]`;
                this.article.body += tag;
            }).catch(error => {
                this.$toasted.error('Could not upload file');
                console.log(error);
            });
        },
        filePath(fileName) {
            return process.env.VUE_APP_BACKEND_ROOT_URL + "storage/uploads/" + fileName;
        },
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
                    this.$toasted.success('Article saved');
                })
                .catch(error => {
                    this.$toasted.error('Could not save article');
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                })
                .finally(() => (this.loading = false));
        },
        createArticle() {
            ArticleService.createArticle(this.article)
                .then(response => {
                    this.$toasted.success('Article saved');
                })
                .catch(error => {
                    this.$toasted.error('Could not create article');
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                })
                .finally(() => (this.loading = false))
        },
        deleteArticle() {
            ArticleService.deleteArticle(this.article.id)
                .then(response => {
                    this.$toasted.success('Article deleted');
                    this.$router.push({ path: "/admin/articles" });
                })
                .catch(error => {
                    this.$toasted.error('Could not delete article');
                    console.log(error);
                })
        },
        getCategories() {
            CategoryService.getCategories()
                .then(categories => {
                    this.categories = categories;
                })
                .catch(error => {
                    this.$toasted.error('Could not fetch categories');
                    console.log(error);
                })
        }
    }
}
</script>
