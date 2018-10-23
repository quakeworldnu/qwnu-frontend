<template>
    <div>
        <span class="button" @click="showModal = true">
            <i class="fas" :class="icon"></i>
        </span>
        <modal v-if="showModal" @cancel="cancel()" @confirm="confirm()">
            <h1 slot="header">Are you sure?</h1>
            <p slot="body">{{text}}</p>
        </modal>
    </div>
</template>

<script>
export default {
    name: 'confirmButton',
    props: {
        icon: String,
        text: String
    },
    data: function() {
        return {
            showModal: false
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel');
            this.showModal = false;
        },
        confirm() {
            this.$emit('confirm');
            this.showModal = false;
        }
    },
    computed: {
    }
}
</script>

<style scoped lang="scss">
    .button {
        cursor: pointer;
    }

    /* Popup container - can be anything you want */
    .popup {
        position: relative;
        display: inline-block;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* The actual popup */
    .popup .popuptext {
        width: 160px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 8px 0;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -80px;
    }

    /* Popup arrow */
    .popup .popuptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }

    /* Toggle this class - hide and show the popup */
    .popup .show {
        visibility: visible;
        -webkit-animation: fadeIn 1s;
        animation: fadeIn 1s;
    }

    /* Add animation (fade in the popup) */
    @-webkit-keyframes fadeIn {
        from {opacity: 0;} 
        to {opacity: 1;}
    }

    @keyframes fadeIn {
        from {opacity: 0;}
        to {opacity:1 ;}
    }
</style>
