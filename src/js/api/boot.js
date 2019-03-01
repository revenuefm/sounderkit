import {getComponentName} from './component';
import {fastdom, hasAttr} from 'skit-util';

export default function (Skit) {

    const {connect, disconnect} = Skit;

    if (!('MutationObserver' in window)) {
        return;
    }

    if (document.body) {

        init();

    } else {

        (new MutationObserver(function () {

            if (document.body) {
                this.disconnect();
                init();
            }

        })).observe(document, {childList: true, subtree: true});

    }

    function init() {

        apply(document.body, connect);

        fastdom.flush();

        (new MutationObserver(mutations => mutations.forEach(applyMutation))).observe(document, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true
        });

        Skit._initialized = true;
    }

    function applyMutation(mutation) {

        const {target, type} = mutation;

        const update = type !== 'attributes'
            ? applyChildList(mutation)
            : applyAttribute(mutation);

        update && Skit.update(target);

    }

    function applyAttribute({target, attributeName}) {

        if (attributeName === 'href') {
            return true;
        }

        const name = getComponentName(attributeName);

        if (!name || !(name in Skit)) {
            return;
        }

        if (hasAttr(target, attributeName)) {
            Skit[name](target);
            return true;
        }

        const component = Skit.getComponent(target, name);

        if (component) {
            component.$destroy();
            return true;
        }

    }

    function applyChildList({addedNodes, removedNodes}) {

        for (let i = 0; i < addedNodes.length; i++) {
            apply(addedNodes[i], connect);
        }

        for (let i = 0; i < removedNodes.length; i++) {
            apply(removedNodes[i], disconnect);
        }

        return true;
    }

    function apply(node, fn) {

        if (node.nodeType !== 1 || hasAttr(node, 'sk-no-boot')) {
            return;
        }

        fn(node);
        node = node.firstElementChild;
        while (node) {
            const next = node.nextElementSibling;
            apply(node, fn);
            node = next;
        }
    }

}
