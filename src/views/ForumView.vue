<template>
    <div v-if="forum" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">
            <router-link :to="{name: 'forums'}">Forum</router-link> <i class="fa fa-chevron-right mx-1"></i>
            {{forum.name}}
        </div>
        <div class="box-body">
            <div class="mb-2">
                <router-link v-if="$can('create_forum_topic')" :to="{name: 'forumTopicCreate'}" tag="button" class="btn btn-sm btn-info">
                    New topic
                </router-link>
            </div>
            <div class="table-responsive">
                <table class="table" v-if="forumTopics.length > 0">
                    <tr>
                        <th>Topic</th>
                        <th style="width: 120px;">Replies</th>
                        <th style="width: 200px;">Latest post</th>
                    </tr>
                    <tr v-for="forumTopic in forumTopics" :key="forumTopic.id">
                        <td>
                            <strong>
                                <i v-if="forumTopic.sticky" class="fas fa-thumbtack mr-1" title="Stickied topic"></i>
                                <router-link
                                    :to="{name: 'forumTopic', params: { id: forumTopic.id}}"
                                >
                                {{forumTopic.name}}
                                </router-link>
                            </strong>
                            <br/>
                            <span v-if="forumTopic.comment">
                                {{forumTopic.comment.author.username}}
                            </span>
                            <br>
                        </td>
                        <td>{{forumTopic.num_posts}}</td>
                        <td>
                            {{forumTopic.last_post_time | formatTimestamp('fromNow')}}<br/>
                            {{forumTopic.last_author.username}}
                        </td>
                    </tr>
                </table>
            </div>

            <div class="bg-light p-2 rounded">
                <pagination
                    :records="pagination.totalRecords"
                    :per-page="pagination.pageSize"
                    v-model="pagination.page"
                    @paginate="onPageChange"
                ></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import ForumService from "@/services/ForumService";
import { parseBbCode } from "@/helpers/BbCode";
import Pagination from "@/models/Pagination"
import Sorting from "@/models/Sorting"

export default {
    name: "forum",
    props: {
        id: null
    },
    data() {
        return {
            forum: null,
            forumTopics: [],
            pagination: new Pagination(),
            sorting: new Sorting({
                sort: "create_time",
                order: "desc"
            })
        };
    },
    mounted() {
        this.getForum(this.id);
        this.getForumTopics(this.id);
    },
    methods: {
        onPageChange() {
            this.getForumTopics(this.id);
        },
        getForum(forumId) {
            ForumService.getForum(forumId)
                .then(response => {
                    this.forum = response.data;
                })
                .catch(error => {
                    console.log("Error: Could not fetch forum.", error);
                });
        },
        getForumTopics(forumId) {
            ForumService.getForumTopicsForForum(forumId, this.pagination, this.sorting)
                .then(response => {
                    this.forumTopics = response.forumTopics;
                    this.pagination = response.pagination;
                })
                .catch(error => {
                    console.log("Error: Could not fetch forum topics.", error);
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
