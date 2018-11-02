<template>
    <div class="ml-3 mb-2 rounded-top rounded-bottom main-container">
        <div class="py-1 px-2 box-header rounded-top">Administrate forums</div>
        <div class="p-2 pb-0 box-body rounded-bottom">
            <div class="p-3 box-content rounded-top rounded-bottom table-responsive">
                <div class="mb-2">
                    <router-link :to="{name: 'adminCreateForum'}" v-if="$can('create_forum')" tag="button" class="btn btn-sm btn-info">
                        New forum
                    </router-link>
                </div>
                <table class="table">
                    <thead>
                        <tr class="d-flex">
                            <th class="col-1">
                                <sort-button
                                    field="id"
                                    :pagination="pagination"
                                    @changed="getForums()"
                                >ID</sort-button>
                            </th>
                            <th class="col-5">
                                <sort-button
                                    field="name"
                                    :pagination="pagination"
                                    @changed="getForums()"
                                >Name</sort-button>
                            </th>
                            <th class="col-4">
                                <sort-button
                                    field="category"
                                    :pagination="pagination"
                                    @changed="getForums()"
                                >Category</sort-button>
                            </th>
                            <th class="col-2">
                                <sort-button
                                    field="position"
                                    :pagination="pagination"
                                    @changed="getForums()"
                                >Position</sort-button>
                            </th>
                        </tr>
                        <tr v-for="forum in forums" :key="forum.id" class="d-flex">
                            <td class="col-1">{{forum.id}}</td>
                            <td class="col-5">
                                <router-link :to="{name: 'adminEditForum', params: {id: forum.id}}">
                                    {{forum.name}}
                                </router-link>
                            </td>
                            <td class="col-4">{{forum.category.name}}</td>
                            <td class="col-2">{{forum.position}}</td>
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
import ForumService from "@/services/ForumService"

export default {
    name: "adminForums",
    data: function() {
        return {
            forums: [],
            pagination: {
                page: 1,
                sort: "position",
                order: "asc",
                pageSize: 1,
                totalRecords: 0
            }
        }
    },
    mounted() {
        this.getForums()
    },
    methods: {
        onPageChange() {
            this.getForums()
        },
        getForums() {
            ForumService.getForums(this.pagination)
                .then(response => {
                    this.forums = response.data.data
                    this.pagination.totalRecords = response.data.total
                    this.pagination.pageSize = response.data.per_page
                })
                .catch(error => {
                    console.log("Error: Could not fetch forums.", error)
                })
        }
    }
}
</script>
