<template>
    <div class="box-content">
        <div class="mb-2 rounded">
            <h2>Comment</h2>
            <p v-if="!$isLoggedIn">
                You must be logged in to make comments.
            </p>
            <comment-form
                v-if="$isLoggedIn"
                :id="id"
                :type="type"
                :comment="editedComment"
                @saved="saved"
            ></comment-form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Comment from "@/models/Comment";
import CommentService from "@/services/CommentService";
import CommentForm from "@/components/CommentForm";

export default {
    name: "CommentBox",
    components: {
        CommentForm
    },
    props: {
        id: {
            // id of commented news post or similar
            type: Number,
            required: false
        },
        type: {
            // 'news', 'blog', 'forum'
            type: String,
            required: false,
            validator: function(value) {
                // The value must match one of these strings
                return (
                    ["article", "config", "forum", "blogPost"].indexOf(
                        value
                    ) !== -1
                );
            }
        }
    },
    data() {
        return {
            editedComment: new Comment({})
        };
    },
    methods: {
        saved() {
            this.$emit("saved");
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
