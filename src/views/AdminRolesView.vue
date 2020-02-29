<template>
    <div class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Administrate roles</div>
        <div class="box-body">
            <div class="box-content mb-2">
                <div class="mb-2">
                    <router-link :to="{name: 'adminCreateRole'}" v-if="$can('create_role')" tag="button" class="btn btn-sm btn-info">
                        New role
                    </router-link>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr class="d-flex">
                                <th class="col-2">
                                    ID
                                </th>
                                <th class="col-4">
                                    Name
                                </th>
                                <th class="col-3">
                                    Created
                                </th>
                                <th class="col-3">
                                    Created
                                </th>
                            </tr>
                            <tr v-for="role in roles" :key="role.id" class="d-flex">
                                <td class="col-2">{{role.id}}</td>
                                <td class="col-4">
                                    <router-link
                                        :to="{name: 'adminEditRole', params: {id: role.id}}"
                                    >{{role.name}}</router-link>
                                </td>
                                <td class="col-3">{{role.created_at | formatTimestamp}}</td>
                                <td class="col-3">{{role.updated_at | formatTimestamp}}</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <!-- <div class="bg-light p-2 rounded">
                <pagination
                    v-model="pagination.page"
                    :records="pagination.totalRecords"
                    :per-page="pagination.pageSize"
                    @paginate="onPageChange"
                ></pagination>
            </div> -->
        </div>
    </div>
</template>

<script>
import Pagination from "@/models/Pagination";
import Sorting from "@/models/Sorting";
import RoleService from "@/services/RoleService";

export default {
    name: "adminRoles",
    data() {
        return {
            roles: [],
            // pagination: new Pagination({
            //     current_page: 1,
            //     per_page: 1,
            //     total: 0
            // }),
            // sorting: new Sorting({
            //     sort: "id",
            //     order: "desc",
            // })
        }
    },
    mounted() {
        this.getRoles();
    },
    methods: {
        onPageChange() {
            this.getRoles();
        },
        getRoles() {
            RoleService.getRoles()
                .then(roles => {
                    this.roles = roles;
                    // this.pagination = response.pagination;
                })
                .catch(error => {
                    console.log("Error: Could not fetch roles.", error);
                })
        },

    }
}
</script>
