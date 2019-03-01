import boot from './api/boot';
import Skit from './skit-core';
import Countdown from './components/countdown';
import Filter from './components/filter';
import Lightbox from './components/lightbox';
import lightboxPanel from './components/lightbox-panel';
import Notification from './components/notification';
import Parallax from './components/parallax';
import Slider from './components/slider';
import SliderParallax from './components/slider-parallax';
import Slideshow from './components/slideshow';
import Sortable from './components/sortable';
import Tooltip from './components/tooltip';
import Upload from './components/upload';

Skit.component('countdown', Countdown);
Skit.component('filter', Filter);
Skit.component('lightbox', Lightbox);
Skit.component('lightboxPanel', lightboxPanel);
Skit.component('notification', Notification);
Skit.component('parallax', Parallax);
Skit.component('slider', Slider);
Skit.component('sliderParallax', SliderParallax);
Skit.component('slideshow', Slideshow);
Skit.component('slideshowParallax', SliderParallax);
Skit.component('sortable', Sortable);
Skit.component('tooltip', Tooltip);
Skit.component('upload', Upload);

if (BUNDLED) {
    boot(Skit);
}

export default Skit;
