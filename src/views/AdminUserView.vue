<template>
    <div v-if="user" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Administrate user</div>
        <div class="box-body">
            <div class="box-content">
                <h1>{{user.username}}</h1>
                <div class="box-content-body">
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Username</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="username"
                                v-model="user.username"
                                required="true"
                            >
                            <small class="col-sm-4" v-if="error.list.username">{{error.list.username[0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">E-mail</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="email"
                                v-model="user.email"
                                required="true"
                            >
                            <small class="col-sm-4" v-if="error.list.email">{{error.list.email[0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Password</label>
                            <input
                                type="password"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="new password"
                                v-model="user.password"
                                required="false"
                            >
                            <small
                                class="col-sm-4"
                                v-if="error.list.password"
                            >{{error.list.password[0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Status</label>
                            <select class="col-sm-4 form-control form-control-sm" v-model="user.status">
                                <option value="-1">Banned</option>
                                <option value="0">Inactive</option>
                                <option value="1">Active</option>
                            </select>
                            <small
                                class="col-sm-4"
                                v-if="error.list.status"
                            >{{error.list.status[0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Roles</label>
                            <div class="col-sm-4 form-check">
                                <div v-for="role in roles" :key="role.id">
                                    <input type="checkbox" class="form-check-input" :value="role" v-model="user.roles"/> {{role.name}}
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Created</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="Created"
                                :value="user.createtime | formatTimestamp"
                                disabled="true"
                            >
                            <small class="col-sm-4" v-if="error.list.createtime">{{error.list.createtime[0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Last visit</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="Last visit"
                                :value="user.lastvisit | formatTimestamp"
                                disabled="true"
                            >
                            <small class="col-sm-4" v-if="error.list.lastvisit">{{error.list.lastvisit[0]}}</small>
                        </div>
                        <button
                            type="submit"
                            class="btn btn-dark btn-sm bg-dark mt-2"
                            @click.prevent="saveUser()"
                            v-text="loading ? 'Loading...' : 'Save'"
                            :disabled="loading"
                        ></button>
                    </form>
                </div>
                <div class="box-content-footer">&nbsp;
                    <div class="float-right">
                        <confirm-button
                            v-if="!user.isNew && $can('delete_user')"
                            icon="fa-trash"
                            text="Really delete this user?"
                            @confirm="deleteUser()"
                        ></confirm-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RoleService from "@/services/RoleService"
import UserService from "@/services/UserService"
import User from "@/models/User"

export default {
    name: "adminUser",
    props: {
        id: null
    },
    data() {
        return {
            loading: false,
            user: new User(),
            roles: [],
            error: {
                message: null,
                list: []
            }
        }
    },
    mounted() {
        if (this.id) {
            this.getUser()
        }
        this.getRoles()
    },
    methods: {
        getUser() {
            UserService.getUser(this.id)
                .then(user => {
                    this.user = user;
                })
                .catch(error => {
                    console.log("Error: Could not fetch user.", error)
                })
        },
        saveUser() {
            this.loading = true

            if (this.user.id) {
                this.updateUser();
            } else {
                this.createUser();
            }
        },
        updateUser() {
            UserService.updateUser(this.user.id, this.user)
                .then(response => {
                    console.log("Success!")
                })
                .catch(error => {
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                    console.log("Could not update user")
                })
                .finally(() => (this.loading = false))
        },
        createUser() {
            UserService.createUser(this.user)
                .then(response => {
                    console.log("Success!")
                })
                .catch(error => {
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                    console.log("Could not create user")
                })
                .finally(() => (this.loading = false))
        },
        deleteUser() {
            UserService.deleteUser(this.user.id)
                .then(response => {
                    this.$router.push({ path: "/admin/users" })
                })
                .catch(error => {
                    console.log(error)
                    console.log("Could not delete user.")
                })
        },
        getRoles() {
            RoleService.getRoles()
                .then(roles => {
                    this.roles = roles;
                })
                .catch(error => {
                    console.log(error);
                    console.log("Could not fetch roles.")
                })
        }
    },
    computed: {}
}
</script>
