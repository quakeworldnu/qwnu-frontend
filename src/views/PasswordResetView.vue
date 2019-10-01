<template>
    <div class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Reset password</div>
        <div class="box-body">
            <div class="box-content">
                <h1>Reset your password</h1>
                <!-- Before sending -->
                <div v-if="!isSuccess" class="box-content-body">
                    <p>
                    Please set a new password for your account.
                    </p>
                    <p v-if="error.message">
                        Error: {{error.message}}
                    </p>
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Token</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="token"
                                v-model="request.token"
                                required="true"
                                disabled="true"
                            >
                            <small class="col-sm-4" v-if="error.list.token">{{error.list.token[0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">E-mail</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                v-model="request.email"
                                required="true"
                                disabled="true"
                            >
                            <small class="col-sm-4" v-if="error.list.email">{{error.list.email[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Password</label>
                            <input
                                type="password"
                                class="col-sm-4 form-control form-control-sm"
                                v-model="request.password"
                                required="true"
                            >
                            <small class="col-sm-4" v-if="error.list.password">{{error.list.password[0]}}</small>
                        </div>

                        <button
                            type="submit"
                            class="btn btn-dark btn-sm bg-dark mt-2"
                            @click.prevent="submitSetPassword()"
                            v-text="loading ? 'Loading...' : 'Send'"
                            :disabled="loading"
                        ></button>
                    </form>
                </div>

                <!-- Success -->
                <div v-if="isSuccess" class="box-content-body">
                    You have successfully reset your password and can now login.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from "@/services/AuthService"

export default {
    name: "register",
    data() {
        return {
            loading: false,
            error: {
                message: null,
                list: []
            },
            request: {
                token: '',
                email: '',
                password: ''
            },
            isSuccess: false
        }
    },
    mounted() {
        this.request.email = this.$route.query.email;
        this.request.token = this.$route.query.token;
    },
    methods: {
        submitSetPassword() {
            this.loading = true;
            AuthService.resetPassword(this.request).then(() => {
                this.isSuccess = true;
                this.error.message = null;
                this.error.list = [];
            })
            .catch((error) => {
                this.error.message = error.response.data.message;
                if (error.response.data.errors) {
                    this.error.list = error.response.data.errors;
                }
            })
            .finally(() => this.loading = false);
        }
    }
}
</script>
