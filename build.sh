#!/bin/bash
# delete prev. installments
rm -rf data/

# create a new folder
mkdir data
touch data/appc.loki.json

echo "Created LokiJS database!"
