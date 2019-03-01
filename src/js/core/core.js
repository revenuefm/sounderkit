import {css, fastdom, on, ready, toMs} from 'skit-util';

export default function (Skit) {

    ready(() => {

        Skit.update();
        on(window, 'load resize', () => Skit.update(null, 'resize'));
        on(document, 'loadedmetadata load', ({target}) => Skit.update(target, 'resize'), true);

        // throttle `scroll` event (Safari triggers multiple `scroll` events per frame)
        let pending;
        on(window, 'scroll', e => {

            if (pending) {
                return;
            }
            pending = true;
            fastdom.write(() => pending = false);

            const {target} = e;
            Skit.update(target.nodeType !== 1 ? document.body : target, e.type);

        }, {passive: true, capture: true});

        let started = 0;
        on(document, 'animationstart', ({target}) => {
            if ((css(target, 'animationName') || '').match(/^sk-.*(left|right)/)) {

                started++;
                css(document.body, 'overflowX', 'hidden');
                setTimeout(() => {
                    if (!--started) {
                        css(document.body, 'overflowX', '');
                    }
                }, toMs(css(target, 'animationDuration')) + 100);
            }
        }, true);

    });

}
