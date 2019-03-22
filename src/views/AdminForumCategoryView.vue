<template>
    <div v-if="forumCategory" class="ml-3 mb-2 rounded-top rounded-bottom main-container">
        <div class="py-1 px-2 box-header rounded-top">Administrate forum category</div>
        <div class="p-2 pb-0 box-body rounded-bottom">
            <div class="p-3 box-content rounded-top rounded-bottom">
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
                            <div class="col-sm-2">Private</div>
                            <div class="col-sm-4">
                                <div class="form-check">
                                    <input
                                        type="checkbox"
                                        class="form-check-input"
                                        placeholder="Position"
                                        v-model="forumCategory.is_private"
                                        required="true"
                                    >
                                </div>
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
                            v-if="!isNew && $can('delete_forum_category')"
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

export default {
    name: "adminForumCategory",
    data: function() {
        return {
            loading: false,
            forumCategory: {
            },
            error: {
                message: null,
                list: []
            }
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.getForumCategory()
        }
    },
    methods: {
        getForumCategory() {
            ForumService.getForumCategory(this.$route.params.id)
                .then(response => {
                    this.forumCategory = response.data
                })
                .catch(error => {
                    console.log("Error: Could not fetch forum category.", error)
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
                    console.log("Success!")
                })
                .catch(error => {
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                    console.log("Could not update forum category.")
                })
                .finally(() => (this.loading = false))
        },
        createForumCategory() {
            ForumService.createForumCategory(this.forumCategory)
                .then(response => {
                    this.error.message = null;
                    this.error.list = [];
                    console.log("Success!")
                })
                .catch(error => {
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                    console.log("Could not create forum category.")
                })
                .finally(() => (this.loading = false))
        },
        deleteForumCategory() {
            ForumService.deleteForumCategory(this.forumCategory.id)
                .then(response => {
                    this.$router.push({ path: "/admin/forum-categories" })
                })
                .catch(error => {
                    console.log(error)
                    console.log("Could not delete forum category.")
                })
        }
    },
    computed: {
        isNew() {
            return this.forumCategory.id === null;
        }
    }
}
</script>
