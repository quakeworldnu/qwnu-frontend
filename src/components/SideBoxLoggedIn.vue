<template>
    <div class="mb-2 rounded">
        <div class="box-header">
            <i class="fas fa-key"></i>
            Logged in as {{$currentUser.username}}
        </div>
        <div class="box-body">
            <div class="m-0 box-content">
                <p>
                    <router-link to="/messages" v-if="$can('list_messages')">Messages</router-link><br/>
                    <router-link to="/profile/edit" v-if="$can('edit_user_profile')">Edit profile</router-link><br/>
                    <router-link to="/blog-post/edit" v-if="$can('create_blog_post')">Create blog post</router-link><br/>
                    <router-link to="/admin/user" v-if="$can('create_user')">Create users</router-link><br/>
                    <router-link to="/admin/users" v-if="$can('list_users')">View users</router-link><br/>
                    <router-link to="/admin/article" v-if="$can('create_article')">Create article</router-link><br/>
                    <router-link to="/admin/articles" v-if="$can('list_articles')">View articles</router-link><br/>
                    <router-link to="/admin/comments" v-if="$can('list_comments')">View comments</router-link><br/>
                    <router-link to="/admin/forum-category" v-if="$can('create_forum_category')">Create forum categories</router-link><br/>
                    <router-link to="/admin/forum-categories" v-if="$can('list_forum_categories')">View forum categories</router-link><br/>
                    <router-link to="/admin/forum" v-if="$can('create_forum')">Create forum</router-link><br/>
                    <router-link to="/admin/forums" v-if="$can('list_forums')">View forums</router-link><br/>
                    <router-link to="/admin/roles" v-if="$can('list_roles')">View roles</router-link>
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
    data() {
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
