<template>
    <div class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Administrate articles</div>
        <div class="box-body">
            <div class="box-content table-responsive mb-2">
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
                                    :sorting="sorting"
                                    @changed="getArticles()"
                                >ID</sort-button>
                            </th>
                            <th class="col-3">
                                <sort-button
                                    field="title"
                                    :sorting="sorting"
                                    @changed="getArticles()"
                                >Title</sort-button>
                            </th>
                            <th class="col-3">
                                <sort-button
                                    field="create_time"
                                    :sorting="sorting"
                                    @changed="getArticles()"
                                >Date</sort-button>
                            </th>
                            <th class="col-3">
                                <!-- <sort-button
                                    field="author.username"
                                    :sorting="sorting"
                                    @changed="getArticles()"
                                > -->
                                Author
                                <!-- </sort-button> -->
                            </th>
                            <th class="col-2">
                                <sort-button
                                    field="status"
                                    :sorting="sorting"
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
                            <td class="col-3">{{article.create_time | formatTimestamp}}</td>
                            <td class="col-3">{{article.author.username}}</td>
                            <td class="col-2">{{article.statusName()}}</td>
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
import Pagination from "@/models/Pagination";
import Sorting from "@/models/Sorting";
import ArticleService from "@/services/ArticleService";

export default {
    name: "adminArticles",
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
                order: "desc"
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
            ArticleService.getArticles(this.pagination, this.sorting)
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
<style scoped lang="scss">
</style>
