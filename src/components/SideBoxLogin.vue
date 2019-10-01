<template>
    <div class="mb-2 rounded">
        <div class="box-header">
            <i class="fas fa-key"></i>
            Login
        </div>
        <div class="box-body">
            <div class="m-0 box-content">
                <!-- Login box -->
                <form>
                    <div class="form-group mb-0">
                        <p v-if="error">{{error}}</p>
                        <input
                            type="text"
                            class="form-control form-control-sm mt-1"
                            placeholder="username"
                            v-model="username"
                            required="true"
                        >
                        <input
                            type="password"
                            class="form-control form-control-sm mt-1"
                            placeholder="password"
                            v-model="password"
                            required="true"
                        >
                        <button
                            type="submit"
                            class="btn btn-dark btn-sm bg-dark mt-2"
                            @click.prevent="login()"
                        >Login</button>
                        <div class="mt-1">
                            <router-link to="/register">Register</router-link> |
                            <router-link to="/forgot-password">Forgot password</router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AuthService from "@/services/AuthService"

export default {
    name: "SideBoxLogin",
    props: {},
    data() {
        return {
            username: null,
            password: null,
            error: null
        }
    },
    methods: {
        ...mapActions({
            $login: 'login'
        }),
        login() {
            let credentials = { username: this.username, password: this.password };
            this.$login(credentials).then(() => {
                if (this.$isLoggedIn) {
                    this.clearForm();
                } else {
                    this.error = "Incorrect username or password.";
                }
            })
        },
        clearForm() {
            this.error = null
            this.username = null
            this.password = null
        }
    },
    computed: {
        ...mapGetters({
            $isLoggedIn: 'isLoggedIn'
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
