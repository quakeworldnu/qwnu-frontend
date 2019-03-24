<template>
    <div class="mb-2 rounded">
        <div class="box-header">
            <i class="fas fa-video m-1"></i>
            Streams
        </div>
        <div class="box-body">
            <!-- Stream box -->
            <div v-for="stream in streams" :key="stream.id">
                <div class="box-content-record">
                    <a :href="getStreamUrl(stream.user.display_name)">{{stream.title}}</a>
                    <span class="box-content-record-info">{{stream.viewer_count}} viewers</span>
                    <span class="box-content-record-author">By {{stream.user.display_name}}</span>
                </div>
            </div>
            <div v-if="error" class="box-content-record">{{error}}</div>
            <div
                v-else-if="!streams || streams.length === 0"
                class="box-content-record"
            >No Quake streams online.</div>
        </div>
    </div>
</template>

<script>
import StreamService from "@/services/StreamService";

export default {
    name: "SideBoxStreams",
    props: {},
    data: function() {
        return {
            error: null,
            streams: []
        };
    },
    mounted() {
        this.getStreams();
    },
    methods: {
        getStreams() {
            StreamService.getStreams()
                .then(response => {
                    this.streams = response.data.data;
                })
                .catch(error => {
                    this.error = "Could not fetch streams.";
                });
        },
        getStreamUrl(streamerName) {
            return "https://www.twitch.tv/" + streamerName;
        }
    },
    computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
