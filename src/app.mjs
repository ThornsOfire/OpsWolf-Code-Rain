import {CodeRain} from './renderer.mjs';
import {DEFAULT_RAIN,DEFAULT_UI,PRESETS,LIMITS,COLORS,rainSettings,uiSettings,loadSettings,saveSettings,contrast} from './state.mjs';

const $=id=>document.getElementById(id);
let storage;try{storage=localStorage;}catch{/* Session controls still work. */}
const loaded=loadSettings(storage);let rain=loaded.rain,ui=loaded.ui,personal=loaded.presets;
const labels={rainColor:'Rain',headColor:'Leading character',glowColor:'Glow',backgroundColor:'Background',speed:'Speed · cells / second',density:'Density',fontSize:'Glyph size · px',trail:'Trail · glyphs',glow:'Glow · px',brightness:'Brightness',opacity:'Opacity',surface:'Surface',text:'Text',accent:'Accent / focus'};
const say=text=>{$('status').textContent=text;};
let lastPhase='',lastSync=0;
const createRenderer=()=>new CodeRain($('rain'),rain,{
  onState:state=>{
    $('pause').setAttribute('aria-pressed',String(state.paused));$('pause').textContent=state.paused?'Resume animation':'Pause animation';
    $('motion-state').textContent=state.reducedMotion?'Reduced motion · still preview':state.forcedColors?'High contrast · animation off':state.paused?'Paused · settings still work':state.hidden||state.offscreen?'Hidden · animation suspended':'Live · no network, no tracking';
  },
  onTransition:result=>{
    rain=result.rain;
    if(lastPhase!==result.phase){lastPhase=result.phase;$('blend-state').textContent=result.phase;}
    if(result.done||performance.now()-lastSync>120){syncRain();lastSync=performance.now();}
  }
});
let renderer=createRenderer();

function stopBlend(){rain=renderer.stopTransition();$('blend-state').textContent='No blend running';lastPhase='';}
function applyRain(value){rain=rainSettings(value);renderer.setSettings(rain);syncRain();$('blend-state').textContent='No blend running';lastPhase='';}
function applyUI(value){
  const next=uiSettings(value);
  if(contrast(next.surface,next.text)<4.5||contrast(next.surface,next.accent)<3){say('That interface palette is hard to read. Text needs 4.5:1 contrast; focus needs 3:1. Previous palette kept.');return false;}
  ui=next;for(const [key,color] of Object.entries(ui)){document.documentElement.style.setProperty('--'+key,color);const input=$('ui-'+key);if(input)input.value=color;}
  document.documentElement.style.colorScheme=contrast(ui.surface,'#000000')>contrast(ui.surface,'#ffffff')?'light':'dark';return true;
}
function colorControl(key,parent,prefix,onChange){
  const cell=document.createElement('div'),label=document.createElement('label'),input=document.createElement('input');
  label.htmlFor=prefix+key;label.textContent=labels[key];input.id=prefix+key;input.type='color';input.value=(prefix==='ui-'?ui:rain)[key];
  input.addEventListener('input',()=>onChange(input.value));cell.append(label,input);$(parent).append(cell);
}
for(const key of COLORS)colorControl(key,'rain-colors','rain-',value=>{stopBlend();applyRain({...rain,[key]:value});});
for(const [key,[min,max]] of Object.entries(LIMITS)){
  const label=document.createElement('label'),text=document.createElement('span'),output=document.createElement('output'),input=document.createElement('input');
  label.className='slider-label';label.htmlFor='rain-'+key;text.textContent=labels[key];output.id='out-'+key;output.htmlFor='rain-'+key;label.append(text,output);
  input.id='rain-'+key;input.type='range';input.min=String(min);input.max=String(max);input.step=max<=1?'0.01':'1';
  input.addEventListener('input',()=>{stopBlend();applyRain({...rain,[key]:Number(input.value)});});$('sliders').append(label,input);
}
for(const key of Object.keys(DEFAULT_UI))colorControl(key,'ui-colors','ui-',value=>{const previous={...ui};if(!applyUI({...ui,[key]:value}))$('ui-'+key).value=previous[key];});
function syncRain(){
  for(const key of [...COLORS,...Object.keys(LIMITS)]){$('rain-'+key).value=String(rain[key]);const out=$('out-'+key);if(out)out.value=LIMITS[key][1]<=1?Number(rain[key]).toFixed(2):Number(rain[key]).toFixed(1);}
  if(document.activeElement!==$('glyphs'))$('glyphs').value=rain.glyphs;
}
function presetList(selected=0){
  $('preset').replaceChildren();[...PRESETS,...personal].forEach((p,index)=>{const option=document.createElement('option');option.value=String(index);option.textContent=(index>=PRESETS.length?'Personal · ':'')+p.name;$('preset').append(option);});
  $('preset').value=String(Math.min(selected,PRESETS.length+personal.length-1));$('remove-preset').disabled=Number($('preset').value)<PRESETS.length;
}
const selected=()=>[...PRESETS,...personal][Number($('preset').value)]??PRESETS[0];
$('preset').addEventListener('change',()=>{$('remove-preset').disabled=Number($('preset').value)<PRESETS.length;});
$('apply').addEventListener('click',()=>{
  const preset=selected();applyRain(preset.rain);
  const matched=!$('coordinate').checked||applyUI(preset.ui);if(matched)say(`Applied ${preset.name}. Not saved yet.`);
});
$('glyphs').addEventListener('change',()=>{
  const glyphs=$('glyphs').value,normalized=rainSettings({...rain,glyphs});
  if(!glyphs||glyphs.length>128||/[\s\p{C}]/u.test(glyphs)||new Set([...glyphs]).size>64){say('Use 1–64 unique visible characters without spaces. Previous characters kept.');$('glyphs').value=rain.glyphs;return;}
  applyRain(normalized);$('glyphs').value=rain.glyphs;
});
$('pause').addEventListener('click',()=>renderer.setPaused(!renderer.state.paused));
$('blend').addEventListener('click',()=>{
  if(!$('duration').reportValidity()||!$('hold').reportValidity())return;
  lastPhase='';renderer.startTransition(selected().rain,{duration:Number($('duration').value),hold:Number($('hold').value),loop:$('loop').checked});
  if(renderer.state.paused)$('blend-state').textContent='Ready · resume animation to blend';
});
$('stop').addEventListener('click',()=>{stopBlend();syncRain();say('Blend stopped at its current values.');});
$('save').addEventListener('click',()=>say(saveSettings(storage,{rain,ui,presets:personal})?'Saved this snapshot locally. Playback is not saved.':'Could not save in this browser. Your session settings are still here.'));
$('reset').addEventListener('click',()=>{applyRain(DEFAULT_RAIN);applyUI(DEFAULT_UI);say('Current settings reset. Personal presets and saved settings are unchanged until you save.');});
$('reset-ui').addEventListener('click',()=>{applyUI(DEFAULT_UI);say('Interface reset. Rain unchanged.');});
$('capture').addEventListener('click',()=>{
  const name=$('preset-name').value.trim();if(!name){say('Give this preset a name first.');$('preset-name').focus();return;}
  if(personal.length>=8){say('Eight personal presets already captured. Remove one before adding another.');return;}
  personal.push({name:name.slice(0,32),rain:{...rain},ui:{...ui}});presetList(PRESETS.length+personal.length-1);$('preset-name').value='';say('Preset captured for this session. Save locally to keep it.');
});
$('remove-preset').addEventListener('click',()=>{const index=Number($('preset').value)-PRESETS.length;if(index<0)return;personal.splice(index,1);presetList();say('Personal preset removed from this session. Save locally to keep the change.');});
// Restored UI values receive the same contrast checks as interactive changes.
if(!applyUI(ui)){ui={...DEFAULT_UI};applyUI(ui);say('Saved interface contrast was too low; readable defaults restored.');}else say(loaded.status);
presetList();syncRain();
let pausedBeforeNavigation=false;
window.addEventListener('pagehide',()=>{pausedBeforeNavigation=renderer.state.paused;rain=renderer.stopTransition();renderer.dispose();});
window.addEventListener('pageshow',event=>{if(event.persisted){renderer=createRenderer();renderer.setPaused(pausedBeforeNavigation);$('blend-state').textContent='No blend running';}});
