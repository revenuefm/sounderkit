import Accordion from './accordion';

export default {

    extends: Accordion,

    data: {
        targets: '> .sk-parent',
        toggle: '> a',
        content: '> ul'
    }

};
