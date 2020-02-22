<template>
  <div v-if="config" class="ml-3 mb-2 rounded main-container">
    <div class="box-header">
      <router-link :to="{name: 'configs'}">Configs</router-link>
      / {{config.title}}
    </div>
    <div class="box-body">
      <div class="box-content">
        <h1>
          <router-link :to="{name: 'config', params: {id: config.id}}">{{config.title}}</router-link>
        </h1>
        <span class="box-content-info">
          <user-name v-if="config.user" :user="config.user"></user-name> /
          {{config.create_time | formatTimestamp}}
        </span>
        <div class="box-content-ingress">{{config.description}}</div>
        <div class="box-content-body">
          <pre style="padding: 0; margin: 0;"><textarea class="form-control form-control-sm" style="width: 100%; height: 600px; margin: 0;" v-model="config.cfg"></textarea></pre>
        </div>
        <div class="box-content-footer">
          <i class="fas fa-comments mr-2"></i>
          {{config.comments_count}}
          <div class="float-right">
            <router-link
              :to="{name: 'editConfig', params: {id: config.id}}"
              v-if="$can('edit_config') || isOwnConfig"
              title="Edit config"
            >
              <i class="fas fa-pen mr-2"></i>
            </router-link>
          </div>
        </div>
      </div>
      <comment-list class="mt-2" header="Comments" type="config" :id="config.id"></comment-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ConfigService from "@/services/ConfigService"
import CommentList from "@/components/CommentList"

export default {
    name: "ConfigView",
    components: {
        CommentList
    },
    props: {
        id: null
    },
    data() {
        return {
            config: null
        }
    },
    mounted() {
        this.getConfig()
    },
    watch: {
        id() {
            // Need this watcher in case we click a link to the same page but different config...
            this.getConfig();
        }
    },
    methods: {
        getConfig() {
            ConfigService.getConfig(this.id)
                .then(config => {
                    this.config = config;
                })
                .catch(error => {
                    console.log("Error: Could not fetch config.", error)
                })
        }
    },
    computed: {
        ...mapGetters({
            $user: 'user'
        }),
        isOwnConfig() {
          return this.$user.id === this.config.user.id;
        }
    }
}
</script>
