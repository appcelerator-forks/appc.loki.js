export default class Configuration {
    protected settings: Settings;

    public db: string;
    public keepAlive: boolean;
    public path: string;
    public lokiConfiguration: Object;

    constructor(private _config) {
        this.validateConfiguration();
        this.setConfiguration();
    }

    public getDbName(): string {
        return this.db;
    }

    public getPath(): string {
        return this.path;
    }

    public getDbFile() : string{
        return this.path + this.db;
    }

    public shouldKeepAlive(): boolean {
        return this.keepAlive;
    }

    protected validateConfiguration() {
        if (typeof this._config.connectors['com.loki.js']) {
            throw new Error(`Please provide connector configuratio to your default.js file`);
        }
        if (typeof this._config.connectors['com.loki.js'].db) {
            throw new Error(`Please provide connector configuratio to your default.js file`);
        }
    }

    protected setConfiguration() {
        this.settings = this._config.connectors['com.loki.js']
        this.db = <string>this.settings.db;
        this.keepAlive = this.settings.keepAlive || false;
        this.path = this.settings.dataFolder;
    }
}

interface Settings {
    db: string;
    keepAlive: boolean;
    dataFolder: string;
}