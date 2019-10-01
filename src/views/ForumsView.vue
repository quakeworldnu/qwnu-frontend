<template>
    <div class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Forums</div>
        <div class="box-body">
            <table v-for="forumCategory in forumCategories" :key="forumCategory.id" class="table">
                <tr>
                    <th>{{forumCategory.name}}</th>
                    <th style="width: 120px;">Topics</th>
                    <th style="width: 120px;">Posts</th>
                    <th style="width: 200px;">Latest post</th>
                </tr>
                <tr v-for="forum in forumCategory.forums" :key="forum.id">
                    <td>
                        <strong>
                            <router-link
                                :to="{name: 'forum', params: { id: forum.id}}"
                            >{{forum.name}}</router-link>
                        </strong>
                        <br>
                        <span v-html="bbCode(forum.description)"></span>
                    </td>
                    <td>{{forum.num_topics}}</td>
                    <td>{{forum.num_posts}}</td>
                    <td>
                        by {{forum.latest_updated_topic.last_author.username}}
                        <br>
                        {{forum.latest_updated_topic.create_time | formatUnixTimestamp}}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import ForumService from "@/services/ForumService";
import { parseBbCode } from "@/helpers/BbCode";

export default {
    name: "forums",
    data() {
        return {
            forumCategories: []
        };
    },
    mounted() {
        this.getForumCategories();
    },
    methods: {
        onPageChange() {
            this.getForumCategories();
        },
        getForumCategories() {
            ForumService.getPublicForumCategories(this.pagination)
                .then(response => {
                    this.forumCategories = response.data.data;
                })
                .catch(error => {
                    console.log("Error: Could not fetch forums.", error);
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

table:last-of-type {
    margin-bottom: 0;
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
