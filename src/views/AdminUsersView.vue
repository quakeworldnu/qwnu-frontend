<template>
    <div class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Administrate users</div>
        <div class="box-body">
            <div class="box-content mb-2">
                <div class="mb-2">
                    <router-link :to="{name: 'adminCreateUser'}" v-if="$can('create_user')" tag="button" class="btn btn-sm btn-info">
                        New user
                    </router-link>
                </div>
                <table class="table">
                    <thead>
                        <tr class="d-flex">
                            <th class="col-1">
                                <sort-button
                                    field="id"
                                    :pagination="pagination"
                                    @changed="getUsers()"
                                >ID</sort-button>
                            </th>
                            <th class="col-3">
                                <sort-button
                                    field="username"
                                    :pagination="pagination"
                                    @changed="getUsers()"
                                >Username</sort-button>
                            </th>
                            <th class="col-3">
                                <sort-button
                                    field="createtime"
                                    :pagination="pagination"
                                    @changed="getUsers()"
                                >Registration date</sort-button>
                            </th>
                            <th class="col-3">
                                <sort-button
                                    field="lastvisit"
                                    :pagination="pagination"
                                    @changed="getUsers()"
                                >Last visit</sort-button>
                            </th>
                            <th class="col-2">
                                <sort-button
                                    field="status"
                                    :pagination="pagination"
                                    @changed="getUsers()"
                                >Status</sort-button>
                            </th>
                        </tr>
                        <tr v-for="user in users" :key="user.id" class="d-flex">
                            <td class="col-1">{{user.id}}</td>
                            <td class="col-3">
                                <router-link
                                    :to="{name: 'adminEditUser', params: {id: user.id}}"
                                >{{user.username}}</router-link>
                            </td>
                            <td class="col-3">{{user.createtime | formatUnixTimestamp}}</td>
                            <td class="col-3">{{user.lastvisit | formatUnixTimestamp}}</td>
                            <td class="col-2">{{getStatus(user.status)}}</td>
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
import UserService from "@/services/UserService"

export default {
    name: "adminUsers",
    data() {
        return {
            users: [],
            pagination: {
                page: 1,
                sort: "id",
                order: "desc",
                pageSize: 1,
                totalRecords: 0
            }
        }
    },
    mounted() {
        this.getUsers()
    },
    methods: {
        onPageChange() {
            this.getUsers()
        },
        getUsers() {
            UserService.getUsers(this.pagination)
                .then(response => {
                    this.users = response.data.data
                    this.pagination.totalRecords = response.data.total
                    this.pagination.pageSize = response.data.per_page
                })
                .catch(error => {
                    console.log("Error: Could not fetch users.", error)
                })
        },
        getStatus(status) {
            if (status === -1) {
                return "Banned"
            } else if (status === 0) {
                return "Inactive"
            } else if (status === 1) {
                return "Active"
            } else {
                return "Invalid value?"
            }
        }
    }
}
</script>
