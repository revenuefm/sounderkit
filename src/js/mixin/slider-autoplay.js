import {pointerDown} from 'skit-util';

export default {

    props: {
        autoplay: Boolean,
        autoplayInterval: Number,
        pauseOnHover: Boolean
    },

    data: {
        autoplay: false,
        autoplayInterval: 7000,
        pauseOnHover: true
    },

    connected() {
        this.startAutoplay();
        this.userInteracted = false;
    },

    disconnected() {
        this.stopAutoplay();
    },

    events: [

        {

            name: 'visibilitychange',

            el: document,

            handler() {
                if (document.hidden) {
                    this.stopAutoplay();
                } else {
                    !this.userInteracted && this.startAutoplay();
                }
            }

        },

        {

            name: pointerDown,
            handler() {
                this.userInteracted = true;
                this.stopAutoplay();
            }

        },

        {

            name: 'mouseenter',

            filter() {
                return this.autoplay;
            },

            handler() {
                this.isHovering = true;
            }

        },

        {

            name: 'mouseleave',

            filter() {
                return this.autoplay;
            },

            handler() {
                this.isHovering = false;
            }

        }

    ],

    methods: {

        startAutoplay() {

            this.stopAutoplay();

            if (this.autoplay) {
                this.interval = setInterval(
                    () => !(this.isHovering && this.pauseOnHover) && !this.stack.length && this.show('next'),
                    this.autoplayInterval
                );
            }

        },

        stopAutoplay() {
            if (this.interval) {
                clearInterval(this.interval);
            }
        }

    }

};
