<template>
  <div class="box-content">
    <div class="mb-2 rounded">
      <p v-if="!$isLoggedIn">
          You must be logged in to make new forum topics.
      </p>
      <form v-if="$isLoggedIn">
        <div class="form-group">
          <!-- <p v-if="error.message">Error: {{error.message}}</p> -->
        </div>
        <div class="form-group">
            <input
                type="text"
                class="col-sm-12 form-control form-control-sm"
                placeholder="Title"
                v-model="forumTopic.name"
                required="true"
            >
            <small class="col-sm-4" v-if="errors.name">{{errors.name[0]}}</small>
        </div>
        <div class="form-group">
          <textarea
            class="col-sm-12 form-control"
            rows="5"
            placeholder="Content"
            v-model="forumTopic.comment.content"
            required="true"
          ></textarea>
          <small class="col-sm-4" v-if="errors['comment.content']">{{errors['comment.content'][0]}}</small>
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
import { mapActions, mapGetters } from 'vuex'
import ForumService from "@/services/ForumService"
import ForumTopic from "@/models/ForumTopic"

export default {
    name: "ForumTopicForm",
    props: {
        id: {
            //type: Number,
            required: true
        }
    },
    data() {
        return {
            forumTopic: new ForumTopic(),
            errors: [],
            loading: false
        }
    },
    methods: {
        getAction() {
            let action = ForumService.createForumTopicForForum(this.id, this.forumTopic)
            return action
        },
        save() {
            this.loading = true
            let action = this.getAction()

            action
                .then(response => {
                    let forumTopicId = response.data.id;
                    this.errors = []
                    this.forumTopic = {}
                    this.$emit("saved", forumTopicId)
                })
                .catch((error) => {
                    this.errors = error.response.data.errors;
                })
                .finally(() => this.loading = false)
        }
    },
    computed: {
        ...mapGetters({
            $isLoggedIn: 'isLoggedIn'
        })
    }
}
</script>

<style scoped lang="scss">
</style>
