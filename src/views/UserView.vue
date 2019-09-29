<template>
    <div v-if="user" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">
            <router-link :to="{name: 'users'}">Users</router-link>
            / {{user.username}}
        </div>
        <div class="box-body">
            <div class="m-0 box-content">
                TODO
            </div>
        </div>
    </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
    name: "User",
    props: {
        id: null
    },
    data: function() {
        return {
            user: null
        };
    },
    mounted() {
        this.getUser();
    },
    methods: {
        getUser() {
            UserService.getUser(this.id)
                .then(response => {
                    this.user = response.data;
                })
                .catch(error => {
                    console.log("Error: Could not fetch user.", error);
                });
        }
    },
    watch: {
        id(value) {
            this.getUser();
        }
    }
};
</script>
<style scoped lang="scss">
</style>
