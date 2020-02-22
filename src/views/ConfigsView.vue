<template>
    <div class="ml-3 mb-2 rounded-top rounded-bottom main-container">
        <div class="box-header">Configs</div>
        <div class="box-body">
            <router-link v-if="$can('create_config')" :to="{name: 'editConfig'}" tag="button" class="btn btn-sm btn-info mb-2">
                Upload
            </router-link>

            <div class="bg-light p-2 mb-2 rounded">
                <form>
                    <input type="text" class="form-control" placeholder="Search title" v-model="keyword" @keydown.enter.prevent="search()"/>
                </form>
            </div>

            <table class="table">
                <tr>
                    <th>
                        <sort-button
                            field="title"
                            :sorting="sorting"
                            @changed="onPageChange()"
                        >Title</sort-button>
                    </th>
                    <th>
                        <!-- <sort-button
                            field="title"
                            :sorting="sorting"
                            @changed="onPageChange()"
                        > -->
                        Client
                        <!-- </sort-button> -->
                    </th>
                    <th>
                        <sort-button
                            field="create_time"
                            :sorting="sorting"
                            @changed="onPageChange()"
                        >Added</sort-button>
                    </th>
                    <th>
                        <!-- <sort-button
                            field="user.username"
                            :sorting="sorting"
                            @changed="onPageChange()"
                        > -->
                        Added by
                        <!-- </sort-button> -->
                    </th>
                    <th>
                        DL
                    </th>
                </tr>
                <tr v-for="config in configs" :key="config.id">
                    <td>
                        <router-link :to="{name: 'config', params: { id: config.id}}">
                            {{config.title}}
                        </router-link>
                    </td>
                    <td>{{config.engineName}} {{config.modeName}}</td>
                    <td>{{config.create_time | formatTimestamp('YYYY-MM-DD')}}</td>
                    <td>
                        <user-name v-if="config.user" :user="config.user"></user-name>
                    </td>
                    <td class="p-0">
                        <button type="button" class="btn btn-default btn-xs mb-0" @click="download(config)" title="Download config">
                            <i class="fas fa-download"></i>
                        </button>
                    </td>
                </tr>
            </table>

            <div class="bg-light p-2 rounded">
                <pagination
                    v-model="pagination.page"
                    :records="pagination.totalRecords"
                    :per-page="pagination.pageSize"
                    @paginate="onPageChange()"
                ></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from "@/models/Pagination";
import Sorting from "@/models/Sorting";
import ConfigService from "@/services/ConfigService";
import Config from "@/models/Config";

export default {
    name: "Configs",
    data() {
        return {
            configs: [],
            pagination: new Pagination({
                current_page: parseInt(this.$route.query.page) || 1
            }),
            sorting: new Sorting({
                sort: this.$route.query.sort || "create_time",
                order: this.$route.query.order || "desc"
            }),
            keyword: this.$route.query.keyword || ""
        };
    },
    mounted() {
        this.getSearchedConfigs();
    },
    methods: {
        search() {
            this.pagination.page = 1;
            let query = this.pagination;
            query.keyword = this.keyword;
            this.getSearchedConfigs().then(() => {
                this.$router.push({
                    name: "configs",
                    query: query
                }).catch(error => {});
            });
        },
        onPageChange() {
            let query = this.pagination;
            query.keyword = this.keyword;

            this.getSearchedConfigs();

            this.$router.push({
                name: "configs",
                query: query
            }).catch(error => {});;
        },
        getSearchedConfigs() {
            return ConfigService.getConfigsBySearch(this.keyword, this.pagination, this.sorting)
                .then(response => {
                    this.configs = response.configs;
                    this.pagination = response.pagination;
                })
                .catch(error => {
                    console.log("Error: Could not fetch searched configs.", error);
                });
        },
        download(config) {
            // Additional detailed call to backend as we don't have the cfg field in list call
            ConfigService.getConfig(config.id).then(config => {
                config = config;
                config.download();
            });
        }
    }
};
</script>
<style scoped lang="scss">
table {
    border-style: none;
    margin: 0 0 1em 0;
    width: 100%;
}

td {
    padding: 1em;
    margin: 0;
    color: #706050;
}

th {
    text-transform: uppercase;
    font-size: 0.9em;
    padding: 0.8em;
    color: #fff;
    background-image: url("../assets/bg-header-menu.png");
    border: none;
}

tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 1);
}

tr:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.9);
}

.fas {
    color: #2c3e50;
}
</style>
