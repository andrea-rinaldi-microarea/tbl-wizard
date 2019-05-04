
declare const __node_fs;
declare const __node_path;

export class Path {
    static basename(p: string, ext?: string): string {
        try {
            return __node_path.basename(p, ext);
        } catch {
            var folders = p.split("\\");
            if (ext) {
                return folders[folders.length - 1].substr(0, folders[folders.length - 1].length - ext.length);
            } else {
                return folders[folders.length - 1];
            }
        }
    };
    static join(p1:string, p2:string, p3?:string, p4?:string): string {
        try {
            return __node_path.join(p1, p2, p3? p3 : "", p4 ? p4 :"");
        } catch {
            return p1 + "\\" + p2 + (p3 ? "\\" + p3 : "") + (p4 ? "\\" + p4 : "");
        }
    }
}

export class Fs {
    static readdirSync(path: string | Buffer, options?: { encoding?: string | null } | string | null): string[] {
        return __node_fs.readdirSync(path, options);
    }
    static writeFileSync(filename: string, data: string, options?: any) {
        __node_fs.writeFileSync(filename, data, options);
    }
    static existsSync(path: string): boolean {
        return __node_fs.existsSync(path);
    }
}
  