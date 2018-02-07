<template>
    <b-modal :visible="visible"
            @hide="onHide">
    
    </b-modal>
</template>

<script>
export default {
    props: {
        visible: Boolean,
        onHide: Function
    }
}
</script>


<style scoped lang="scss">

</style>
