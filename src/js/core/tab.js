import Switcher from './switcher';
import Class from '../mixin/class';
import {hasClass} from 'skit-util';

export default {

    mixins: [Class],

    extends: Switcher,

    props: {
        media: Boolean
    },

    data: {
        media: 960,
        attrItem: 'sk-tab-item'
    },

    connected() {

        const cls = hasClass(this.$el, 'sk-tab-left')
            ? 'sk-tab-left'
            : hasClass(this.$el, 'sk-tab-right')
                ? 'sk-tab-right'
                : false;

        if (cls) {
            this.$create('toggle', this.$el, {cls, mode: 'media', media: this.media});
        }
    }

};
