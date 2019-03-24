<template>
    <div class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Password reset</div>
        <div class="box-body">
            <div class="box-content">
                <h1>Let's get you a new password</h1>
                <div class="box-content-body">
                    <p>
                    Fill in your E-mail and we'll send a password reset link to you in a flash!
                    </p>
                    <p v-if="error.message">
                        Error: {{error.message}}
                    </p>
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">E-mail</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="email"
                                v-model="request.email"
                                required="true"
                            >
                            <small class="col-sm-4" v-if="error.list.email">{{error.list.email[0]}}</small>
                        </div>

                        <button
                            type="submit"
                            class="btn btn-dark btn-sm bg-dark mt-2"
                            @click.prevent="submitForgotPassword()"
                            v-text="loading ? 'Loading...' : 'Send'"
                            :disabled="loading"
                        ></button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from "@/services/AuthService"

export default {
    name: "register",
    data: function () {
        return {
            loading: false,
            error: {
                message: null,
                list: []
            },
            request: {
                email: null
            }
        }
    },
    mounted() {
    },
    methods: {
        submitForgotPassword() {
            this.loading = true;
            AuthService.sendPasswordResetRequest(this.request).then(() => {
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
