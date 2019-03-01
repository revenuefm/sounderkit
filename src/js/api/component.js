import {$$, assign, camelize, fastdom, hyphenate, isPlainObject, startsWith} from 'skit-util';

export default function (Skit) {

    const DATA = Skit.data;

    const components = {};

    Skit.component = function (name, options) {

        if (!options) {

            if (isPlainObject(components[name])) {
                components[name] = Skit.extend(components[name]);
            }

            return components[name];

        }

        Skit[name] = function (element, data) {

            const component = Skit.component(name);

            if (isPlainObject(element)) {
                return new component({data: element});
            }

            if (component.options.functional) {
                return new component({data: [...arguments]});
            }

            return element && element.nodeType ? init(element) : $$(element).map(init)[0];

            function init(element) {

                const instance = Skit.getComponent(element, name);

                if (instance) {
                    if (!data) {
                        return instance;
                    } else {
                        instance.$destroy();
                    }
                }

                return new component({el: element, data});

            }

        };

        const opt = isPlainObject(options) ? assign({}, options) : options.options;

        opt.name = name;

        if (opt.install) {
            opt.install(Skit, opt, name);
        }

        if (Skit._initialized && !opt.functional) {
            const id = hyphenate(name);
            fastdom.read(() => Skit[name](`[sk-${id}],[data-sk-${id}]`));
        }

        return components[name] = isPlainObject(options) ? opt : options;
    };

    Skit.getComponents = element => element && element[DATA] || {};
    Skit.getComponent = (element, name) => Skit.getComponents(element)[name];

    Skit.connect = node => {

        if (node[DATA]) {
            for (const name in node[DATA]) {
                node[DATA][name]._callConnected();
            }
        }

        for (let i = 0; i < node.attributes.length; i++) {

            const name = getComponentName(node.attributes[i].name);

            if (name && name in components) {
                Skit[name](node);
            }

        }

    };

    Skit.disconnect = node => {
        for (const name in node[DATA]) {
            node[DATA][name]._callDisconnected();
        }
    };

}

export function getComponentName(attribute) {
    return startsWith(attribute, 'sk-') || startsWith(attribute, 'data-sk-')
        ? camelize(attribute.replace('data-sk-', '').replace('sk-', ''))
        : false;
}
