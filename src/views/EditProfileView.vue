<template>
    <div v-if="user" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">Edit profile</div>
        <div class="box-body">
            <div class="box-content">
                <h1>{{user.username}}</h1>
                <div class="box-content-body">
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Username</label>
                            <input
                                type="text"
                                class="col-sm-6 form-control form-control-sm"
                                disabled="true"
                                v-model="user.username"
                            >
                            <small class="col-sm-4" v-if="errors.username">{{errors.username[0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">E-mail</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.email">
                            <small class="col-sm-4" v-if="errors.email">{{errors.email[0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Password</label>
                            <input
                                type="password"
                                class="col-sm-6 form-control form-control-sm"
                                v-model="user.password"
                            >
                            <small class="col-sm-4" v-if="errors.password">{{errors.password[0]}}</small>
                        </div>

                        <h2>Profile</h2>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">First name</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.firstname">
                            <small class="col-sm-4" v-if="errors['profile.firstname']">{{errors['profile.firstname'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Last name</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.lastname">
                            <small class="col-sm-4" v-if="errors['profile.lastname']">{{errors['profile.lastname'][0]}}</small>
                        </div>
                        <!--
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Birthday</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.borthday">
                            <small class="col-sm-4" v-if="errors['profile.birthday']">{{errors['profile.birthday'][0]}}</small>
                        </div>
                        -->
                        <!-- Should be select!
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Nationality</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.nationality">
                            <small class="col-sm-4" v-if="errors['profile.nationality']">{{errors['profile.nationality'][0]}}</small>
                        </div>
                        -->
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Location</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.location">
                            <small class="col-sm-4" v-if="errors['profile.location']">{{errors['profile.location'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Signature</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.signature">
                            <small class="col-sm-4" v-if="errors['profile.signature']">{{errors['profile.signature'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Description</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.description">
                            <small class="col-sm-4" v-if="errors['profile.description']">{{errors['profile.description'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Website</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.website">
                            <small class="col-sm-4" v-if="errors['profile.website']">{{errors['profile.website'][0]}}</small>
                        </div>

                        <h2>Social media</h2>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Facebook</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.facebook">
                            <small class="col-sm-4" v-if="errors['profile.facebook']">{{errors['profile.facebook'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Twitter</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.twitter">
                            <small class="col-sm-4" v-if="errors['profile.twitter']">{{errors['profile.twitter'][0]}}</small>
                        </div>

                        <h2>Computer specs</h2>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">CPU</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.cpu">
                            <small class="col-sm-4" v-if="errors['profile.cpu']">{{errors['profile.cpu'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">RAM</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.ram">
                            <small class="col-sm-4" v-if="errors['profile.ram']">{{errors['profile.ram'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Monitor</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.monitor">
                            <small class="col-sm-4" v-if="errors['profile.monitor']">{{errors['profile.monitor'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Graphics card</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.gfx">
                            <small class="col-sm-4" v-if="errors['profile.gfx']">{{errors['profile.gfx'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Sound card</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.soundcard">
                            <small class="col-sm-4" v-if="errors['profile.soundcard']">{{errors['profile.soundcard'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Mouse</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.mouse">
                            <small class="col-sm-4" v-if="errors['profile.mouse']">{{errors['profile.mouse'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Mouse pad</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.mousepad">
                            <small class="col-sm-4" v-if="errors['profile.mousepad']">{{errors['profile.mousepad'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Keyboard</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.keyboard">
                            <small class="col-sm-4" v-if="errors['profile.keyboard']">{{errors['profile.keyboard'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Headset</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.headset">
                            <small class="col-sm-4" v-if="errors['profile.headset']">{{errors['profile.headset'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Connection</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.connection">
                            <small class="col-sm-4" v-if="errors['profile.connection']">{{errors['profile.connection'][0]}}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Operating system</label>
                            <input type="text" class="col-sm-6 form-control form-control-sm" v-model="user.profile.os">
                            <small class="col-sm-4" v-if="errors['profile.os']">{{errors['profile.os'][0]}}</small>
                        </div>
                        <button class="btn btn-sm btn-dark" @click.prevent="saveProfile()">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import UserService from "@/services/UserService"
import { parseBbCode } from "@/helpers/BbCode"
import User from "@/models/User"

export default {
    name: "editProfile",
    data() {
        return {
            errors: {
                profile: {}
            },
            user: new User()
        }
    },
    mounted() {
        this.getUser()
    },
    methods: {
        ...mapActions({
            $updateProfile: "updateProfile"
        }),
        getUser() {
            UserService.getUser(this.$currentUser.id)
                .then(user => {
                    this.user = user
                })
                .catch(error => {
                    console.log("Error: Could not fetch user.", error)
                })
        },
        saveProfile() {
            this.$updateProfile(this.user)
                .then(response => {
                    this.errors = {
                        profile: {}
                    };
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                });
        }
    },
    computed: {
        ...mapGetters({
            $currentUser: "user"
        })
    }
}
</script>
