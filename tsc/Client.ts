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
        this._collectionsInUse = [];
    }


    protected init(): void {
        this.config = this._connector.config;
        let _path = path.join(process.cwd(), this.config.path);
        let options;
        if (this.config.lokiConfiguration) {
            options = this.config.lokiConfiguration;
        }
        //[ARRSOF-19] Before we load the database,
        //we need to check a couple of files first
        this._checkDatabaseFilesExist(_path);
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
        if (typeof this._collectionsInUse === "undefined") {
            this._collectionsInUse = [];
        }
        this._collectionsInUse.push(_collection);
        return _collection;
    }

    public getDatabase() {
        return this.database;
    }

    /**
     * Checks if database files exist,
     * if not the method creates them.
     * @param string path - the path to the database
     * @throws Error if a file can not be persisted
     * @returns boolean
     */
    private _checkDatabaseFilesExist(path: string): boolean {
        //Create the folder if it doesn't exist
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        //Check if files exist
        if (!fs.existsSync(path + this.config.db)) {
            this.__writeFile(path + this.config.db);
        }
        if (!fs.existsSync(path + this.config.db + '~')) {
            //Create the backup file (otherwise tha app breaks)
            this.__writeFile(path + this.config.db + '~');
        }
        return true;
    }

    private __writeFile(filePath) {
        fs.open(filePath, 'w', function (err, fd) {
            if (err) {
                throw new Error('error opening file: ' + err);
            }
            fs.write(fd, "", "UTF-8", function (err) {
                if (err)
                    throw new Error('error writing file: ' + err);
                fs.close(fd);
            });
        });
    }

}
