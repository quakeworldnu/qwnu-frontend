<template>
    <div v-if="user" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">
            <router-link :to="{name: 'users'}">Users</router-link>
            / {{user.username}}
        </div>
        <div class="box-body">
            <div class="box-content">
                <div class="row">
                    <div v-if="user.profile.picture" class="col-md-2">
                        <div class="user__avatar-container">
                            <img :src="avatarPath(user.profile.picture)" class="user__avatar center"/>
                        </div>
                    </div>
                    <div v-bind:class="{ 'col-md-10': user.profile.picture, 'col-md-12': !user.profile.picture }">
                        <div class="user__info-container">
                            <table class="user__info col-md-12 table-responsive-md">
                                <tr>
                                    <th>Name</th><td>{{user.profile.firstname}} {{user.profile.lastname}}</td>
                                    <th>Age</th><td>{{getAge(user.profile.birthday)}}</td>
                                    <th>Account Status</th><td>{{getStatus(user.status)}}</td>
                                </tr>
                                <tr>
                                    <th>Location</th><td>{{user.profile.location}}</td>
                                    <th>Registered</th><td>{{user.createtime | formatTimestamp('YYYY-MM-DD')}}</td>
                                    <th></th><td></td>
                                </tr>
                                <tr>
                                    <th>Nationality</th><td>{{user.profile.nation ? user.profile.nation.name : ''}}</td>
                                    <th>Last visit</th><td>{{user.lastvisit | formatTimestamp('YYYY-MM-DD')}}</td>
                                    <th></th><td></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="user__description" v-html="bbCode(user.profile.description)"></div>
                </div>

                <h1>Equipment</h1>
                <div class="row">
                    <div class="col-md-6">
                        <table class="table">
                            <tr><th>Monitor</th><td>{{user.profile.monitor}}</td></tr>
                            <tr><th>Graphics card</th><td>{{user.profile.gfx}}</td></tr>
                            <tr><th>CPU</th><td>{{user.profile.cpu}}</td></tr>
                            <tr><th>RAM</th><td>{{user.profile.ram}}</td></tr>
                            <tr><th>Operating system</th><td>{{user.profile.os}}</td></tr>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <table class="table">
                            <tr><th>Mouse</th><td>{{user.profile.mouse}}</td></tr>
                            <tr><th>Mouse pad</th><td>{{user.profile.mousepad}}</td></tr>
                            <tr><th>Keyboard</th><td>{{user.profile.keyboard}}</td></tr>
                            <tr><th>Headset</th><td>{{user.profile.headset}}</td></tr>
                            <tr><th>Sound card</th><td>{{user.profile.soundcard}}</td></tr>
                            <tr><th>Connection</th><td>{{user.profile.connection}}</td></tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from "@/services/UserService";
import { parseBbCode } from "@/helpers/BbCode"
import moment from 'moment';

export default {
    name: "User",
    props: {
        id: null
    },
    data() {
        return {
            user: null
        };
    },
    mounted() {
        this.getUser();
    },
    methods: {
        getAge(birthday) {
            if (birthday) {
                birthday = moment.unix(birthday);
                return moment().diff(birthday, 'years');
            }
        },
        getStatus(status) {
            if (status === -1) {
                return "Banned"
            } else if (status === 0) {
                return "Inactive"
            } else if (status === 1) {
                return "Active"
            } else {
                return "Invalid value?"
            }
        },
        getUser() {
            UserService.getUser(this.id)
                .then(user => {
                    this.user = user;
                })
                .catch(error => {
                    console.log("Error: Could not fetch user.", error);
                });
        },
        bbCode(value) {
            return parseBbCode(value)
        },
        avatarPath(path) {
            return process.env.VUE_APP_BACKEND_ROOT_URL + "/storage/images/avatars/" + path;
        }
    },
    watch: {
        id(value) {
            this.getUser();
        }
    }
};
</script>
<style scoped lang="scss">
.box-content {
    font-size: 1em;
}
.box-content-body {
    font-size: 1.5em;
}
.user {
    &__avatar-container {
        padding: 1em;
        border-radius: 0.5em;
        min-height: 90px;
        min-width: 90px;
    }
    &__avatar {
        border-radius: 0.5em;
    }
    &__info-container {
        padding: 1em;
        border-bottom: 1px solid #ccc;
        min-height: 90px;
    }
    &__description {
        font-size: 1.2em;
        padding: 1em;
    }
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100%;
}
</style>
