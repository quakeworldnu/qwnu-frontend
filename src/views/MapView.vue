<template>
    <div v-if="map" class="ml-3 mb-2 rounded main-container">
        <div class="box-header">
            <router-link :to="{name: 'maps'}">Maps</router-link>
            / {{map.name}} - {{map.description}}
        </div>
        <div class="box-body">
            <div class="m-0 box-content">
                <div class="row mb-2">
                    <div class="col-sm-12">
                        <router-link
                            v-if="map.prevMap"
                            :to="{name: 'map', params: {id: map.prevMap}}"
                            tag="button"
                            class="btn btn-sm btn-light float-left"
                        >
                            <i class="fas fa-arrow-circle-left"></i>
                            Previous
                        </router-link>

                        <router-link
                            v-if="map.nextMap"
                            :to="{name: 'map', params: {id: map.nextMap}}"
                            tag="button"
                            class="btn btn-sm btn-light float-right"
                        >
                            Next
                            <i class="fas fa-arrow-circle-right"></i>
                        </router-link>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-8">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Weapons</h2>
                                <table class="table">
                                    <tr>
                                        <th>Super Shotgun (SSG)</th>
                                        <td>{{map.num_ssg}}</td>
                                    </tr>
                                    <tr>
                                        <th>Nailgun (NG)</th>
                                        <td>{{map.num_ng}}</td>
                                    </tr>
                                    <tr>
                                        <th>Super Nailgun (SNG)</th>
                                        <td>{{map.num_sng}}</td>
                                    </tr>
                                    <tr>
                                        <th>Grenade Launcher (GL)</th>
                                        <td>{{map.num_gl}}</td>
                                    </tr>
                                    <tr>
                                        <th>Rocket Launcher (RL)</th>
                                        <td>{{map.num_rl}}</td>
                                    </tr>
                                    <tr>
                                        <th>Lightning Gun (LG)</th>
                                        <td>{{map.num_lg}}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-sm-6">
                                <h2>Ammo</h2>
                                <table class="table">
                                    <tr>
                                        <th>Shells (small)</th>
                                        <td>{{map.num_shells_small}}</td>
                                    </tr>
                                    <tr>
                                        <th>Shells (big)</th>
                                        <td>{{map.num_shells_big}}</td>
                                    </tr>

                                    <tr>
                                        <th>Nails (small)</th>
                                        <td>{{map.num_nails_small}}</td>
                                    </tr>
                                    <tr>
                                        <th>nails (big)</th>
                                        <td>{{map.num_nails_big}}</td>
                                    </tr>

                                    <tr>
                                        <th>Rockets (small)</th>
                                        <td>{{map.num_rockets_small}}</td>
                                    </tr>
                                    <tr>
                                        <th>Rockets (big)</th>
                                        <td>{{map.num_rockets_big}}</td>
                                    </tr>

                                    <tr>
                                        <th>Cells (small)</th>
                                        <td>{{map.num_cells_small}}</td>
                                    </tr>
                                    <tr>
                                        <th>Cells (big)</th>
                                        <td>{{map.num_cells_big}}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Powerups</h2>
                                <table class="table">
                                    <tr>
                                        <th>Quad Damage</th>
                                        <td>{{map.num_quad}}</td>
                                    </tr>
                                    <tr>
                                        <th>Ring of Invisibility</th>
                                        <td>{{map.num_ring}}</td>
                                    </tr>
                                    <tr>
                                        <th>Pentagram of Protection</th>
                                        <td>{{map.num_pent}}</td>
                                    </tr>
                                    <tr>
                                        <th>Environmental Suit</th>
                                        <td>{{map.num_env_suit}}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-sm-6">
                                <h2>Health / Armour</h2>
                                <table class="table">
                                    <tr>
                                        <th>Health (small)</th>
                                        <td>{{map.num_health_small}}</td>
                                    </tr>
                                    <tr>
                                        <th>Health (big)</th>
                                        <td>{{map.num_health_big}}</td>
                                    </tr>
                                    <tr>
                                        <th>Health (mega)</th>
                                        <td>{{map.num_mega_health}}</td>
                                    </tr>

                                    <tr>
                                        <th>Green Armour (GA)</th>
                                        <td>{{map.num_ga}}</td>
                                    </tr>
                                    <tr>
                                        <th>Yellow Armour (YA)</th>
                                        <td>{{map.num_ya}}</td>
                                    </tr>
                                    <tr>
                                        <th>Red Armour (RA)</th>
                                        <td>{{map.num_ra}}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Miscellaneous</h2>
                                <table class="table">
                                    <tr>
                                        <th>Spawn</th>
                                        <td>{{map.num_spawns}}</td>
                                    </tr>
                                    <tr>
                                        <th>Teleport</th>
                                        <td>{{map.num_teleports}}</td>
                                    </tr>
                                    <tr>
                                        <th>Secret</th>
                                        <td>{{map.num_secrets}}</td>
                                    </tr>
                                    <tr>
                                        <th>Secret door</th>
                                        <td>{{map.num_secret_doors}}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <h2>Screenshots</h2>
                        <div v-if="map.screenshots.length == 0">No screenshots found.</div>

                        <div v-for="(screenshot, index) in map.screenshots" :key="screenshot.id">
                            <h3
                                v-if="index === 0 || (map.screenshots[index-1] && screenshot.type != map.screenshots[index-1].type)"
                            >{{screenshot.type}}</h3>
                            <a :href="screenshotPath(screenshot.path)">
                                <img
                                    :src="screenshotPath(screenshot.path)"
                                    style="width: 240px; height: 180px; margin: .2em 0;"
                                    :alt="screenshot.map +' '+ screenshot.type"
                                    :title="screenshot.map +' '+ screenshot.type"
                                    class="rounded"
                                >
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MapService from "@/services/MapService";

export default {
    name: "Map",
    props: {
        id: null
    },
    data: function() {
        return {
            map: null
        };
    },
    mounted() {
        this.getMap();
    },
    methods: {
        getMap() {
            MapService.getMap(this.id)
                .then(response => {
                    this.map = response.data;
                })
                .catch(error => {
                    console.log("Error: Could not fetch map.", error);
                });
        },
        screenshotPath(path) {
            return process.env.VUE_APP_BACKEND_URL + "/" + path;
        }
    },
    watch: {
        id(value) {
            this.getMap();
        }
    }
};
</script>
<style scoped lang="scss">
h2 {
    font-size: 1.5em;
    clear: both;
    width: 100%;
    border-bottom: 1px solid #666;
}
h3 {
    font-size: 1.2em;
    font-weight: bold;
    margin: 0;
    padding: 10px;
}
h2,
h3 {
    text-transform: capitalize;
}
th,
td {
    border-top: none;
    border-bottom: 1px solid #ccc;
}
</style>
