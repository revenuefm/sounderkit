import Class from '../mixin/class';
import Slideshow from '../mixin/slideshow';
import Animations from './internal/slideshow-animations';
import SliderReactive from '../mixin/slider-reactive';
import {boxModelAdjust, css} from 'skit-util';

export default {

    mixins: [Class, Slideshow, SliderReactive],

    props: {
        ratio: String,
        minHeight: Boolean,
        maxHeight: Boolean,
    },

    data: {
        ratio: '16:9',
        minHeight: false,
        maxHeight: false,
        selList: '.sk-slideshow-items',
        attrItem: 'sk-slideshow-item',
        selNav: '.sk-slideshow-nav',
        Animations
    },

    update: {

        read() {

            let [width, height] = this.ratio.split(':').map(Number);

            height = height * this.list.offsetWidth / width;

            if (this.minHeight) {
                height = Math.max(this.minHeight, height);
            }

            if (this.maxHeight) {
                height = Math.min(this.maxHeight, height);
            }

            return {height: height - boxModelAdjust(this.list, 'content-box')};
        },

        write({height}) {
            css(this.list, 'minHeight', height);
        },

        events: ['resize']

    }

};
