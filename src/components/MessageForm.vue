<template>
    <div class="box-content">
        <div class="mb-2 rounded">
            <p v-if="!$isLoggedIn">
                You must be logged in to send a new message.
            </p>
            <form v-if="$isLoggedIn">
                <div class="form-group">
                    <textarea
                        class="col-sm-12 form-control"
                        rows="5"
                        placeholder="Message"
                        v-model="message.message"
                        required="true"
                    ></textarea>
                    <small class="col-sm-4" v-if="errors['message']">{{
                        errors["message"][0]
                    }}</small>
                </div>
                <div class="form-group">
                    <button
                        type="submit"
                        class="btn btn-dark btn-sm bg-dark mt-2"
                        v-text="loading ? 'Loading...' : 'Save'"
                        @click.prevent="save()"
                    ></button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Message from "@/models/Message";
import MessageService from "@/services/MessageService";

export default {
    name: "MessageForm",
    props: {
        recipientId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            message: new Message(),
            errors: [],
            loading: false
        };
    },
    methods: {
        getAction() {
            let action = MessageService.createMessageForUser(
                this.recipientId,
                this.message
            );
            return action;
        },
        save() {
            this.loading = true;
            let action = this.getAction();

            action
                .then(response => {
                    this.errors = [];
                    this.message = new Message();
                    this.$emit("saved");
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                })
                .finally(() => (this.loading = false));
        }
    },
    computed: {
        ...mapGetters({
            $isLoggedIn: "isLoggedIn"
        })
    }
};
</script>

<style scoped lang="scss"></style>
