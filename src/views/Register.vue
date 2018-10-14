<template>
    <div class="ml-3 mb-2 rounded-top rounded-bottom main-container">
        <div class="py-1 px-2 box-header rounded-top">Register</div>
        <div class="p-2 pb-0 box-body rounded-bottom">
            <div class="p-2 box-content rounded-top rounded-bottom">
                <h1>Welcome to QuakeWorld.nu</h1>
                <div class="box-content-body">
                    <p>
                    Fill in the form to register a QuakeWorld.nu user account.
                    </p>
                    <p v-if="errors">
                        {{errors.message}}
                        <ul>
                            <li v-for="error in errors.errors">
                                {{error.toString()}}
                            </li>
                        </ul>
                    </p>
                    <form class="col-md-6">
                    <input
                        type="text"
                        class="form-control form-control-sm mt-1"
                        placeholder="username"
                        v-model="user.username"
                        required="true"
                    >
                    <input
                        type="text"
                        class="form-control form-control-sm mt-1"
                        placeholder="email"
                        v-model="user.email"
                        required="true"
                    >
                    <input
                        type="password"
                        class="form-control form-control-sm mt-1"
                        placeholder="password"
                        v-model="user.password"
                        required="true"
                    >
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
            errors: null
        }
    },
    mounted() {
    },
    methods: {
        register() {
            this.loading = true;
            UserService.register(this.user).then(() => {
                this.errors = null;
            })
            .catch((error) => {
                this.errors = error.response.data;
            })
            .finally(() => this.loading = false);
        }
    }
}
</script>
