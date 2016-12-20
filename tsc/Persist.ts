import { Query } from './Query';

export class Persist {

    protected query;
    protected collection;
    protected db;

    constructor(_collection) {
        this.collection = _collection.getCollection();
        this.db = _collection.getDatabase();
    }

    public insert(document) {
        let result = (this.collection).insert(document);
        this.db.saveDatabase();
        return result;
    }

    /**
     * Maps existing data to @param data and persists the selected Object
     */
    public upsert(modelId, document) {
        if (!modelId || !document) {
            throw new Error(`You must provide a Model id and data Object, that will be persisted`);
        }
        let criteria = new Query(this.collection);
        let model = criteria.findOneById(parseInt(modelId));
        (Object.keys(document)).map((item) => {
            if (item !== "meta") {
                model[item] = document[item];
            }
        });
        if (model) {
            let result = (this.collection).update(model);
            //You need to call the saveDatabase method on the db object, in order for data
            //to be persisted
            this.db.saveDatabase();
            return result;
        } else {
            throw new Error('Could not find model');
        }
    }

    public remove(modelId) {
        if (!modelId) {
            throw new Error(`You must provide a Model id and data Object, that will be persisted`);
        }
        let criteria = new Query(this.collection);
        let model = criteria.findOneById(parseInt(modelId));

        if (model) {
            let result = (this.collection).remove(model);
            //You need to call the saveDatabase method on the db object, in order for data
            //to be persisted
            this.db.saveDatabase();
            return result;
        } else {
            throw new Error('Could not find model');
        }
    }

    public removeAll() {
        let criteria = new Query(this.collection);
        let model = criteria.findAll();

        if (model) {
            let result = (this.collection).remove(model);
            //You need to call the saveDatabase method on the db object, in order for data
            //to be persisted
            this.db.saveDatabase();
            return result;
        } else {
            throw new Error('Could not find model');
        }
    }

}

//db.update(14, { name: 'Some other name'})
//db.find(14).where({'$gt' : { age : 40 } }).limit().skip()