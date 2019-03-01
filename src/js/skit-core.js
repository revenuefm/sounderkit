import Skit from './api/index';
import core from './core/index';
import boot from './api/boot';

Skit.version = VERSION;

core(Skit);

if (!BUNDLED) {
    boot(Skit);
}

export default Skit;
