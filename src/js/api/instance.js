import {hyphenate, remove, within} from 'skit-util';

export default function (Skit) {

    const DATA = Skit.data;

    Skit.prototype.$mount = function (el) {

        const {name} = this.$options;

        if (!el[DATA]) {
            el[DATA] = {};
        }

        if (el[DATA][name]) {
            return;
        }

        el[DATA][name] = this;

        this.$el = this.$options.el = this.$options.el || el;

        if (within(el, document)) {
            this._callConnected();
        }
    };

    Skit.prototype.$emit = function (e) {
        this._callUpdate(e);
    };

    Skit.prototype.$reset = function () {
        this._callDisconnected();
        this._callConnected();
    };

    Skit.prototype.$destroy = function (removeEl = false) {

        const {el, name} = this.$options;

        if (el) {
            this._callDisconnected();
        }

        this._callHook('destroy');

        if (!el || !el[DATA]) {
            return;
        }

        delete el[DATA][name];

        if (!Object.keys(el[DATA]).length) {
            delete el[DATA];
        }

        if (removeEl) {
            remove(this.$el);
        }
    };

    Skit.prototype.$create = function (component, element, data) {
        return Skit[component](element, data);
    };

    Skit.prototype.$update = Skit.update;
    Skit.prototype.$getComponent = Skit.getComponent;

    const names = {};
    Object.defineProperties(Skit.prototype, {

        $container: Object.getOwnPropertyDescriptor(Skit, 'container'),

        $name: {

            get() {
                const {name} = this.$options;

                if (!names[name]) {
                    names[name] = Skit.prefix + hyphenate(name);
                }

                return names[name];
            }

        }

    });

}
