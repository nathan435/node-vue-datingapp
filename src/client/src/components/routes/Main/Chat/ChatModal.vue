<template>
    <b-modal size="lg" class="chat-modal" :visible="visible" @hide="closeModal" hide-footer hide-header no-fade>
        <Chat></Chat>
    </b-modal>
</template>

<script>
import Chat from './Chat.vue'
import { mapActions } from 'vuex'

export default {
    components: {
        Chat
    },
    props: {
        visible: Boolean,
    },
    computed: {

    },
    methods: {
        ...mapActions([
            'closeChat'
        ]),
        closeModal() {
            this.closeChat();
        }
    },
    created() {
    }

}
</script>


<style scoped lang="scss">

</style>