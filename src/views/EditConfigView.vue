<template>
    <div v-if="config" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">
            <router-link :to="{ name: 'configs' }">Configs</router-link>
            / {{ title }}
        </div>
        <div class="box-body">
            <div class="box-content">
                <div class="box-content-body">
                    <form @drop.prevent="addFile" @dragover.prevent>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">File</label>
                            <input
                                type="file"
                                class="col-sm-4 form-control-file form-control-sm"
                                ref="file"
                                id="file"
                                v-on:change="handleFileSelection()"
                                required="true"
                            />
                            <small class="col-sm-4" v-if="error.list.file">{{
                                error.list.file[0]
                            }}</small>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Title</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                v-model="config.title"
                                required="true"
                            />
                            <small class="col-sm-4" v-if="error.list.title">{{
                                error.list.title[0]
                            }}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label"
                                >Description</label
                            >
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                v-model="config.description"
                                required="true"
                            />
                            <small
                                class="col-sm-4"
                                v-if="error.list.description"
                                >{{ error.list.description[0] }}</small
                            >
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label"
                                >Engine</label
                            >
                            <select class="col-sm-4 form-control form-control-sm" v-model="config.engine">
                                <option
                                    v-for="(engine, index) in engineTypes"
                                    :key="index"
                                    :value="index"
                                    >{{ engine }}</option
                                >
                            </select>
                            <small class="col-sm-4" v-if="error.list.engine">{{
                                error.list.engine[0]
                            }}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label"
                                >Version</label
                            >
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                v-model="config.version"
                                required="true"
                            />
                            <small class="col-sm-4" v-if="error.list.version">{{
                                error.list.version[0]
                            }}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Mode</label>
                            <select class="col-sm-4 form-control form-control-sm" v-model="config.mode">
                                <option
                                    v-for="(mode, index) in modeTypes"
                                    :key="index"
                                    :value="index"
                                    >{{ mode }}</option
                                >
                            </select>
                            <small class="col-sm-4" v-if="error.list.mode">{{
                                error.list.mode[0]
                            }}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label"
                                >Ruleset</label
                            >
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                v-model="config.ruleset"
                                required="true"
                            />
                            <small class="col-sm-4" v-if="error.list.ruleset">{{
                                error.list.ruleset[0]
                            }}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label"
                                >Resolution</label
                            >
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                v-model="config.res"
                                required="true"
                            />
                            <small class="col-sm-4" v-if="error.list.res">{{
                                error.list.res[0]
                            }}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Font</label>
                            <input
                                type="text"
                                class="col-sm-4 form-control form-control-sm"
                                v-model="config.font"
                                required="true"
                            />
                            <small class="col-sm-4" v-if="error.list.font">{{
                                error.list.font[0]
                            }}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Mod</label>
                            <select class="col-sm-4 form-control form-control-sm" v-model="config.modi">
                                <option
                                    v-for="(mod, index) in modTypes"
                                    :key="index"
                                    :value="index"
                                    >{{ mod }}</option
                                >
                            </select>
                            <small class="col-sm-4" v-if="error.list.modi">{{
                                error.list.modi[0]
                            }}</small>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Type</label>
                            <select class="col-sm-4 form-control form-control-sm" v-model="config.type">
                                <option
                                    v-for="(type, index) in typeTypes"
                                    :key="index"
                                    :value="index"
                                    >{{ type }}</option
                                >
                            </select>
                            <small class="col-sm-4" v-if="error.list.type">{{
                                error.list.type[0]
                            }}</small>
                        </div>

                        <pre><textarea class="form-control form-control-sm" style="width: 100%; height: 600px; margin: 0;" v-model="config.cfg"></textarea></pre>

                        <button
                            type="submit"
                            class="btn btn-dark btn-sm bg-dark mt-2"
                            @click.prevent="saveConfig()"
                            v-text="loading ? 'Loading...' : 'Save'"
                            :disabled="loading"
                        ></button>
                    </form>
                </div>
                <div v-if="!config.isNew && ($can('delete_config') || isOwnConfig)" class="box-content-footer">
                    &nbsp;
                    <div class="float-right">
                        <confirm-button
                            icon="fa-trash"
                            text="Really delete this config?"
                            title="Delete config"
                            @confirm="deleteConfig()"
                        ></confirm-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import ConfigService from "@/services/ConfigService";
import Config from "@/models/Config";

export default {
    name: "EditConfigView",
    props: {
        id: null
    },
    data() {
        return {
            config: new Config(),
            loading: false,
            error: {
                message: null,
                list: []
            },
            engineTypes: Config.ENGINE_TYPES,
            modeTypes: Config.MODE_TYPES,
            modTypes: Config.MOD_TYPES,
            typeTypes: Config.TYPE_TYPES
        };
    },
    mounted() {
        if (this.id) {
            this.getConfig();
        }
    },
    watch: {
        id() {
            // Need this watcher in case we click a link to the same page but different config...
            this.getConfig();
        }
    },
    methods: {
      addFile(e) {
        let files = e.dataTransfer.files;
        this.readFile(files[0]);
      },
        handleFileSelection() {
            let file = this.$refs.file.files[0];
            this.readFile(file);
        },
        readFile(file) {
            const reader = new FileReader();

            reader.onload = event => {
                this.config.cfg = event.target.result;
            };
            reader.readAsText(file);
        },
        getConfig() {
            ConfigService.getConfig(this.id)
                .then(config => {
                    this.config = config;
                })
                .catch(error => {
                    this.$toasted.error("Could not fetch config");
                    console.log(error);
                });
        },
        saveConfig() {
            this.loading = true;

            if (this.config.isNew) {
                this.createConfig();
            } else {
                this.updateConfig();
            }
        },
        updateConfig() {
            ConfigService.updateConfig(this.config.id, this.config)
                .then(response => {
                    this.$toasted.success("Config saved");
                    this.$router.push({ name: "config", params: { id: this.config.id } })
                })
                .catch(error => {
                    this.$toasted.error("Could not save config");
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                })
                .finally(() => this.loading = false);
        },
        createConfig() {
            ConfigService.createConfig(this.config)
                .then(config => {
                    this.$toasted.success("Config saved");
                    this.$router.push({ name: "config", params: { id: config.id } })
                })
                .catch(error => {
                    this.$toasted.error("Could not save config");
                    console.log(error);
                    this.error.message = error.response.data.message;
                    this.error.list = error.response.data.errors;
                })
                .finally(() => (this.loading = false));
        },
        deleteConfig() {
            ConfigService.deleteConfig(this.config.id).then(response => {
              this.$toasted.success("Config deleted");
              this.$router.push({ name: "configs" })
            })
            .catch(error => {
                this.$toasted.error("Could not delete config");
                console.log(error);
            })
            .finally(() => (this.loading = false));
        }
    },
    computed: {
        ...mapGetters({
            $user: 'user'
        }),
        title() {
            return this.config.isNew ? "New config" : this.config.title;
        },
        isOwnConfig() {
          return this.$user.id === this.config.user.id;
        }
    }
};
</script>
