export class Schema {

    private _schema;

    constructor(protected collections) {
        this._schema = new Array();
    }

    public getSchema() {
        return this._schema;
    }

    /**
     * Scans all schemas and returns their structure
     * A single object from the schema would look like:
     * 
     * {
     * name: 'Model name',
     * fields: [] // Model fields -- 'id'  field is mandatory
     * }  
     */
    public createSchema() {
        if (typeof this.collections !== "undefined" && this.collections.length > 0) {
            this.scanCollections();
        }
    }

    protected scanCollections() {
        for (var i = 0; i < this.collections.length; i++) {
            this._persistSchema(this.collections[i]);
        }
    }

    private _persistSchema(collection): void {
        let object = {
            name: collection.name,
            fields: []
        };
        let _fields = ['id'];
        if (typeof collection.data[0] !== "undefined") {
            (Object.keys(collection.data[0])).forEach(function (key) {
                if (key !== "$loki" && key !== "meta")
                    _fields.push(key);
            });
        }
        object.fields = _fields;
        //Add to Schema
        this._schema[collection.name] = object;
    }

}

