<template>
    <div class="ml-3 mb-2 rounded main-container">
        <div class="box-header">User activation</div>
        <div class="box-body">
            <div class="box-content">
                <div class="box-content-body">
                    <p>
                        <span v-if="isSuccess">
                            <h1>Welcome to QuakeWorld.nu</h1>
                            Your user has been activated and you can now login.
                        </span>
                        <span v-else>
                            <h1>Oops!</h1>
                            Something went wrong.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import UserService from "@/services/UserService"

export default {
    name: "user-activation",
    props: {
        email: null,
        token: null
    },
    data: function () {
        return {
            isSuccess: false
        }
    },
    mounted() {
        UserService.activateUser(this.email, this.token).then(response => {
            if (response.status === 200) {
                this.isSuccess = true;
            }
        }).catch(error => {
            console.log(error);
        });
    },
    methods: {
    }
}
</script>
