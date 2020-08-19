<template>
    <div v-if="forumTopic" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">
            <router-link :to="{ name: 'forums' }">Forum</router-link>
            <i class="fa fa-chevron-right mx-1"></i>
            <router-link
                :to="{ name: 'forum', params: { id: forumTopic.forum.id } }"
                >{{ forumTopic.forum.name }}</router-link
            >
            <i class="fa fa-chevron-right mx-1"></i>
            {{ forumTopic.name }}
        </div>
        <div class="box-body">
            <div class="box-content mb-2">
                <div class="mb-2 rounded">
                    <h1>
                        {{ forumTopic.name }}
                    </h1>
                    <div>
                        <div class="comment-date">
                            {{ forumTopic.create_time | formatTimestamp }}
                            by {{ forumTopic.comment.author.username }}
                        </div>
                        <div
                            class="comment-content"
                            v-html="bbCode(forumTopic.comment.content)"
                        ></div>
                    </div>
                </div>
            </div>

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
    data() {
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
                .then(forumTopic => {
                    this.forumTopic = forumTopic;
                })
                .catch(error => {
                    console.log("Error: Could not fetch forum topic.", error);
                });
        },
        bbCode(value) {
            return parseBbCode(value);
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
