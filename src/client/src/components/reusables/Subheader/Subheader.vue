<template>
    <div class="subheader">
        <b-container class="subheader-container clearfix">
            <Carousel class="user-showcase-carousel" :perPage="10" :paginationEnabled="false">
                <Slide>
                    <img src="http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png" alt="">
                </Slide>
                <Slide>
                    <img src="http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png" alt="">
                </Slide>
                <Slide>
                    <img src="http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png" alt="">
                </Slide>
                <Slide>
                    <img src="http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png" alt="">
                </Slide>
                <Slide>
                    <img src="http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png" alt="">
                </Slide>
                <Slide>
                    <img src="http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png" alt="">
                </Slide>
                <Slide>
                    <img src="http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png" alt="">
                </Slide>
                <Slide>
                    <img src="http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png" alt="">
                </Slide>
                <Slide>
                    <img src="http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png" alt="">
                </Slide>
                <Slide>
                    <img src="http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png" alt="">
                </Slide>
                <Slide>
                    <img src="http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png" alt="">
                </Slide>
            </Carousel>
        </b-container>
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        Carousel,
        Slide
    },
    computed: {
        ...mapGetters([
            'user'
        ]),
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>


<style scoped lang="scss">

.subheader {
    background-color: $brand-dark;
    width: 100%;
    height: 120px;

    .subheader-container {
        height: 100%;
        overflow: hidden;
    }
}

.user-showcase-carousel {

    .VueCarousel-slide {
        padding: 5px;
        box-sizing: border-box;
    }

    img {
        width: 100px;
        height: 100px;
        border-radius: 3px;
        object-fit: cover;
    }
}
</style>