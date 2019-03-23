<template>
  <div v-if="forum" class="ml-3 mb-2 rounded-top rounded-bottom main-container">
    <div class="py-1 px-2 box-header rounded-top">Forum: {{forum.name}}</div>
    <div class="p-2 pb-0 box-body rounded-bottom">
      <div class="p-1 rounded-top rounded-bottom table-responsive">
        <table class="table" v-if="forumTopics.length > 0">
          <tr>
            <th>Topic</th>
            <th style="width: 120px;">Replies</th>
            <th style="width: 200px;">Latest post</th>
          </tr>
          <tr v-for="forumTopic in forumTopics" :key="forumTopic.id">
            <td>
              <strong>
                <router-link :to="{name: 'forumTopic', params: { id: forumTopic.id}}">{{forumTopic.name}}</router-link>
              </strong>
              <br>
            </td>
            <td>{{forumTopic.num_posts}}</td>
            <td>
              By {{forumTopic.last_author.username}}
              <br>
              {{forumTopic.create_time | formatUnixTimestamp}}
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
import ForumService from "@/services/ForumService"
import { parseBbCode } from "@/helpers/BbCode"

export default {
    name: "forum",
    props: {
        id: null
    },
    data: function() {
        return {
            forum: null,
            forumTopics: [],
            pagination: {
                page: 1,
                sort: "create_time",
                order: "desc",
                pageSize: 1,
                totalRecords: 0
            }
        }
    },
    mounted() {
        this.getForum(this.id)
        this.getForumTopics(this.id)
    },
    methods: {
        onPageChange() {
            this.getForumTopics(this.id)
        },
        getForum(forumId) {
            ForumService.getForum(forumId)
                .then(response => {
                    this.forum = response.data
                })
                .catch(error => {
                    console.log("Error: Could not fetch forum.", error)
                })
        },
        getForumTopics(forumId) {
            ForumService.getForumTopicsByForum(forumId, this.pagination)
                .then(response => {
                    this.pagination.totalRecords = response.data.total;
                    this.pagination.pageSize = response.data.per_page;

                    this.forumTopics = response.data.data
                })
                .catch(error => {
                    console.log("Error: Could not fetch forum topics.", error)
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
