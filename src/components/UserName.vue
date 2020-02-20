<template>
    <router-link :to="{name: 'user', params: { id: user.id}}">
        <span v-if="showFlag" v-html="getFlag(user)"></span>
        {{user.username}}
    </router-link>
</template>

<script>
import User from '@/models/User';

export default {
    name: 'UserName',
    props: {
        user: {
            type: User,
            required: true
        },
        showFlag: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        getFlag(user) {
            if (user.profile.nation) {
                return `<span class="flag-icon flag-icon-${user.profile.nation.iso}"></span>`;
            }

            return null;
        }
    },
    computed: {
    }
}
</script>

<style scoped lang="scss">
</style>
