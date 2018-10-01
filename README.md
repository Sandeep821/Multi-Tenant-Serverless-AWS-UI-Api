# serverless-node-rest-api for FE app 'Multi-Tenant-React-App'

A Serverless Framework Project for a REST HTTP API for CRUD operations on DynamoDB.

1. `git clone git@github.com:fernando-mc/serverless-node-rest-api.git`
OR
`git clone https://github.com/fernando-mc/serverless-node-rest-api.git`

2. `npm install`

3. `serverless deploy`

That's it!

Then...

Add a tenant:
`curl -X POST https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/style --data '{ "tenantName": "Tenant01", "tenantId": "tenant001" }'`

Sample response:
`{"id":"618b4190-6917-11e7-82a3-ed6b88661fcb","tenantName":"Tenant01","tenantId":"tenant001","createdAt":1500093479977,"updatedAt":1500093479977}`

Add another tenant:
`curl -X POST https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/style --data '{ "tenantName": "Tenant02", "tenantId": "tenant002" }'`

List all tenants:
`curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/style`

List the details of a specific tenant (in this case Bella from above):
`curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/style/618b4190-6917-11e7-82a3-ed6b88661fcb`

General structure for listing specific tenant details:
`curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/style/id`

Inspired by - https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb
