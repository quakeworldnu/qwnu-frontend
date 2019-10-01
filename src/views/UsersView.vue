<template>
    <div class="ml-3 mb-2 rounded-top rounded-bottom main-container">
        <div class="box-header">Users</div>
        <div class="box-body">
            <div class="bg-light p-2 mb-2 rounded">
                <form>
                    <input type="text" class="form-control" placeholder="Search username" :value="keyword" @input="update"/>
                </form>
            </div>

            <table class="table">
                <tr>
                    <th>
                        <sort-button
                            field="username"
                            :pagination="pagination"
                            @changed="onPageChange()"
                        >Username</sort-button>
                    </th>
                    <th>
                        <!-- <sort-button
                            field="profile.nation.iso"
                            :pagination="pagination"
                            @changed="onPageChange()"
                        > -->
                        Nationality
                        <!-- </sort-button> -->
                    </th>
                    <th>
                        <sort-button
                            field="createtime"
                            :pagination="pagination"
                            @changed="onPageChange()"
                        >Registered</sort-button>
                    </th>
                    <th>
                        <sort-button
                            field="lastvisit"
                            :pagination="pagination"
                            @changed="onPageChange()"
                        >Last visit</sort-button>
                    </th>
                </tr>
                <tr v-for="user in users" :key="user.id">
                    <td>
                        <router-link :to="{name: 'user', params: { id: user.id}}">{{user.username}}</router-link>
                    </td>
                    <td v-html="getFlag(user)"></td>
                    <td>{{user.createtime | formatUnixTimestamp('YYYY-MM-DD')}}</td>
                    <td>{{user.lastvisit | formatUnixTimestamp('YYYY-MM-DD')}}</td>
                </tr>
            </table>

            <div class="bg-light p-2 rounded">
                <pagination
                    v-model="pagination.page"
                    :records="pagination.totalRecords"
                    :per-page="pagination.pageSize"
                    @paginate="onPageChange()"
                ></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
    name: "Users",
    data() {
        return {
            users: [],
            pagination: {
                page: parseInt(this.$route.query.page) || 1,
                sort: this.$route.query.sort || "createtime",
                order: this.$route.query.order || "desc",
                pageSize: 1,
                totalRecords: 0
            },
            keyword: this.$route.query.keyword || ""
        };
    },
    mounted() {
        this.getSearchedUsers();
    },
    methods: {
        update: _.debounce(function (e) {
            this.pagination.page = 1;
            let query = this.pagination;
            query.keyword = e.target.value;
            this.keyword = e.target.value;
            this.getSearchedUsers().then(() => {
                this.$router.push({
                    name: "users",
                    query: query
                });
            });
        }, 1000),
        onPageChange() {
            let query = this.pagination;
            query.keyword = this.keyword;

            this.getSearchedUsers();

            this.$router.push({
                name: "users",
                query: query
            });
        },
        getFlag(user) {
            if (user.profile.nation) {
                return `<span class="flag-icon flag-icon-${user.profile.nation.iso}"></span>`;
            } else {
                return null;
            }
        },
        getSearchedUsers() {
            return UserService.getUsersBySearch(this.keyword, this.pagination)
                .then(response => {
                    this.users = response.data.data;
                    this.pagination.totalRecords = response.data.total;
                    this.pagination.pageSize = response.data.per_page;
                })
                .catch(error => {
                    console.log("Error: Could not fetch searched users.", error);
                });
        }
    }
};
</script>
<style scoped lang="scss">
table {
    border-style: none;
    margin: 0 0 1em 0;
    width: 100%;
}

td {
    padding: 1em;
    margin: 0;
    color: #706050;
}

th {
    text-transform: uppercase;
    font-size: 0.9em;
    padding: 0.8em;
    color: #fff;
    background-image: url("../assets/bg-header-menu.png");
    border: none;
}

tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 1);
}

tr:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.9);
}
</style>
