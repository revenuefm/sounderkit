import globalAPI from './global';
import hooksAPI from './hooks';
import stateAPI from './state';
import instanceAPI from './instance';
import componentAPI from './component';
import * as util from 'skit-util';

const Skit = function (options) {
    this._init(options);
};

Skit.util = util;
Skit.data = '__uikit__';
Skit.prefix = 'sk-';
Skit.options = {};

globalAPI(Skit);
hooksAPI(Skit);
stateAPI(Skit);
componentAPI(Skit);
instanceAPI(Skit);

export default Skit;
