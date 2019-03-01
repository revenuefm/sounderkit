import {addClass, Dimensions, height, isVisible, width} from 'skit-util';

export default {

    props: ['width', 'height'],

    connected() {
        addClass(this.$el, 'sk-responsive-width');
    },

    update: {

        read() {
            return isVisible(this.$el) && this.width && this.height
                ? {width: width(this.$el.parentNode), height: this.height}
                : false;
        },

        write(dim) {
            height(this.$el, Dimensions.contain({
                height: this.height,
                width: this.width
            }, dim).height);
        },

        events: ['resize']

    }

};
