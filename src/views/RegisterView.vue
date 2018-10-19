<template>
    <div class="ml-3 mb-2 rounded-top rounded-bottom main-container">
        <div class="py-1 px-2 box-header rounded-top">Register</div>
        <div class="p-2 pb-0 box-body rounded-bottom">
            <div class="p-3 box-content rounded-top rounded-bottom">
                <h1>Welcome to QuakeWorld.nu</h1>
                <div class="box-content-body">
                    <p>
                    Fill in the form to register a QuakeWorld.nu user account.
                    </p>
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
                            <small class="col-sm-4" v-if="errors.username">{{errors.username[0]}}</small>
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
                            <small class="col-sm-4" v-if="errors.email">{{errors.email[0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Password</label>
                            <input
                                type="password"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="password"
                                v-model="user.password"
                                required="true"
                            >
                            <small class="col-sm-4" v-if="errors.password">{{errors.password[0]}}</small>
                        </div>

                        <button
                            type="submit"
                            class="btn btn-dark btn-sm bg-dark mt-2"
                            @click.prevent="register()"
                            v-text="loading ? 'loading...' : 'Register'"
                            :disabled="loading"
                        ></button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import UserService from "@/services/UserService"

export default {
    name: "register",
    data: function () {
        return {
            user: {},
            loading: false,
            errors: []
        }
    },
    mounted() {
    },
    methods: {
        register() {
            this.loading = true;
            UserService.register(this.user).then(() => {
                this.errors = [];
            })
            .catch((error) => {
                this.errors = error.response.data.errors;
            })
            .finally(() => this.loading = false);
        }
    }
}
</script>
