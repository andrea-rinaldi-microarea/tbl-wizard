import { Injectable } from '@angular/core';
import { Path, Fs } from '../utils/node';
import { ElectronService } from 'ngx-electron';

const WORKSPACE_KEY = "WorkspaceService.root";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  
  private _root: string = "";

  constructor(
    private electron: ElectronService
  ) {
    this._root = localStorage.getItem(WORKSPACE_KEY);
  }

  set(newRoot: string) : void {
    this._root = newRoot;
    localStorage.setItem(WORKSPACE_KEY, this._root);
  }

  path(): string {
    return this.isEmpty() ? "" : Path.join(this._root, "standard", "applications");
  }

  root(): string {
    return this._root;
  }

  name() : string {
    return this.isEmpty() ? "" : Path.basename(this._root);
  }

  isEmpty(): boolean {
    return this._root === null || this._root === "";
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
