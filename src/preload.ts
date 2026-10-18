import {contextBridge,ipcRenderer} from 'electron';
contextBridge.exposeInMainWorld('dialogue',{reply:(role:string,history:string,intent:string)=>ipcRenderer.invoke('dialogue:reply',role,history,intent),cancel:()=>ipcRenderer.invoke('dialogue:cancel')});
