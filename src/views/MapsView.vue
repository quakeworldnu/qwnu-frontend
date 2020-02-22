<template>
    <div class="ml-3 mb-2 rounded-top rounded-bottom main-container">
        <div class="box-header">Maps</div>
        <div class="box-body">
            <div class="bg-light p-2 mb-2 rounded">
                <form>
                    <input type="text" class="form-control" :class="{'spinner-border': loading}" placeholder="Search name / description" v-model="keyword" @keydown.enter.prevent="search()"/>
                </form>
            </div>

            <table class="table">
                <tr>
                    <th style="width: 60px;">
                        <sort-button
                            field="name"
                            :sorting="sorting"
                            @changed="onPageChange()"
                        >Name</sort-button>
                    </th>
                    <th>
                        <sort-button
                            field="description"
                            :sorting="sorting"
                            @changed="onPageChange()"
                        >Description</sort-button>
                    </th>
                    <th style="width: 80px;">
                        <sort-button
                            field="mod"
                            :sorting="sorting"
                            @changed="onPageChange()"
                        >Type</sort-button>
                    </th>
                </tr>
                <tr v-for="map in maps" :key="map.id">
                    <td>
                        <router-link :to="{name: 'map', params: { id: map.id}}">{{map.name}}</router-link>
                    </td>
                    <td>{{map.description}}</td>
                    <td>{{map.mod}}</td>
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
import MapService from "@/services/MapService";

export default {
    name: "Maps",
    data() {
        return {
            loading: false,
            maps: [],
            pagination: new Pagination({
                current_page: parseInt(this.$route.query.page) || 1
            }),
            sorting: new Sorting({
                sort: this.$route.query.sort || "create_time",
                order: this.$route.query.order || "desc",
            }),
            keyword: this.$route.query.keyword || ""
        };
    },
    mounted() {
        this.getSearchedMaps();
    },
    methods: {
        search() {
            this.pagination.page = 1;
            let query = this.pagination;
            query.keyword = this.keyword;
            this.getSearchedMaps().then(() => {
                this.$router.push({
                    name: "maps",
                    query: query
                }).catch(error => {});
            });
        },
        onPageChange() {
            let query = this.pagination;
            query.keyword = this.keyword;

            this.getSearchedMaps();

            this.$router.push({
                name: "maps",
                query: query
            }).catch(error => {});
        },
        getSearchedMaps() {
            this.loading = true;
            return MapService.getMapsBySearch(this.keyword, this.pagination, this.sorting)
                .then(response => {
                    this.maps = response.maps;
                    this.pagination = response.pagination;
                })
                .catch(error => {
                    console.log("Error: Could not fetch searched maps.", error);
                }).finally(() => this.loading = false);
        }
    }
};
</script>
<style scoped lang="scss">
table {
    //background-image: url("../assets/forum-list-bg.png"); // Using #f0edc9 and "White plaster" filter
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
</style>
