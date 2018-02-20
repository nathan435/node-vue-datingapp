<template>
    <b-modal :visible="visible" @hide="closeModal" hide-footer hide-header :no-fade="isChatOpen" class="profile-modal">
        <div class="modal-inner" v-if="profileOwner">
            <h1>{{profileOwner.username}}</h1>
            <b-img class="profile-image" fluid :src="profileOwner.profileImage" alt=""/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque asperiores reiciendis ipsa, cumque quia ad mollitia dolorum eos corrupti enim quasi laboriosam sit tenetur laborum quae sunt quas, fugiat soluta.</p>
            <template v-if="!isPreviewMode">
                <b-button variant="primary" @click="startChat({ userId: profileOwner.id })">Chat</b-button>
                <b-button v-if="isLikedUser" variant="outline-primary" @click="likeUser(profileOwner)">Dir gefällt {{profileOwner.username}}</b-button>
                <b-button v-else variant="primary" @click="likeUser(profileOwner)">Like</b-button>
            </template>
            <template v-else>
                <b-button>Chat</b-button>
                <b-button variant="outline-secondary">Like</b-button>
            </template>
        </div>
    </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        visible: Boolean
    },
    computed: {
        ...mapGetters([
            'isChatOpen',
            'user'
        ]),
        profileOwner() {
            let userId, user;
            if (this.isPreviewMode) {
                user = this.$store.state.user.account;
            } else {
                userId = this.$route.params.userId;
                user = this.$store.state.users.usersDetails[userId];
            }
            return user;
        },
        isPreviewMode() {
            if (this.$route.name === 'ProfilePreview') return true;
            return false;
        },
        isLikedUser() {
            // check if the profile owner is liked by the visitor
            if (!this.user || !this.user.likes) return false;
            if (!this.profileOwner || !this.profileOwner.id) return false;
            return this.user.likes.includes(this.profileOwner.id);
        }
    },
    methods: {
        ...mapActions([
            'startChat',
            'likeUser'
        ]),
        closeModal() {
            if (this.isPreviewMode) {
                this.$router.replace({ name: 'EditProfile' });
            } else {
                this.$router.push({ name: 'UsersBrowser', params: { userId: '' } });
            }
        }
    },
    created() {
        console.log(this.$route);
    }

}
</script>


<style scoped lang="scss">

.profile-modal {

    .profile-image {
        border-radius: 3px;
        margin-top: 10px;
        margin-bottom: 20px;
    }
}

</style>