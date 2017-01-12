# LokiJS Connector for Arrow
An Arrow connector that works with the file-based version of LokiJS.

## 1. Installation
You can use 
```sh 
npm install appc.loki.js
```
or add 
```sh 
"appc.loki.js" : "1.0.0"
``` 
to you **packacge.json** file.

## 2. Configuration
Register the connector in your **appc.json** file : 
```sh
"dependencies": {
    ...
    "connector/appc.loki.js": "^0.0.5"
  },
  ...
```
Set the configuration object in your ``conf/default.js`` file :

```sh
    connectors: {
        'appc.loki.js': {
            db : '<nameOfYourDatabase>',
			path: '/<pathToDb>/',
			lokiConfiguration: {
				autoload : true,
				serializationMethod: 'pretty'
			},
			modelAutogen: true,
			generateModelsFromSchema: true
        }
    }
```
## 3. Usage
Take a look at all available options and query parameters, in the API documentation section of your arrow administration.
Options are available under the group **appc.loki.js**.

### Example Model Usage
For example, if you want to persist the user model, set it such as:

```sh

var User = Arrow.Model.extend('user', {
    fields: {
        first_name: { type: String },
        last_name: { type: String },
        email: { type: String },
        role: { type: String },
        username: { type: String }
    },
    connector: ‘appc.loki.js'
});
```

## 4. Development

> This section is for individuals developing the LokiJS Connector and not intended
  for end-users.

```sh
npm install
node app.js
```

For development purposes use development branch only.

## 5. Testing
To test the connector, just run
```sh
npm test
```