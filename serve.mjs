import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,relative,extname,isAbsolute} from 'node:path';

const root=fileURLToPath(new URL('.',import.meta.url));
const port=Number(process.argv[2]??4179);
if(!Number.isInteger(port)||port<1024||port>65535)throw Error('Choose a port from 1024 through 65535');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8'};
const server=createServer(async(req,res)=>{
  try{
    if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
    const url=new URL(req.url,'http://127.0.0.1'),path=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
    const rel=relative(root,path),type=mime[extname(path)];
    if(!rel||rel.startsWith('..')||isAbsolute(rel)||!type||!['index.html','style.css','src'].includes(rel.split(/[\\/]/)[0])){res.writeHead(404);res.end();return;}
    const body=await readFile(path);res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:body);
  }catch{res.writeHead(404);res.end();}
});
server.listen(port,'127.0.0.1',()=>console.log(`Code Rain: http://127.0.0.1:${port} · Ctrl+C to stop`));
