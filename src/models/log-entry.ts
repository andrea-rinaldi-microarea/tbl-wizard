export class LogEntry {
    constructor(
        public status: string ,
        public pad: number,
        public message: string
    ) {}

    static info(message: string) {
        return new this("info", 0, message);
    }

    static error(message: string) {
        return new this("error", 0, message);
    }

    static success(message: string) {
        return new this("succcess", 0, message);
    }
}
