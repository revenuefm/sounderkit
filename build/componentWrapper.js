/* global Skit, NAME */
import Component from 'component';

if (typeof window !== 'undefined' && window.Skit) {
    window.Skit.component(NAME, Component);
}

export default Component;