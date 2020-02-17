<template>
    <div v-if="forum" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Administrate forum</div>
        <div class="box-body">
            <div class="box-content">
                <h1>{{forum.name}}</h1>
                <div class="box-content-body">
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Name</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="Name"
                                v-model="forum.name"
                                required="true"
                            >
                            <small class="col-sm-4" v-if="error.list.name">{{error.list.name[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Description</label>
                            <textarea
                                class="col-sm-6 form-control form-control-sm"
                                rows="5"
                                placeholder="Description"
                                v-model="forum.description"
                                required="true"
                            ></textarea>
                            <small class="col-sm-4" v-if="error.list.description">{{error.list.description[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Category</label>
                            <select v-model="forum.cat_id">
                                <option
                                    v-for="forumCategory in forumCategories"
                                    :key="forumCategory.id"
                                    :value="forumCategory.id"
                                >
                                    {{forumCategory.name}}
                                </option>
                            </select>
                            <small
                                class="col-sm-4"
                                v-if="error.list.cat_id"
                            >{{error.list.cat_id[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Position</label>
                            <input
                                type="number"
                                class="col-sm-4 form-control form-control-sm"
                                placeholder="Position"
                                v-model="forum.position"
                                required="true"
                            >
                            <small class="col-sm-4" v-if="error.list.position">{{error.list.position[0]}}</small>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-2">Private</div>
                            <div class="col-sm-4">
                                <div class="form-check">
                                    <input
                                        type="checkbox"
                                        class="form-check-input"
                                        placeholder="Position"
                                        v-model="forum.is_private"
                                        required="true"
                                    >
                                </div>
                            </div>
                            <small class="col-sm-4" v-if="error.list.is_private">{{error.list.is_private[0]}}</small>
                        </div>

                        <button
                            type="submit"
                            class="btn btn-dark btn-sm bg-dark mt-2"
                            @click.prevent="saveForum()"
                            v-text="loading ? 'Loading...' : 'Save'"
                            :disabled="loading"
                        ></button>
                    </form>
                </div>
                <div class="box-content-footer">&nbsp;
                    <div class="float-right">
                        <confirm-button
                            v-if="!isNew && $can('delete_forum')"
                            icon="fa-trash"
                            text="Really delete this forum?"
                            @confirm="deleteForum()"
                        ></confirm-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ForumService from "@/services/ForumService"
import Sorting from "@/models/Sorting"

export default {
    name: "adminForum",
    props: {
        id: null
    },
    data() {
        return {
            loading: false,
            forum: {
            },
            error: {
                message: null,
                list: []
            },
            forumCategories: [],
            sorting: new Sorting({
                sort: "name",
                order: "asc"
            })
        }
    },
    mounted() {
        if (this.id) {
            this.getForum()
        }
        this.getForumCategories();
    },
    methods: {
        getForum() {
            ForumService.getForum(this.id)
                .then(response => {
                    this.forum = response.data
                })
                .catch(error => {
                    console.log("Error: Could not fetch forum.", error)
                })
        },
        saveForum() {
            this.loading = true

            if (this.forum.id) {
                this.updateForum();
            } else {
                this.createForum();
            }
        },
        updateForum() {
            ForumService.updateForum(this.forum.id, this.forum)
                .then(response => {
                    this.error.message = null;
                    this.error.list = [];
                    console.log("Success!")
                })
                .catch(error => {
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                    console.log("Could not update forum.")
                })
                .finally(() => (this.loading = false))
        },
        createForum() {
            ForumService.createForum(this.forum)
                .then(response => {
                    this.error.message = null;
                    this.error.list = [];
                    console.log("Success!")
                })
                .catch(error => {
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                    console.log("Could not create forum.")
                })
                .finally(() => (this.loading = false))
        },
        deleteForum() {
            ForumService.deleteForum(this.forum.id)
                .then(response => {
                    this.$router.push({ path: "/admin/forums" })
                })
                .catch(error => {
                    console.log(error)
                    console.log("Could not delete forum.")
                })
        },
        getForumCategories() {
            ForumService.getForumCategories(false, this.sorting)
                .then(response => {
                    this.forumCategories = response.forumCategories;
                })
                .catch(error => {
                    console.log(error);
                    console.log("Could not fetch forum categories.")
                })
        }
    },
    computed: {
        isNew() {
            return this.forum.id === null;
        }
    }
}
</script>
