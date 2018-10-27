<template>
    <div class="ml-3 mb-2 rounded-top rounded-bottom main-container">
        <div class="py-1 px-2 box-header rounded-top">Administrate articles</div>
        <div class="p-2 pb-0 box-body rounded-bottom">
            <div class="p-3 box-content rounded-top rounded-bottom">
                <div class="mb-2">
                    <router-link :to="{name: 'adminCreateArticle'}" v-if="$can('create_article')" tag="button" class="btn btn-sm btn-info">
                        New article
                    </router-link>
                </div>
                <table class="table">
                    <thead>
                        <tr class="d-flex">
                            <th class="col-1">
                                <sort-button
                                    field="id"
                                    :pagination="pagination"
                                    @changed="getArticles()"
                                >ID</sort-button>
                            </th>
                            <th class="col-3">
                                <sort-button
                                    field="title"
                                    :pagination="pagination"
                                    @changed="getArticles()"
                                >Title</sort-button>
                            </th>
                            <th class="col-3">
                                <sort-button
                                    field="create_time"
                                    :pagination="pagination"
                                    @changed="getArticles()"
                                >Date</sort-button>
                            </th>
                            <th class="col-3">
                                <sort-button
                                    field="author.username"
                                    :pagination="pagination"
                                    @changed="getArticles()"
                                >Author</sort-button>
                            </th>
                            <th class="col-2">
                                <sort-button
                                    field="status"
                                    :pagination="pagination"
                                    @changed="getArticles()"
                                >Status</sort-button>
                            </th>
                        </tr>
                        <tr v-for="article in articles" :key="article.id" class="d-flex">
                            <td class="col-1">{{article.id}}</td>
                            <td class="col-3">
                                <router-link :to="{name: 'adminEditArticle', params: {id: article.id}}">
                                    {{article.title}}
                                </router-link>
                            </td>
                            <td class="col-3">{{article.create_time | formatUnixTimestamp}}</td>
                            <td class="col-3">{{article.author.username}}</td>
                            <td class="col-2">{{getStatus(article.status)}}</td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="bg-light p-2 rounded">
                <pagination
                    v-model="pagination.page"
                    :records="pagination.totalRecords"
                    :per-page="pagination.pageSize"
                    @paginate="onPageChange"
                ></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import ArticleService from "@/services/ArticleService"

export default {
    name: "adminArticles",
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
        this.getArticles()
    },
    methods: {
        onPageChange() {
            this.getArticles()
        },
        getArticles() {
            ArticleService.getArticles(this.pagination)
                .then(response => {
                    this.articles = response.data.data
                    this.pagination.totalRecords = response.data.total
                    this.pagination.pageSize = response.data.per_page
                })
                .catch(error => {
                    console.log("Error: Could not fetch articles.", error)
                })
        },
        getStatus(status) {
            if (status === 0) {
                return "Deleted"
            } else if (status === 1) {
                return "Draft"
            } else if (status === 2) {
                return "Published"
            } else {
                return "Invalid value?"
            }
        }
    }
}
</script>
