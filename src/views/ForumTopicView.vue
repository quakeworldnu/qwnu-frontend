<template>
    <div v-if="forumTopic" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">{{forumTopic.name}}</div>
        <div class="box-body">
            <comment-list type="forum" :id="forumTopic.id"></comment-list>
        </div>
    </div>
</template>

<script>
import ForumService from "@/services/ForumService";
import CommentService from "@/services/CommentService";
import CommentList from "@/components/CommentList";
import { parseBbCode } from "@/helpers/BbCode";

export default {
    name: "forum",
    components: {
        CommentList
    },
    props: {
        id: null
    },
    data: function() {
        return {
            forumTopic: null
        };
    },
    mounted() {
        this.getForumTopic(this.id);
    },
    watch: {
        id(value) {
            // Need this watcher in case we click a link to the same page but different forum topic...
            this.getForumTopic(value);
        }
    },
    methods: {
        getForumTopic(forumTopicId) {
            ForumService.getForumTopic(forumTopicId)
                .then(response => {
                    this.forumTopic = response.data;
                })
                .catch(error => {
                    console.log("Error: Could not fetch forum topic.", error);
                });
        }
    }
};
</script>

<style scoped lang="scss">
table {
    //background-image: url("../assets/forum-list-bg.png"); // Using #f0edc9 and "White plaster" filter
    border-style: none;
    margin: 0 0 1em 0;
    width: 100%;
}

td {
    padding: 1em;
    margin: 0;
    color: #706050;
}

th {
    text-transform: uppercase;
    font-size: 0.9em;
    padding: 0.8em;
    color: #fff;
    background-image: url("../assets/bg-header-menu.png");
    border: none;
}

tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 1);
}

tr:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.9);
}
</style>
