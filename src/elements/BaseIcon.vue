<template>
    <svg class="icon" :class="`icon--${size}`" :style="styles">
        <use :href="`${iconsUrl}#${icon}`"></use>
    </svg>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: ''
        },
        fill: {
            type: String
        }
    },
    computed: {
        size() {
            const num = this.icon.split('-').pop();
            return isNaN(parseInt(num)) ? 16 : parseInt(num);
        },
        styles() {
            return this.fill ? { fill: this.fill } : null;
        },
        iconsUrl() {
            return process.env.VUE_APP_ICONS_URL || '';
        }
    }
};
</script>

<style lang="scss"></style>
