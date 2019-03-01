import {$, apply, isString, mergeOptions, toNode} from 'skit-util';

export default function (Skit) {

    const DATA = Skit.data;

    Skit.use = function (plugin) {

        if (plugin.installed) {
            return;
        }

        plugin.call(null, this);
        plugin.installed = true;

        return this;
    };

    Skit.mixin = function (mixin, component) {
        component = (isString(component) ? Skit.component(component) : component) || this;
        component.options = mergeOptions(component.options, mixin);
    };

    Skit.extend = function (options) {

        options = options || {};

        const Super = this;
        const Sub = function SkitComponent (options) {
            this._init(options);
        };

        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = mergeOptions(Super.options, options);

        Sub.super = Super;
        Sub.extend = Super.extend;

        return Sub;
    };

    Skit.update = function (element, e) {

        element = element ? toNode(element) : document.body;

        path(element, element => update(element[DATA], e));
        apply(element, element => update(element[DATA], e));

    };

    let container;
    Object.defineProperty(Skit, 'container', {

        get() {
            return container || document.body;
        },

        set(element) {
            container = $(element);
        }

    });

    function update(data, e) {

        if (!data) {
            return;
        }

        for (const name in data) {
            if (data[name]._connected) {
                data[name]._callUpdate(e);
            }
        }

    }

    function path(node, fn) {
        if (node && node !== document.body && node.parentNode) {
            path(node.parentNode, fn);
            fn(node.parentNode);
        }
    }

}
