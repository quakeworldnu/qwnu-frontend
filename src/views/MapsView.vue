<template>
    <div class="ml-3 mb-2 rounded-top rounded-bottom main-container">
        <div class="py-1 px-2 box-header rounded-top">Maps</div>
        <div class="p-2 pb-0 box-body rounded-bottom">
            <div class="p-1 rounded-top rounded-bottom table-responsive">
                <table class="table">
                    <tr>
                        <th style="width: 60px;">
                            <sort-button
                                field="name"
                                :pagination="pagination"
                                @changed="onPageChange()"
                            >Name</sort-button>
                        </th>
                        <th>
                            <sort-button
                                field="description"
                                :pagination="pagination"
                                @changed="onPageChange()"
                            >Description</sort-button>
                        </th>
                        <th style="width: 80px;">
                            <sort-button
                                field="mod"
                                :pagination="pagination"
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
import MapService from "@/services/MapService";

export default {
    name: "Maps",
    data: function() {
        return {
            maps: [],
            pagination: {
                page: parseInt(this.$route.query.page) || 1,
                sort: this.$route.query.sort || "create_time",
                order: this.$route.query.order || "desc",
                pageSize: 1,
                totalRecords: 0
            }
        };
    },
    mounted() {
        this.getMaps();
    },
    watch: {
        pagination: {
            handler(val) {
                this.getMaps();
            },
            deep: true
        }
    },
    methods: {
        onPageChange() {
            this.$router.push({
                name: "maps",
                query: this.pagination
            });
        },
        getMaps() {
            MapService.getMaps(this.pagination)
                .then(response => {
                    this.maps = response.data.data;
                    this.pagination.totalRecords = response.data.total;
                    this.pagination.pageSize = response.data.per_page;
                })
                .catch(error => {
                    console.log("Error: Could not fetch maps.", error);
                });
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
