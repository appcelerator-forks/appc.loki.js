/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/node/node.d.ts" />

var lokijs = require('lokijs'),
    fs = require('fs'),
    path = require('path');

import Configuration from './Configuration';

export class Client {

    protected config: Configuration;

    protected database;
    protected collection;

    private _collectionsInUse: Array<any>;

    constructor(private _connector) {
        this.init();
        this._collectionsInUse = new Array();
    }


    protected init(): void {
        this.config = this._connector.config;
        let _path = path.join(process.cwd(), this.config.path);
        let options;
        if (this.config.lokiConfiguration) {
            options = this.config.lokiConfiguration;
        }
        this.database = new lokijs(_path + this.config.db, options);
    }

    //Run on application initialization
    public connect(next): void {
        this._connector.loki = this;
        this.database.loadDatabase(null, next);
    }

    //Run on application exit
    public disconnect(next): void {
        if (typeof this.collection !== "undefined") {
            this.database.saveDatabase(function () {
                this.database.close(next);
            }.bind(this));
        }
    }

    /**
     * Choose which collection to use
     * @return Object the selected connection
     */
    public use(collection: string) {
        let _collection = this.collection = this.database.addCollection(collection);
        if (typeof this._collectionsInUse === "undefined")
            this._collectionsInUse = new Array();
        this._collectionsInUse.push(_collection);
        return _collection;
    }

    public getDatabase() {
        return this.database;
    }

}
