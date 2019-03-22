<template>
  <div class="ml-3 mb-2 rounded-top rounded-bottom main-container">
    <div class="py-1 px-2 box-header rounded-top" v-if="forumTopic">{{forumTopic.name}}</div>
    <div class="p-2 pb-0 box-body rounded-bottom">
      <div class="p-1 rounded-top rounded-bottom table-responsive" v-if="forumTopic">
        <comment-list type="forum" :id="forumTopic.id"></comment-list>
      </div>

    </div>
  </div>
</template>

<script>
import ForumService from "@/services/ForumService"
import CommentService from "@/services/CommentService"
import CommentList from "@/components/CommentList"
import { parseBbCode } from "@/helpers/BbCode"

export default {
    name: "forum",
    components: {
        CommentList
    },
    data: function() {
        return {
            forumTopic: null
        }
    },
    mounted() {
        this.getForumTopic(this.$route.params.id)
    },
    methods: {
        onPageChange() {
        },
        getForumTopic(forumTopicId) {
            ForumService.getForumTopic(forumTopicId)
                .then(response => {
                    this.forumTopic = response.data
                })
                .catch(error => {
                    console.log("Error: Could not fetch forum topic.", error)
                })
        }
    }
}
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
