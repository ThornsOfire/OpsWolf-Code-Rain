import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULT_RAIN,DEFAULT_UI,PRESETS,LIMITS,rainSettings,uiSettings,blendRain,Transition,STORAGE_KEY,loadSettings,saveSettings,contrast} from '../src/state.mjs';

test('invalid numeric, color, glyph and prototype values cannot escape the settings contract',()=>{
  const value=rainSettings(JSON.parse('{"speed":1e99,"density":-4,"fontSize":"12","glow":null,"rainColor":"url(evil)","glyphs":"a b","__proto__":{"polluted":true}}'));
  assert.equal(value.speed,40);assert.equal(value.density,0.05);assert.equal(value.fontSize,DEFAULT_RAIN.fontSize);assert.equal(value.glow,DEFAULT_RAIN.glow);
  assert.equal(value.rainColor,DEFAULT_RAIN.rainColor);assert.equal(value.glyphs,DEFAULT_RAIN.glyphs);assert.equal({}.polluted,undefined);
  assert.deepEqual(rainSettings({speed:NaN,opacity:Infinity}),{...DEFAULT_RAIN});
  for(const bad of [null,[],1,'bad'])assert.deepEqual(rainSettings(bad),{...DEFAULT_RAIN});
});
test('glyphs are bounded Unicode codepoints and colors have one canonical form',()=>{
  assert.equal(rainSettings({glyphs:'😀😀01',rainColor:'#ABCDEF'}).glyphs,'😀01');assert.equal(rainSettings({rainColor:'#ABCDEF'}).rainColor,'#abcdef');
  for(const glyphs of ['', '\n','a\u0000','a\u202e','x'.repeat(129),Array.from({length:65},(_,i)=>String.fromCodePoint(0x400+i)).join('')])assert.equal(rainSettings({glyphs}).glyphs,DEFAULT_RAIN.glyphs);
});
test('transition begins at current settings, ends exactly and interpolates numeric/color values',()=>{
  const from={...DEFAULT_RAIN,speed:4,rainColor:'#000000',glyphs:'01'},to={...DEFAULT_RAIN,speed:20,rainColor:'#ffffff',glyphs:'AB'};
  const t=new Transition(from,to,{duration:2});assert.deepEqual(t.advance(0).rain,from);
  const half=t.advance(1000);assert.equal(half.rain.speed,12);assert.equal(half.rain.rainColor,'#808080');assert.equal(half.rain.glyphs,'AB');assert.equal(half.done,false);
  assert.deepEqual(t.advance(1000).rain,to);assert.equal(t.advance(100).done,true);
});
test('loop holds both endpoints and reverses without accumulating unbounded state',()=>{
  const t=new Transition({...DEFAULT_RAIN,speed:2},{...DEFAULT_RAIN,speed:10},{duration:1,hold:1,loop:true});
  assert.equal(t.advance(1000).phase,'Holding target');assert.equal(t.advance(500).rain.speed,10);
  assert.equal(t.advance(1000).rain.speed,6);assert.equal(t.advance(500).phase,'Holding start');assert.equal(t.advance(500).rain.speed,2);
  assert.equal(t.advance(1000).rain.speed,6);assert.equal(t.advance(4000*1000).rain.speed,6);
});
test('invalid elapsed time and out-of-range options are safe; blend does not mutate inputs',()=>{
  const from=Object.freeze({...DEFAULT_RAIN}),to=Object.freeze({...DEFAULT_RAIN,speed:30});
  const t=new Transition(from,to,{duration:Infinity,hold:-1,loop:'yes'});assert.equal(t.duration,8000);assert.equal(t.hold,0);assert.equal(t.loop,false);
  assert.deepEqual(t.advance(-5).rain,from);assert.deepEqual(t.advance(NaN).rain,from);assert.equal(blendRain(from,to,2).speed,30);assert.deepEqual(from,DEFAULT_RAIN);
});
test('saved state round-trips only under the owned key and excludes playback',()=>{
  const map=new Map([['unrelated','keep']]),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)};
  assert.equal(saveSettings(storage,{rain:{...DEFAULT_RAIN,speed:25},ui:DEFAULT_UI,presets:[{name:'Personal',rain:DEFAULT_RAIN,ui:DEFAULT_UI}],paused:true}),true);
  const restored=loadSettings(storage);assert.equal(restored.rain.speed,25);assert.equal(restored.presets[0].name,'Personal');assert.equal(map.get('unrelated'),'keep');assert.equal(JSON.parse(map.get(STORAGE_KEY)).paused,undefined);
});
test('unsupported, corrupt, oversized, missing and unavailable storage keep usable defaults',()=>{
  for(const raw of ['not json','null','[]','{"version":2}','x'.repeat(32769)])assert.deepEqual(loadSettings({getItem:()=>raw}).rain,DEFAULT_RAIN);
  assert.deepEqual(loadSettings(undefined).rain,DEFAULT_RAIN);assert.deepEqual(loadSettings({getItem(){throw Error('denied')}}).ui,DEFAULT_UI);
  assert.equal(saveSettings(undefined,{rain:DEFAULT_RAIN,ui:DEFAULT_UI}),false);assert.equal(saveSettings({setItem(){throw Error('quota')}},{rain:DEFAULT_RAIN,ui:DEFAULT_UI}),false);
});
test('personal preset count, names and fields are bounded on load',()=>{
  const data={version:1,presets:Array.from({length:20},()=>({name:'X',rain:{speed:999,evil:'no'},ui:{text:'#123456'}}))};
  const result=loadSettings({getItem:()=>JSON.stringify(data)});assert.equal(result.presets.length,8);assert.equal(result.presets[0].rain.speed,40);assert.equal(result.presets[0].rain.evil,undefined);
  assert.deepEqual(uiSettings({surface:'red'}),DEFAULT_UI);
});
test('all shipped interface palettes meet text and focus contrast',()=>{
  for(const p of PRESETS){assert.ok(contrast(p.ui.surface,p.ui.text)>=4.5,p.name);assert.ok(contrast(p.ui.surface,p.ui.accent)>=3,p.name);for(const [key,[min,max]] of Object.entries(LIMITS))assert.ok(p.rain[key]>=min&&p.rain[key]<=max);}
});
