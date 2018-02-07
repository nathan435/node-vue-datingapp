<template>
<b-navbar toggleable="md" type="dark" class="navbar-main">
    <b-container>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand class="brand" href="#"><b-img src="http://icons.iconarchive.com/icons/sonya/swarm/128/Heart-icon.png" height="30" alt=""></b-img></b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
            <b-nav-item :to="{ name: 'UsersBrowser' }">Suchen & finden</b-nav-item>
            <b-nav-item :to="{ name: 'UsersBrowser' }"></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown right v-if="user">
            <template slot="button-content">
                <em>{{user.username}}</em>
            </template>
            <b-dropdown-item :to="{ name: 'EditProfile' }">Profil</b-dropdown-item>
            <b-dropdown-item @click="logOut">Ausloggen</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>

        </b-collapse>
    </b-container>
</b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    methods: {
        ...mapActions([
            'logOut'
        ])
    }
}
</script>


<style scoped lang="scss">

.navbar-main {
    background-color: $brand-dark;

    .brand {
        font-size: 16px;
    }

    .navbar-nav .nav-link, .nav-item.dropdown {
        color: rgba(255,255,255,0.75);
        font-weight: 600;
    }
}

</style>
