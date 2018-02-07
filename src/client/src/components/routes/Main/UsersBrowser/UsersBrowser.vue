<template>
    <b-container class="users-browser">
        <b-row>
            <b-col cols="9">
                <b-row>
                    <b-col cols="4" v-for="user in usersList" :key="user.id">
                        <UserCard :user="user"/>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="3">
                <UsersFilter></UsersFilter>
            </b-col>

        </b-row>
    </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserCard from '../../../reusables/UserCard/UserCard.vue'
import UsersFilter from './UsersFilter/UsersFilter.vue'

export default {
    components: {
        UserCard,
        UsersFilter
    },
    methods: {
        ...mapActions([

        ])
    },
    computed: {
        ...mapGetters([
            'usersList'
        ])
    }
}
</script>


<style scoped lang="scss">

.users-browser {
    margin-top: 10px;
}
</style>