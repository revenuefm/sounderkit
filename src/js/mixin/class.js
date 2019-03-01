import {addClass, hasClass} from 'skit-util';

export default {

    connected() {
        !hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
    }

};
