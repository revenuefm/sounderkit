import Accordion from './accordion';
import Alert from './alert';
import Core from './core';
import Cover from './cover';
import Drop from './drop';
import Dropdown from './dropdown';
import FormCustom from './form-custom';
import Gif from './gif';
import Grid from './grid';
import HeightMatch from './height-match';
import HeightViewport from './height-viewport';
import Icon, {IconComponent, Slidenav, Search, Close, Spinner} from './icon';
import Img from './img';
import Leader from './leader';
import Margin from './margin';
import Modal from './modal';
import Nav from './nav';
import Navbar from './navbar';
import Offcanvas from './offcanvas';
import OverflowAuto from './overflow-auto';
import Responsive from './responsive';
import Scroll from './scroll';
import Scrollspy from './scrollspy';
import ScrollspyNav from './scrollspy-nav';
import Sticky from './sticky';
import Svg from './svg';
import Switcher from './switcher';
import Tab from './tab';
import Toggle from './toggle';
import Video from './video';

export default function (Skit) {

    // core components
    Skit.component('accordion', Accordion);
    Skit.component('alert', Alert);
    Skit.component('cover', Cover);
    Skit.component('drop', Drop);
    Skit.component('dropdown', Dropdown);
    Skit.component('formCustom', FormCustom);
    Skit.component('gif', Gif);
    Skit.component('grid', Grid);
    Skit.component('heightMatch', HeightMatch);
    Skit.component('heightViewport', HeightViewport);
    Skit.component('icon', Icon);
    Skit.component('img', Img);
    Skit.component('leader', Leader);
    Skit.component('margin', Margin);
    Skit.component('modal', Modal);
    Skit.component('nav', Nav);
    Skit.component('navbar', Navbar);
    Skit.component('offcanvas', Offcanvas);
    Skit.component('overflowAuto', OverflowAuto);
    Skit.component('responsive', Responsive);
    Skit.component('scroll', Scroll);
    Skit.component('scrollspy', Scrollspy);
    Skit.component('scrollspyNav', ScrollspyNav);
    Skit.component('sticky', Sticky);
    Skit.component('svg', Svg);
    Skit.component('switcher', Switcher);
    Skit.component('tab', Tab);
    Skit.component('toggle', Toggle);
    Skit.component('video', Video);

    // Icon components
    Skit.component('close', Close);
    Skit.component('marker', IconComponent);
    Skit.component('navbarToggleIcon', IconComponent);
    Skit.component('overlayIcon', IconComponent);
    Skit.component('paginationNext', IconComponent);
    Skit.component('paginationPrevious', IconComponent);
    Skit.component('searchIcon', Search);
    Skit.component('slidenavNext', Slidenav);
    Skit.component('slidenavPrevious', Slidenav);
    Skit.component('spinner', Spinner);
    Skit.component('totop', IconComponent);

    // core functionality
    Skit.use(Core);

}
