<template>
    <div v-if="forumCategory" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Administrate forum category</div>
        <div class="box-body">
            <div class="box-content">
                <h1>{{forumCategory.name}}</h1>
                <div class="box-content-body">
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Name</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="Name"
                                v-model="forumCategory.name"
                                required="true"
                            >
                            <small class="col-sm-4" v-if="error.list.name">{{error.list.name[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-2 col-form-label">Private</div>
                            <div class="col-sm-4 form-check">
                                <input
                                    type="checkbox"
                                    class="form-check-input"
                                    v-model="forumCategory.is_private"
                                    required="true"
                                > {{forumCategory.is_private ? 'Yes' : 'No'}}
                            </div>
                            <small class="col-sm-4" v-if="error.list.is_private">{{error.list.is_private[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Position</label>
                            <input
                                type="number"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="Position"
                                v-model="forumCategory.position"
                                required="true"
                            >
                            <small class="col-sm-4" v-if="error.list.position">{{error.list.position[0]}}</small>
                        </div>

                        <button
                            type="submit"
                            class="btn btn-dark btn-sm bg-dark mt-2"
                            @click.prevent="saveForumCategory()"
                            v-text="loading ? 'Loading...' : 'Save'"
                            :disabled="loading"
                        ></button>
                    </form>
                </div>
                <div class="box-content-footer">&nbsp;
                    <div class="float-right">
                        <confirm-button
                            v-if="!forumCategory.isNew && $can('delete_forum_category')"
                            icon="fa-trash"
                            text="Really delete this forum category?"
                            @confirm="deleteForumCategory()"
                        ></confirm-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ForumService from "@/services/ForumService"
import ForumCategory from "@/models/ForumCategory"

export default {
    name: "adminForumCategory",
    props: {
        id: null
    },
    data() {
        return {
            loading: false,
            forumCategory: new ForumCategory(),
            error: {
                message: null,
                list: []
            }
        }
    },
    mounted() {
        if (this.id) {
            this.getForumCategory()
        }
    },
    methods: {
        getForumCategory() {
            ForumService.getForumCategory(this.id)
                .then(response => {
                    this.forumCategory = response.data
                })
                .catch(error => {
                    this.$toasted.error('Could not fetch forum category');
                })
        },
        saveForumCategory() {
            this.loading = true

            if (this.forumCategory.id) {
                this.updateForumCategory();
            } else {
                this.createForumCategory();
            }
        },
        updateForumCategory() {
            ForumService.updateForumCategory(this.forumCategory.id, this.forumCategory)
                .then(response => {
                    this.error.message = null;
                    this.error.list = [];
                    this.$toasted.success('Forum category updated');
                })
                .catch(error => {
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                    this.$toasted.error('Could not update forum category');
                })
                .finally(() => (this.loading = false))
        },
        createForumCategory() {
            ForumService.createForumCategory(this.forumCategory)
                .then(response => {
                    this.error.message = null;
                    this.error.list = [];
                    this.$toasted.success('Forum category saved');
                })
                .catch(error => {
                    this.$toasted.error('Could not create forum category');
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                })
                .finally(() => (this.loading = false))
        },
        deleteForumCategory() {
            ForumService.deleteForumCategory(this.forumCategory.id)
                .then(response => {
                    this.$toasted.success('Forum category deleted');
                    this.$router.push({ path: "/admin/forum-categories" })
                })
                .catch(error => {
                    this.$toasted.error('Could not delete forum category');
                    console.log(error)
                })
        }
    },
    computed: {}
}
</script>
