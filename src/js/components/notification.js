import {append, apply, closest, css, pointerEnter, pointerLeave, remove, startsWith, toFloat, Transition, trigger} from 'skit-util';

const containers = {};

export default {

    functional: true,

    args: ['message', 'status'],

    data: {
        message: '',
        status: '',
        timeout: 5000,
        group: null,
        pos: 'top-center',
        clsClose: 'sk-notification-close',
        clsMsg: 'sk-notification-message'
    },

    install,

    computed: {

        marginProp({pos}) {
            return `margin${startsWith(pos, 'top') ? 'Top' : 'Bottom'}`;
        },

        startProps() {
            return {opacity: 0, [this.marginProp]: -this.$el.offsetHeight};
        }

    },

    created() {

        if (!containers[this.pos]) {
            containers[this.pos] = append(this.$container, `<div class="sk-notification sk-notification-${this.pos}"></div>`);
        }

        const container = css(containers[this.pos], 'display', 'block');

        this.$mount(append(container,
            `<div class="${this.clsMsg}${this.status ? ` ${this.clsMsg}-${this.status}` : ''}">
                    <a href="#" class="${this.clsClose}" data-sk-close></a>
                    <div>${this.message}</div>
                </div>`
        ));

    },

    connected() {

        const margin = toFloat(css(this.$el, this.marginProp));
        Transition.start(
            css(this.$el, this.startProps),
            {opacity: 1, [this.marginProp]: margin}
        ).then(() => {
            if (this.timeout) {
                this.timer = setTimeout(this.close, this.timeout);
            }
        });

    },

    events: {

        click(e) {
            if (closest(e.target, 'a[href="#"],a[href=""]')) {
                e.preventDefault();
            }
            this.close();
        },

        [pointerEnter]() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        },

        [pointerLeave]() {
            if (this.timeout) {
                this.timer = setTimeout(this.close, this.timeout);
            }
        }

    },

    methods: {

        close(immediate) {

            const removeFn = () => {

                trigger(this.$el, 'close', [this]);
                remove(this.$el);

                if (!containers[this.pos].children.length) {
                    css(containers[this.pos], 'display', 'none');
                }

            };

            if (this.timer) {
                clearTimeout(this.timer);
            }

            if (immediate) {
                removeFn();
            } else {
                Transition.start(this.$el, this.startProps).then(removeFn);
            }
        }

    }

};

function install(Skit) {
    Skit.notification.closeAll = function (group, immediate) {
        apply(document.body, el => {
            const notification = Skit.getComponent(el, 'notification');
            if (notification && (!group || group === notification.group)) {
                notification.close(immediate);
            }
        });
    };
}
