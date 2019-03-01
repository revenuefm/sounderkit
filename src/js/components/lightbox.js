import LightboxPanel from './lightbox-panel';
import {$$, assign, data, index, on} from 'skit-util';

export default {

    install,

    props: {toggle: String},

    data: {toggle: 'a'},

    computed: {

        toggles: {

            get({toggle}, $el) {
                return $$(toggle, $el);
            },

            watch() {
                this.hide();
            }

        }

    },

    disconnected() {
        this.hide();
    },

    events: [

        {

            name: 'click',

            delegate() {
                return `${this.toggle}:not(.sk-disabled)`;
            },

            handler(e) {
                e.preventDefault();
                this.show(index(this.toggles, e.current));
            }

        }

    ],

    methods: {

        show(index) {

            this.panel = this.panel || this.$create('lightboxPanel', assign({}, this.$props, {
                items: this.toggles.reduce((items, el) => {
                    items.push(['href', 'caption', 'type', 'poster', 'alt'].reduce((obj, attr) => {
                        obj[attr === 'href' ? 'source' : attr] = data(el, attr);
                        return obj;
                    }, {}));
                    return items;
                }, [])
            }));

            on(this.panel.$el, 'hidden', () => this.panel = false);
            return this.panel.show(index);
        },

        hide() {

            return this.panel && this.panel.hide();

        }

    }

};

function install(Skit, Lightbox) {

    if (!Skit.lightboxPanel) {
        Skit.component('lightboxPanel', LightboxPanel);
    }

    assign(
        Lightbox.props,
        Skit.component('lightboxPanel').options.props
    );

}
