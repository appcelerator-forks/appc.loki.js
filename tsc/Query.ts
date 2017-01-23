export class Query {

    protected query;

    private _statement;
    private _statementCollection;
    private _result;

    constructor(protected collection) { }

    public find(id?: number): Query {
        if (typeof id !== "undefined" && typeof id === "number") { // !!! works with integers for now
            this.where({ '$eq': { '$loki': id } });
            this._statementInitialize();
            return this;
        }
        return this;
    }

    public getQuery() {
        return this.query;
    }

    /**
     * Set where criteria
     * db.find().where({'$gt' : { age : 40 } }) ...
     */
    public where(query): Query {
        //Multiple queries
        if (Array.isArray(query)) {
            let andStatement = {};
            andStatement['$and'] = [];
            this._statement = false;
            query.map((data, index) => {
                //push the new statement to the Array
                andStatement['$and'].push(this.createQuery(data));
            });
            this._statementCollection = andStatement;
        } else {
            this._statement = this.createQuery(query);
        }
        //Initialize the statement
        this._statementInitialize();
        return this;
    }

    /**
     * Set sorting on the Query Criteria
     */
    public simplesort(name: string): Query {
        (this.query).simplesort(name);
        return this;
    }

    /**
     * Set offset to the Query Criteria
     * db.find().offset(4)
     */
    public offset(offset: number): Query {
        (this.query).offset(offset);
        return this;
    }

    /**
     * Set limit to the Query Criteria
     * db.find().limit(4)
     */
    public limit(limit: number): Query {
        (this.query).limit(limit);
        return this;
    }

    /**
     * Query for one result
     */
    public one(): Object {
        let result = this.execute();
        if (result.length > 0 && result.length < 2) {
            return result[0];
        }
        return null;
    }

    /**
     * Find one method
     */
    public findOneById(id: number): Object {
        let query_criteria = this.createQuery({ '$eq': { '$loki': id } });
        return (this.collection).findOne(query_criteria);
    }

    /**
     * Find all records in a collection
     */
    public findAll(): Object {
        return (this.collection).find();
    }

    public distinct(field): Object {
        var self = this;
        let dist = [];
        let result = [];
        if (this.query) {
            (this.collection).where((elem) => {
                if (dist.indexOf(elem[field]) === -1) {
                    dist.push(elem[field]);
                    result.push(elem);
                }
            });
            return result;
        }
        return null;
    }

    public count() {
        var self = this;
        let count = 0;
        if (this.query) {
            (this.collection).where((elem) => {
                count++;
            });
        }
        return count;
    }

    /**
     * Fetch all results
     * NOTE:
     * Will return only one result, even if limit > 1 !!!
     */
    public all() {
        if (typeof this.query === "undefined") {
            this._statement = null;
            this._statementInitialize();
        }
        let result = this.execute();
        if (!result || typeof result === "undefined") {
            result = [];
        }
        return result;
    }

    /**
     * Executes the query
     */
    protected execute(): Array<any> {
        this._result = (this.query).data();
        return this._result;
    }


    protected createQuery(query) {
        if (typeof query === 'string') {
            try {
                query = JSON.parse(query);
            } catch (error) {
                throw new Error('Passed query should be an Object!' + error);
            }
        }
        if (typeof query !== 'object') {
            throw new Error('Passed query should be an Object!');
        }
        let statement = new Statement();
        let _resultQuery = {};
        Object.keys(query).forEach((key) => {
            if (statement.checkCommandExists(key)) {
                _resultQuery = statement.create(key, query[key]);
            } else {
                throw new Error(`Unsupported command: '${key}'!`);
            }
        });
        return _resultQuery;
    }

    //Initialize the statement
    private _statementInitialize() {
        if (typeof this._statementCollection !== "undefined") {
            this.query = (this.collection).chain().find(this._statementCollection);
        } else {
            this.query = (this.collection).chain().find(this._statement);
        }
    }

}

class Statement {

    private _commands = [];

    constructor() {
        this._commands = [
            '$eq',
            '$dteq',
            '$gt',
            '$gte',
            '$lte',
            '$ne',
            '$regex',
            '$in',
            '$contains',
            '$containsAny',
            '$containsNone',
            '$and',
            '$or'
        ];
    }

    //Equal something
    public create(command, data): Object {
        let result = {};
        const key = Object.keys(data)[0] || 'id';
        const value = data[key] || undefined;
        result[key] = {};
        result[key][command] = value;
        return result;
    }

    //Check if the statement is supported
    public checkCommandExists(command: string) {
        let result = this._commands.filter((value) => {
            return value === command;
        });
        return (result.length > 0);
    }

}

//db.find(14).where({'$gt' : { age : 40 } }).limit().skip()