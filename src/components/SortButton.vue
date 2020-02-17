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
        sorting: {
            type: Object,
            required: true
        }
    },
    methods: {
        setOrder(order) {
            this.sorting.order = order;
            this.sorting.sort = this.field;
            this.$emit('changed');
        },
        swapOrder() {
            this.sorting.order === 'ASC' ? this.setOrder('DESC') : this.setOrder('ASC');
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
