/**
 * Collection related methods
 */
export class Collection {

    private _collection;

    constructor(protected name, private _loki) {
        this._parseName();
    }

    /**
     * Checks if Collection exists (by name)
     */
    public exists(): boolean {
        let result: boolean = false;
        (this._loki.database.collections).forEach((collection, index) => {
            if (collection.name === this.name) {
                result = true;
                this._collection = this._loki.database.collections[index];
                return;
            }
        });
        return result;
    }

    public getDatabase() {
        return this._loki.getDatabase();
    }

    /**
     * Alias of this.getDatabase();
     */
    public getDb() {
        return this.getDatabase();
    }

    /**
     * Returns selected Collection
     */
    public getCollection() {
        let __collection;
        (this._loki.database.collections).forEach((collection, index) => {
            if (collection.name === this.name) {
                this._collection = this._loki.database.collections[index];
                __collection = this._collection;
            }
        });
        return __collection;
    }

    //Replace unwanted chars from model name
    private _parseName() {
        if ((this.name).indexOf('com.loki.js') >= 0) {
            this.name = (this.name).replace("com.loki.js/", "");
        }
    }

}