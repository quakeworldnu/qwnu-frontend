<template>
    <div class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Messages</div>
        <div class="box-body">
            <div class="table-responsive">
                <table class="table">
                    <tr>
                        <th style="width: 180px;">User</th>
                        <th>Last message</th>
                    </tr>
                    <tr v-for="message in messages" :key="message.id">
                        <td>
                            {{ message.getCounterpart($user).username
                            }}<br /><br />

                            <span class="bold">Date</span><br />
                            {{ message.create_time | formatTimestamp }}<br />
                            ({{
                                message.create_time
                                    | formatTimestamp("fromNow")
                            }}) <br /><br />
                            <router-link
                                :to="{
                                    name: 'conversation',
                                    params: {
                                        userId: message.getCounterpart($user).id
                                    }
                                }"
                            >
                                To full conversation >>
                            </router-link>
                        </td>
                        <td>
                            <span v-html="bbCode(message.message)"></span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import MessageService from "@/services/MessageService";
import Sorting from "@/models/Sorting";
import { parseBbCode } from "@/helpers/BbCode";

export default {
    name: "messages",
    data() {
        return {
            messages: []
        };
    },
    mounted() {
        this.getMyConversations();
    },
    methods: {
        onPageChange() {
            this.getForumCategories();
        },
        getMyConversations() {
            MessageService.getMyConversations()
                .then(messages => {
                    this.messages = messages;
                })
                .catch(error => {
                    console.log("Error: Could not fetch conversations.", error);
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
