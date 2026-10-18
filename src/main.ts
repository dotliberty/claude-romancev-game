import {app,BrowserWindow,screen,ipcMain} from 'electron';
import {Dialogue} from './dialogue';
import * as path from 'node:path';
const dialogue=new Dialogue();
app.whenReady().then(()=>{const scale=screen.getPrimaryDisplay().scaleFactor;const size=Math.round(1200/scale);const w=new BrowserWindow({width:size,height:size,frame:false,resizable:false,backgroundColor:'#101320',webPreferences:{preload:path.join(__dirname,'preload.js'),nodeIntegration:false,contextIsolation:true}});ipcMain.handle('dialogue:reply',async(event,role,history,intent)=>{if(event.sender!==w.webContents||!['hero','partner'].includes(role)||typeof history!=='string'||history.length>10000||!['kind','insult'].includes(intent))throw Error('Некорректный запрос');return dialogue.reply(role,history,intent);});ipcMain.handle('dialogue:cancel',()=>dialogue.cancel());w.on('closed',()=>dialogue.cancel());w.loadFile(path.join(__dirname,'../index.html'));w.setMenu(null);});
app.on('window-all-closed',()=>app.quit());
