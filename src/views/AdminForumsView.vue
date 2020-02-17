<template>
    <div class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Administrate forums</div>
        <div class="box-body">
            <div class="box-content table-responsive mb-2">
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
                                    :sorting="sorting"
                                    @changed="getForums()"
                                >ID</sort-button>
                            </th>
                            <th class="col-5">
                                <sort-button
                                    field="name"
                                    :sorting="sorting"
                                    @changed="getForums()"
                                >Name</sort-button>
                            </th>
                            <th class="col-4">
                                <sort-button
                                    field="category"
                                    :sorting="sorting"
                                    @changed="getForums()"
                                >Category</sort-button>
                            </th>
                            <th class="col-2">
                                <sort-button
                                    field="position"
                                    :sorting="sorting"
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
import Pagination from "@/models/Pagination"
import Sorting from "@/models/Sorting"
import ForumService from "@/services/ForumService"

export default {
    name: "adminForums",
    data() {
        return {
            forums: [],
            pagination: new Pagination(),
            sorting: new Sorting({
                sort: "position",
                order: "asc"
            })
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
            ForumService.getForums(this.pagination, this.sorting)
                .then(response => {
                    this.forums = response.forums
                    this.pagination = response.pagination
                })
                .catch(error => {
                    console.log("Error: Could not fetch forums.", error)
                })
        }
    }
}
</script>
