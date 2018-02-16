<template>
    <div class="navbar-main">
        <b-container class="navbar-container clearfix">
            <div class="brand"></div>
            <div class="navigation-right">
                <div class="notifications" id="notifications-popover" :style="{'pointer-events': notificationsPopoverIsShown ? 'none' : 'auto'}">
                    <img src="https://applets.imgix.net/https%3A%2F%2Fassets.ifttt.com%2Fimages%2Fchannels%2F651849913%2Ficons%2Fon_color_large.png%3Fversion%3D0?ixlib=rails-2.1.3&w=240&h=240&auto=compress&s=ea7741d206f94de05700efd0f96cfe89" alt="">
                    <div class="amount">4</div>
                </div>
                <b-popover target="notifications-popover"
                    :placement="'bottom'"
                    :triggers="'click blur'"
                    @show="popoverBeforeShow"
                    @hide="notificationsPopoverOnHide"
                    @shown="notificationsPopoverShown"
                    :no-fade="true"
                    >
                    <div class="popover-item" ref="notificationsPopoverFirst" tabindex="0">Du gefällst Lena</div>
                </b-popover>
                <div class="messages">
                    <img src="https://cdn1.iconfinder.com/data/icons/fs-icons-ubuntu-by-franksouza-dark/512/indicator-messages.png" alt="">
                    <div class="amount">4</div>
                </div>
                <div class="user" id="user-popover" @click="popoverBeforeShow" :style="{'pointer-events': userPopoverIsShown ? 'none' : 'auto'}">
                    <img src="http://oi57.tinypic.com/162afr6.jpg" alt="">
                    <p>Nathan</p>
                </div>
                <b-popover target="user-popover"
                    :placement="'bottom'"
                    :triggers="'click blur'"
                    @show="popoverBeforeShow"
                    @hide="userPopoverOnHide"
                    @shown="userPopoverShown"
                    :no-fade="true"
                    >
                    <div @click="browseClick" :to="{ name: 'UsersBrowser'}" class="popover-item" ref="userPopoverBrowse" tabindex="0">Übersicht</div>
                    <div @click="profileClick" :to="{ name: 'EditProfile'}" class="popover-item" ref="userPopoverProfile" tabindex="1">Profil</div>
                    <div class="popover-item" tabindex="1">Chat</div>
                    <div class="popover-item" tabindex="2">Ausloggen</div>
                </b-popover>
            </div>
        </b-container>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'user'
        ]),
    },
    data() {
        return {
            userPopoverIsShown: false,
            notificationsPopoverIsShown: false,
            userPopoverTriggers: 'click blur'
        }
    },
    methods: {
        ...mapActions([
            'logOut',
            'openChat'
        ]),
        popoverBeforeShow() {
            this.$root.$emit('bv::hide::popover');
        },
        userPopoverOnHide() {
            this.userPopoverIsShown = false;
        },
        notificationsPopoverOnHide() {
            this.notificationsPopoverIsShown = false;
        }, 
        userPopoverShown(e) {
            this.$refs.userPopoverProfile.focus();
            this.userPopoverIsShown = true;
        },
        notificationsPopoverShown() {
            this.$refs.notificationsPopoverFirst.focus();
            this.notificationsPopoverIsShown = true;
        },
        profileClick() {
            console.log('profileClick')
            this.$router.push({ name: 'EditProfile'});
        },
        browseClick() {
            this.$router.push({ name: 'UsersBrowser'})
        }
    }
}
</script>


<style scoped lang="scss">

.navbar-main {
    background-color: $brand-dark;
    width: 100%;
    height: 68px;

    .navbar-container {
        height: 100%;
    }

    .brand {
        font-size: 16px;
        width: 150px;
        height: 100%;
        float: left;
    }

    .navigation-right {
        height: 100%;
        float: right;

        .notifications,
        .messages,
        .user {
            float: left;
            color: #fff;
            height: 100%;
            font-size: 20px;
            position: relative;
            width: 60px;
            cursor: pointer;

            img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 50%;
                height: auto;
            }
        }

        .messages {
            margin: 0 10px;

            img {
                width: 65%;
            }
        }

        .user {
            width: 180px;
            
            img {
                width: 45px;
                border-radius: 100%;
                left: 10%;
                transform: translate(0, -50%);
            }

            p {
                position: relative;
                top: 50%;
                transform: translate(0, -50%);
                left: 42%;
            }
        }

        .amount {
            position: absolute;
            right: 4px;
            top: 8px;
            background: $brand-primary;
            border-radius: 100%;
            width: 24px;
            height: 24px;
            text-align: center;
            font-size: 14px;
            line-height: 24px;
        }
    }

    .navbar-nav .nav-link, .nav-item.dropdown {
        color: rgba(255,255,255,0.75);
        font-weight: 600;
    }
}

</style>
