import {CodeRain} from '../src/renderer.mjs';
import {DEFAULT_RAIN,PRESETS} from '../src/state.mjs';
window.rain=new CodeRain(document.getElementById('fixture'),DEFAULT_RAIN);
window.presets=PRESETS;
window.CodeRain=CodeRain;
window.ready=true;
