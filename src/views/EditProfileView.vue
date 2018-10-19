<template>
    <div v-if="user" class="ml-3 mb-2 rounded-top rounded-bottom main-container">
        <div class="py-1 px-2 box-header rounded-top">Edit profile</div>
        <div class="p-2 pb-0 box-body rounded-bottom">
            <div class="p-3 box-content rounded-top rounded-bottom">
                <h1>{{user.username}}</h1>
                <div class="box-content-body">
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Username</label>
                            <input
                                type="text"
                                class="col-sm-6 form-control"
                                disabled="true"
                                v-model="user.username"
                            >
                            <small class="col-sm-4" v-if="errors.username">{{errors.username[0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">E-mail</label>
                            <input type="text" class="col-sm-6 form-control" v-model="user.email">
                            <small class="col-sm-4" v-if="errors.email">{{errors.email[0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Password</label>
                            <input
                                type="password"
                                class="col-sm-6 form-control"
                                v-model="user.password"
                            >
                            <small class="col-sm-4" v-if="errors.password">{{errors.password[0]}}</small>
                        </div>
                        <button class="btn btn-sm btn-dark" @click.prevent="saveProfile()">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex"
import UserService from "@/services/UserService"
import { parseBbCode } from "@/helpers/bbcode"

export default {
    name: "editProfile",
    data: function() {
        return {
            errors: [],
            user: null
        }
    },
    mounted() {
        this.getUser()
    },
    methods: {
        ...mapActions({
            $updateProfile: "updateProfile"
        }),
        getUser() {
            UserService.getUser(this.$currentUser.id)
                .then(response => {
                    this.user = response.data
                })
                .catch(error => {
                    console.log("Error: Could not fetch user.", error)
                })
        },
        saveProfile() {
            this.$updateProfile(this.user)
                .then(response => {
                    this.errors = [];
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                });
        }
    },
    computed: {
        ...mapGetters({
            $currentUser: "user"
        })
    }
}
</script>
