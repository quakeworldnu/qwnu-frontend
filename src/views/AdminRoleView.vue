<template>
    <div v-if="role" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Administrate role</div>
        <div class="box-body">
            <div class="box-content">
                <h1>{{role.name}}</h1>
                <div class="box-content-body">
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Name</label>
                            <input
                                type="text"
                                class="col-sm-6 form-control form-control-sm"
                                v-model="role.name"
                                required="true"
                            >
                            <small class="col-sm-3" v-if="error.list.name">{{error.list.name[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Permissions</label>
                            <div class="col-sm-6 form-check">
                                <div v-for="permission in permissions" :key="permission.id">
                                    <input type="checkbox" class="form-check-input" v-model="role.permissions" :value="permission"/> {{permission.name.split("_").join(" ")}}
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Created</label>
                            <input
                                type="text"
                                class="col-sm-6 form-control form-control-sm"
                                placeholder="Created"
                                :value="role.created_at | formatTimestamp"
                                disabled="true"
                            >
                            <small class="col-sm-3" v-if="error.list.created_at">{{error.list.createtime[0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Updated</label>
                            <input
                                type="text"
                                class="col-sm-6 form-control form-control-sm"
                                placeholder="Last visit"
                                :value="role.updated_at | formatTimestamp"
                                disabled="true"
                            >
                            <small class="col-sm-3" v-if="error.list.updated_at">{{error.list.lastvisit[0]}}</small>
                        </div>
                        <button
                            type="submit"
                            class="btn btn-dark btn-sm bg-dark mt-2"
                            @click.prevent="saveRole()"
                            v-text="loading ? 'Loading...' : 'Save'"
                            :disabled="loading"
                        ></button>
                    </form>
                </div>
                <div class="box-content-footer">&nbsp;
                    <div class="float-right">
                        <confirm-button
                            v-if="!role.isNew && $can('delete_role')"
                            icon="fa-trash"
                            text="Really delete this role?"
                            @confirm="deleteRole()"
                        ></confirm-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RoleService from "@/services/RoleService";
import Role from "@/models/Role";

export default {
    name: "adminRole",
    props: {
        id: null
    },
    data() {
        return {
            loading: false,
            role: new Role(),
            permissions: [],
            error: {
                message: null,
                list: []
            }
        }
    },
    mounted() {
        if (this.id) {
            this.getRole();
        }
        this.getPermissions();
    },
    methods: {
        getRole() {
            RoleService.getRole(this.id)
                .then(role => {
                    this.role = role;
                })
                .catch(error => {
                    this.$toasted.error("Could not fetch role");
                    console.log(error);
                })
        },
        saveRole() {
            this.loading = true;

            if (this.role.id) {
                this.updateRole();
            } else {
                this.createRole();
            }
        },
        updateRole() {
            RoleService.updateRole(this.role.id, this.role)
                .then(role => {
                    this.$toasted.success("Role saved");
                    this.$router.push({ name: "adminEditRole", params: { id: role.id } }).catch(() => {});
                })
                .catch(error => {
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                    console.log("Could not update role")
                })
                .finally(() => (this.loading = false))
        },
        createRole() {
            RoleService.createRole(this.role)
                .then(role => {
                    this.$toasted.success("Role saved");
                    this.$router.push({ name: "adminEditRole", params: { id: role.id } }).catch(() => {});
                })
                .catch(error => {
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                    this.$toasted.error("Could not create role");
                })
                .finally(() => (this.loading = false))
        },
        deleteRole() {
            RoleService.deleteRole(this.role.id)
                .then(response => {
                    this.$toasted.success("Role deleted");
                    this.$router.push({ path: "/admin/roles" })
                })
                .catch(error => {
                    console.log(error)
                    this.$toasted.error("Could not delete role");
                })
        },
        getPermissions() {
            RoleService.getPermissions()
                .then(permissions => {
                    this.permissions = permissions;
                })
                .catch(error => {
                    console.log(error);
                    this.$toasted.error("Could not fetch permissions");
                })
        }
    },
    computed: {}
}
</script>
