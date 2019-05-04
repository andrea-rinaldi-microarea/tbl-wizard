import { Injectable } from '@angular/core';
import { Path, Fs } from '../utils/node';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  
  private _root: string = "";
  private _name: string = "";

  constructor(
    private electron: ElectronService
  ) { }

  set(newRoot: string) : void {
    this._root = newRoot;
    this._name = Path.basename(this._root);
  }

  path(): string {
    return Path.join(this._root, "standard", "applications");
  }

  root(): string {
    return this._root;
  }

  name() : string {
    return this._name;
  }

  isEmpty(): boolean {
    return this._root === "";
  }

  check(newRoot: string): string {
    if (newRoot === "") {
      return "Workspace folder cannot be null";
    }
    if (this.electron.isElectronApp) {
      if (!Fs.existsSync(newRoot)) {
        return "Folder not existing";
      }

      if (!Fs.existsSync(Path.join(newRoot,"standard","applications"))) {
        return "Folder does not contains <samp>Standard\\Applications</samp> subfolder";
      }

      return null;
    }
    
    return null;
  }
}
