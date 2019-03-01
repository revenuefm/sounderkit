import Modal from '../mixin/modal';
import {$, addClass, assign, css, hasClass, height, html, isString, on, Promise, removeClass} from 'skit-util';

export default {

    install,

    mixins: [Modal],

    data: {
        clsPage: 'sk-modal-page',
        selPanel: '.sk-modal-dialog',
        selClose: '.sk-modal-close, .sk-modal-close-default, .sk-modal-close-outside, .sk-modal-close-full'
    },

    events: [

        {
            name: 'show',

            self: true,

            handler() {

                if (hasClass(this.panel, 'sk-margin-auto-vertical')) {
                    addClass(this.$el, 'sk-flex');
                } else {
                    css(this.$el, 'display', 'block');
                }

                height(this.$el); // force reflow
            }
        },

        {
            name: 'hidden',

            self: true,

            handler() {

                css(this.$el, 'display', '');
                removeClass(this.$el, 'sk-flex');

            }
        }

    ]

};

function install (Skit) {

    Skit.modal.dialog = function (content, options) {

        const dialog = Skit.modal(`
            <div class="sk-modal">
                <div class="sk-modal-dialog">${content}</div>
             </div>
        `, options);

        dialog.show();

        on(dialog.$el, 'hidden', ({target, currentTarget}) => {
            if (target === currentTarget) {
                Promise.resolve(() => dialog.$destroy(true));
            }
        });

        return dialog;
    };

    Skit.modal.alert = function (message, options) {

        options = assign({bgClose: false, escClose: false, labels: Skit.modal.labels}, options);

        return new Promise(
            resolve => on(Skit.modal.dialog(`
                <div class="sk-modal-body">${isString(message) ? message : html(message)}</div>
                <div class="sk-modal-footer sk-text-right">
                    <button class="sk-button sk-button-primary sk-modal-close" autofocus>${options.labels.ok}</button>
                </div>
            `, options).$el, 'hide', resolve)
        );
    };

    Skit.modal.confirm = function (message, options) {

        options = assign({bgClose: false, escClose: true, labels: Skit.modal.labels}, options);

        return new Promise((resolve, reject) => {

            const confirm = Skit.modal.dialog(`
                <form>
                    <div class="sk-modal-body">${isString(message) ? message : html(message)}</div>
                    <div class="sk-modal-footer sk-text-right">
                        <button class="sk-button sk-button-default sk-modal-close" type="button">${options.labels.cancel}</button>
                        <button class="sk-button sk-button-primary" autofocus>${options.labels.ok}</button>
                    </div>
                </form>
            `, options);

            let resolved = false;

            on(confirm.$el, 'submit', 'form', e => {
                e.preventDefault();
                resolve();
                resolved = true;
                confirm.hide();
            });
            on(confirm.$el, 'hide', () => {
                if (!resolved) {
                    reject();
                }
            });

        });
    };

    Skit.modal.prompt = function (message, value, options) {

        options = assign({bgClose: false, escClose: true, labels: Skit.modal.labels}, options);

        return new Promise(resolve => {

            const prompt = Skit.modal.dialog(`
                    <form class="sk-form-stacked">
                        <div class="sk-modal-body">
                            <label>${isString(message) ? message : html(message)}</label>
                            <input class="sk-input" autofocus>
                        </div>
                        <div class="sk-modal-footer sk-text-right">
                            <button class="sk-button sk-button-default sk-modal-close" type="button">${options.labels.cancel}</button>
                            <button class="sk-button sk-button-primary">${options.labels.ok}</button>
                        </div>
                    </form>
                `, options),
                input = $('input', prompt.$el);

            input.value = value;

            let resolved = false;

            on(prompt.$el, 'submit', 'form', e => {
                e.preventDefault();
                resolve(input.value);
                resolved = true;
                prompt.hide();
            });
            on(prompt.$el, 'hide', () => {
                if (!resolved) {
                    resolve(null);
                }
            });

        });
    };

    Skit.modal.labels = {
        ok: 'Ok',
        cancel: 'Cancel'
    };

}
