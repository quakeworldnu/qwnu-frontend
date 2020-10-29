<template>
    <div v-if="user" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">
            <router-link :to="{ name: 'messages' }">Messages</router-link>
            <i class="fa fa-chevron-right mx-1"></i>
            Conversation with {{ user.username }}
        </div>
        <div class="box-body">
            <div class="box-content">
                <message-form
                    :recipient-id="user.id"
                    @saved="getConversation()"
                ></message-form>
            </div>
        </div>
        <div class="box-body">
            <div class="table-responsive">
                <table class="table">
                    <tr>
                        <th style="width: 180px;">User</th>
                        <th>Last message</th>
                    </tr>
                    <tr v-for="message in messages" :key="message.id">
                        <td>
                            {{ message.sender.username }}
                            <br /><br />

                            <span class="bold">Date</span><br />
                            {{ message.create_time | formatTimestamp }}<br />
                            ({{
                                message.create_time
                                    | formatTimestamp("fromNow")
                            }})
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
import MessageForm from "@/components/MessageForm";
import MessageService from "@/services/MessageService";
import UserService from "@/services/UserService";
import Sorting from "@/models/Sorting";
import { parseBbCode } from "@/helpers/BbCode";

export default {
    name: "messages",
    components: {
        MessageForm
    },
    props: {
        userId: null
    },
    data() {
        return {
            messages: [],
            user: null
        };
    },
    mounted() {
        this.getUser();
        this.getConversation();
    },
    methods: {
        onPageChange() {
            this.getForumCategories();
        },
        getUser() {
            UserService.getUser(this.userId).then(user => {
                this.user = user;
            });
        },
        getConversation() {
            MessageService.getMyConversationByUserId(this.userId)
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
