<template>
    <div class="mb-2 rounded">
        <div class="box-header">
            <i class="fas fa-key m-1"></i>
            Logged in as {{$currentUser.username}}
        </div>
        <div class="box-body">
            <div class="m-0 box-content">
                <p>
                    <router-link to="/profile/edit" v-if="$can('edit_user_profile')">Edit profile</router-link><br/>
                    <router-link to="/admin/users" v-if="$can('list_users')">Admin users</router-link><br/>
                    <router-link to="/admin/articles" v-if="$can('list_articles')">Admin articles</router-link><br/>
                    <router-link to="/admin/comments" v-if="$can('list_comments')">Admin comments</router-link><br/>
                    <router-link to="/admin/forum-categories" v-if="$can('list_forum_categories')">Admin forum categories</router-link><br/>
                    <router-link to="/admin/forums" v-if="$can('list_forums')">Admin forums</router-link>
                </p>
                <button
                    type="submit"
                    class="btn btn-dark btn-sm bg-dark mt-2"
                    @click="logout()"
                >Logout</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AuthService from '@/services/AuthService';
import store from '@/store';

export default {
    name: "SideBoxLoggedIn",
    data: function() {
        return {
            username: null,
            password: null,
            error: null
        };
    },
    methods: {
        ...mapActions({
            $logout: 'logout'
        }),
        logout() {
            this.$logout();
            this.$router.push({ path: "/" });
        },
        clearForm() {
            this.error = null;
            this.username = null;
            this.password = null;
        }
    },
    computed: {
        ...mapGetters({
            $currentUser: 'user'
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
