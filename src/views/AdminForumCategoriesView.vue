<template>
    <div class="ml-3 mb-2 rounded-top rounded-bottom main-container">
        <div class="py-1 px-2 box-header rounded-top">Administrate forum categories</div>
        <div class="p-2 pb-0 box-body rounded-bottom">
            <div class="p-3 box-content rounded-top rounded-bottom table-responsive">
                <div class="mb-2">
                    <router-link :to="{name: 'adminCreateForumCategory'}" v-if="$can('create_forum_category')" tag="button" class="btn btn-sm btn-info">
                        New forum category
                    </router-link>
                </div>
                <table class="table">
                    <thead>
                        <tr class="d-flex">
                            <th class="col-1">
                                <sort-button
                                    field="id"
                                    :pagination="pagination"
                                    @changed="getForumCategories()"
                                >ID</sort-button>
                            </th>
                            <th class="col-9">
                                <sort-button
                                    field="name"
                                    :pagination="pagination"
                                    @changed="getForumCategories()"
                                >Name</sort-button>
                            </th>
                            <th class="col-2">
                                <sort-button
                                    field="position"
                                    :pagination="pagination"
                                    @changed="getForumCategories()"
                                >Position</sort-button>
                            </th>
                        </tr>
                        <tr v-for="forumCategory in forumCategories" :key="forumCategory.id" class="d-flex">
                            <td class="col-1">{{forumCategory.id}}</td>
                            <td class="col-9">
                                <router-link :to="{name: 'adminEditForumCategory', params: {id: forumCategory.id}}">
                                    {{forumCategory.name}}
                                </router-link>
                            </td>
                            <td class="col-2">{{forumCategory.position}}</td>
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
    name: "adminForumCategories",
    data: function() {
        return {
            forumCategories: [],
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
        this.getForumCategories()
    },
    methods: {
        onPageChange() {
            this.getForumCategories()
        },
        getForumCategories() {
            ForumService.getForumCategories(this.pagination)
                .then(response => {
                    this.forumCategories = response.data.data
                    this.pagination.totalRecords = response.data.total
                    this.pagination.pageSize = response.data.per_page
                })
                .catch(error => {
                    console.log("Error: Could not fetch forum categories.", error)
                })
        }
    }
}
</script>
