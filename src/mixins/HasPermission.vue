<script>
import store from '@/store'

export default {
    methods: {
        $can(permission) {
            if (permission === null || permission === undefined) {
                throw 'No permission passed for permission check.'
            }
            return this.hasPermission(permission);
        },
        hasPermission(permission) {
            for (let i = 0; i < store.getters.permissions.length; i++) {
                if (store.getters.permissions[i].name === permission) {
                    return true;
                }
            }
            return false;
        }
    },
    computed: {
        $user() {
            return store.getters.user;
        }
    }
}
</script>