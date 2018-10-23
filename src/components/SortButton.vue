<template>
    <div class="sort-button" v-on:click="swapOrder">
        <i class="fas fa-sort mr-1"></i>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'sortButton',
    props: {
        field: { // Corresponds to JSON object / database fields
            type: String,
            required: true
        },
        pagination: {
            type: Object,
            required: true
        }
    },
    methods: {
        setOrder(order) {
            this.pagination.order = order;
            this.pagination.sort = this.field;
            this.$emit('changed');
        },
        swapOrder() {
            this.pagination.order === 'ASC' ? this.setOrder('DESC') : this.setOrder('ASC');
        }
    },
    computed: {
    }
}
</script>

<style scoped lang="scss">
    .sort-button {
        cursor: pointer;
    }
</style>
