import Class from '../mixin/class';
import {closest, css, height, offset, toFloat, trigger} from 'skit-util';

export default {

    mixins: [Class],

    props: {
        selContainer: String,
        selContent: String,
    },

    data: {
        selContainer: '.sk-modal',
        selContent: '.sk-modal-dialog',
    },

    computed: {

        container({selContainer}, $el) {
            return closest($el, selContainer);
        },

        content({selContent}, $el) {
            return closest($el, selContent);
        }

    },

    connected() {
        css(this.$el, 'minHeight', 150);
    },

    update: {

        read() {

            if (!this.content || !this.container) {
                return false;
            }

            return {
                current: toFloat(css(this.$el, 'maxHeight')),
                max: Math.max(150, height(this.container) - (offset(this.content).height - height(this.$el)))
            };
        },

        write({current, max}) {
            css(this.$el, 'maxHeight', max);
            if (Math.round(current) !== Math.round(max)) {
                trigger(this.$el, 'resize');
            }
        },

        events: ['resize']

    }

};
