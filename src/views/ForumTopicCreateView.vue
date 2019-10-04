<template>
    <div v-if="forum" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">
            <router-link :to="{name: 'forums'}">Forum</router-link>
            <i class="fa fa-chevron-right mx-1"></i>
            <router-link :to="{name: 'forum', params: {id: forum.id}}">{{forum.name}}</router-link>
            <i class="fa fa-chevron-right mx-1"></i>
            New topic
        </div>
        <div class="box-body">
            <forum-topic-form :id="id" @saved="forumTopicId => redirectToForumTopic(forumTopicId)"></forum-topic-form>
        </div>
    </div>
</template>

<script>
import ForumService from "@/services/ForumService";
import CommentService from "@/services/CommentService";
import ForumTopicForm from "@/components/ForumTopicForm";
import { parseBbCode } from "@/helpers/BbCode";

export default {
    name: "forum",
    components: {
        ForumTopicForm
    },
    props: {
        id: null
    },
    data() {
        return {
            forum: null
        };
    },
    mounted() {
        this.getForum(this.id);
    },
    watch: {
        id(value) {
            this.getForum(value);
        }
    },
    methods: {
        getForum(forumId) {
            ForumService.getForum(forumId)
                .then(response => {
                    this.forum = response.data;
                })
                .catch(error => {
                    console.log("Error: Could not fetch forum.", error);
                });
        },
        redirectToForumTopic(forumTopicId) {
            this.$router.push({
                name: "forumTopic",
                params: { id: forumTopicId }
            });
        }
    }
};
</script>

<style scoped lang="scss">
</style>
