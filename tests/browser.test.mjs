import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,relative,isAbsolute,extname} from 'node:path';
import {launchFixture,delay} from './browser-driver.mjs';
const root=resolve(import.meta.dirname,'..'),out=resolve(root,'artifacts');await mkdir(out,{recursive:true});
const server=createServer(async(req,res)=>{
  try{
    if(req.url==='/fixture'){res.setHeader('Content-Type','text/html');res.end('<!doctype html><style>body{margin:0}#fixture{width:100vw;height:100vh}</style><div id="fixture"></div><script type="module" src="/tests/renderer-fixture.mjs"></script>');return;}
    const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://fixture').pathname==='/'?'/index.html':new URL(req.url,'http://fixture').pathname)),rel=relative(root,path);
    if(rel.startsWith('..')||isAbsolute(rel))throw Error('outside');
    res.setHeader('Content-Type',({'.html':'text/html','.mjs':'text/javascript','.css':'text/css'})[extname(path)]??'text/plain');res.end(await readFile(path));
  }catch{res.writeHead(404);res.end();}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`,browser=await launchFixture(origin),ev=x=>browser.evaluate(x),checks=[];
async function check(name,expression){const ok=await ev(expression);if(ok!==true)console.log(await ev(`({status:document.getElementById('motion-state')?.textContent,forced:matchMedia('(forced-colors: active)').matches,hidden:document.hidden,canvas:document.querySelectorAll('canvas').length,errors:typeof rain==='object'?rain.state:undefined})`));assert.equal(ok,true,name);checks.push(name);}
async function click(id){
  const point=await ev(`(()=>{const e=document.getElementById(${JSON.stringify(id)});e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
  await browser.command('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...point});await browser.command('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...point});await delay(40);
}
async function navigate(path){await browser.command('Page.navigate',{url:origin+path});for(let i=0;i<100;i++){try{if(await ev(`location.pathname===${JSON.stringify(path)}&&document.readyState==='complete'`))return;}catch{}await delay(30);}throw Error('Navigation timeout');}
async function shot(name){const image=await browser.command('Page.captureScreenshot',{format:'png'});await writeFile(resolve(out,name+'.png'),Buffer.from(image.data,'base64'));}
try{
  await check('Playground starts with renderer and all settings controls',`document.querySelectorAll('canvas').length===1&&document.querySelectorAll('input[type=range]').length===7&&document.querySelectorAll('input[type=color]').length===7`);
  await shot('playground');
  await click('pause');await check('Pointer pause works and keeps other controls usable',`document.getElementById('pause').getAttribute('aria-pressed')==='true'&&document.getElementById('save').disabled===false`);
  await ev(`document.getElementById('preset').value='1'`);await click('apply');
  await check('Applying rain alone preserves interface palette',`document.getElementById('rain-rainColor').value==='#63c9f5'&&document.getElementById('ui-surface').value==='#121b20'`);
  await click('coordinate');await click('apply');await check('Explicit coordination applies the preset interface',`document.getElementById('ui-surface').value==='#101c2b'`);
  await ev(`document.getElementById('rain-speed').focus()`);await browser.command('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});await browser.command('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});
  await check('Keyboard range editing updates settings',`Number(document.getElementById('rain-speed').value)===8`);
  await click('preset-name');await browser.command('Input.insertText',{text:'Test signal'});await click('capture');await click('save');
  await check('Personal preset and settings save without saving playback',`(()=>{const s=JSON.parse(localStorage.getItem('opswolf:code-rain:v1'));return s.presets[0].name==='Test signal'&&s.rain.speed===8&&s.paused===undefined})()`);
  await click('reset');await check('Reset changes current settings without erasing saved snapshot or presets',`document.getElementById('rain-speed').value==='12'&&document.getElementById('preset').options.length===5&&JSON.parse(localStorage.getItem('opswolf:code-rain:v1')).rain.speed===8`);
  await browser.command('Page.reload');await delay(250);await check('Reload restores saved values and personal preset',`document.getElementById('rain-speed').value==='8'&&document.getElementById('preset').options.length===5`);
  await ev(`document.querySelectorAll('details').forEach(e=>e.open=true);const e=document.getElementById('ui-text');e.value=document.getElementById('ui-surface').value;e.dispatchEvent(new Event('input',{bubbles:true}))`);
  await check('Unreadable custom interface colors are rejected',`document.getElementById('ui-text').value==='#edf6ff'&&document.getElementById('status').textContent.includes('hard to read')`);
  await ev(`const g=document.getElementById('glyphs');g.value='bad characters';g.dispatchEvent(new Event('change',{bubbles:true}))`);
  await check('Invalid glyph input leaves current character set intact',`!document.getElementById('glyphs').value.includes(' ')&&document.getElementById('status').textContent.includes('Previous characters kept')`);
  await ev(`Storage.prototype.setItem=function(){throw Error('test quota')}`);await click('save');await check('Storage failure is explicit and leaves session controls intact',`document.getElementById('status').textContent.includes('Could not save')&&document.getElementById('rain-speed').value==='8'`);
  await browser.command('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});await ev(`scrollTo(0,0)`);await shot('narrow');
  await check('Narrow layout stays inside the viewport and controls remain accessible',`document.documentElement.scrollWidth<=innerWidth&&document.querySelector('aside').getBoundingClientRect().width<=innerWidth`);
  await browser.command('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});await ev(`document.body.style.zoom='1.25'`);
  await check('Fractional zoom retains nonoverlapping controls',`document.querySelector('aside').getBoundingClientRect().left>=document.querySelector('.stage').getBoundingClientRect().right-1&&document.documentElement.scrollWidth<=innerWidth`);
  await ev(`document.body.style.zoom='1';document.getElementById('preset').value='3';document.getElementById('coordinate').checked=true`);await click('apply');await ev(`scrollTo(0,0)`);await shot('daylight');
  await check('Light preset switches interface independently through the explicit control',`document.documentElement.style.colorScheme==='light'&&document.getElementById('ui-surface').value==='#f1f7f4'`);
  await ev(`document.getElementById('rain-speed').value='15';document.getElementById('rain-speed').dispatchEvent(new Event('input',{bubbles:true}));dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true}));dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}))`);await delay(60);
  await check('Synthetic bfcache lifecycle retains session values and creates only one canvas',`document.getElementById('rain-speed').value==='15'&&document.querySelectorAll('canvas').length===1`);
  await browser.command('Emulation.setEmulatedMedia',{features:[{name:'forced-colors',value:'active'}]});await delay(200);await shot('high-contrast');
  await check('High-contrast playground hides decoration, reports suspension and preserves controls',`getComputedStyle(document.getElementById('rain')).visibility==='hidden'&&document.getElementById('motion-state').textContent.includes('High contrast')&&document.getElementById('pause').getBoundingClientRect().width>100`);
  await browser.command('Emulation.setEmulatedMedia',{features:[]});
  await delay(100);await check('Leaving high contrast updates the live playground status',`document.getElementById('motion-state').textContent.startsWith('Live')`);
  await navigate('/fixture');await delay(200);
  await check('Renderer animates at normal settings',`rain.state.frames>0&&rain.state.animating`);
  await ev(`rain.setPaused(true);window.stopped=rain.state.frames`);await delay(160);await check('Pause cancels animation rather than drawing invisible frames',`rain.state.frames===stopped&&!rain.state.animating`);
  await ev(`rain.startTransition(presets[1].rain,{duration:0.5});window.startColor=rain.settings.rainColor`);await delay(160);await check('Paused transition does not advance',`rain.settings.rainColor===startColor&&rain.state.transition`);
  await ev(`rain.setPaused(false)`);await delay(700);await check('Resume completes the transition at exact target values',`rain.settings.rainColor===presets[1].rain.rainColor&&!rain.state.transition`);
  await browser.command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await delay(60);await ev(`window.stopped=rain.state.frames`);await delay(120);
  await check('Reduced motion has a still preview and no animation loop',`rain.state.reducedMotion&&!rain.state.animating&&rain.state.frames===stopped`);
  await ev(`rain.startTransition(presets[2].rain,{duration:10,loop:true})`);await check('Reduced motion applies a blend destination immediately without hidden cycling',`rain.settings.rainColor===presets[2].rain.rainColor&&!rain.state.transition&&!rain.state.animating`);
  await browser.command('Emulation.setEmulatedMedia',{features:[{name:'forced-colors',value:'active'}]});await delay(60);await ev(`window.stopped=rain.state.frames`);await delay(120);await check('Forced colors stop the hidden decorative animation',`rain.state.forcedColors&&!rain.state.animating&&rain.state.frames===stopped`);
  await browser.command('Emulation.setEmulatedMedia',{features:[]});await delay(70);
  await ev(`document.getElementById('fixture').style.marginTop='3000px'`);await delay(120);await ev(`window.stopped=rain.state.frames`);await delay(120);await check('Offscreen container stops actual intersection-driven animation',`rain.state.offscreen&&!rain.state.animating&&rain.state.frames===stopped`);
  await ev(`document.getElementById('fixture').style.marginTop='0'`);await delay(100);await check('Returning onscreen resumes animation',`!rain.state.offscreen&&rain.state.animating`);
  await ev(`Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));window.stopped=rain.state.frames`);await delay(120);
  await check('Synthetic hidden-document event suspends animation',`rain.state.hidden&&!rain.state.animating&&rain.state.frames===stopped`);
  await ev(`delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));rain.setSettings({...rain.settings,fontSize:10,density:1,trail:40})`);
  await browser.command('Emulation.setDeviceMetricsOverride',{width:3840,height:2160,deviceScaleFactor:2,mobile:false});await delay(120);
  await check('4K/2x viewport remains within pixel, column and glyph budgets',`rain.state.pixelWidth<=2560&&rain.state.pixelHeight<=1440&&rain.state.columns<=140&&rain.state.drawnGlyphs<=1200&&rain.state.drawnGlyphs>0`);
  await ev(`window.before=rain.state.frames`);await delay(1100);await check('Observed fixture frame rate stays under its cap with scheduling tolerance',`rain.state.frames-before<=34&&rain.state.frames>before`);
  await ev(`rain.dispose();window.stopped=rain.state.frames;dispatchEvent(new Event('resize'));document.dispatchEvent(new Event('visibilitychange'))`);await delay(150);
  await check('Dispose removes owned canvas and cancels future work',`rain.state.disposed&&!rain.state.animating&&rain.state.frames===stopped&&document.querySelectorAll('canvas').length===0`);
  assert.deepEqual(browser.errors,[],'No uncaught exceptions in user journeys');checks.push('No uncaught browser exceptions');
  await writeFile(resolve(out,'browser-results.json'),JSON.stringify({passed:true,checks},null,2));console.log(JSON.stringify({passed:true,checks},null,2));
}finally{await browser.close();await new Promise(r=>server.close(r));}
