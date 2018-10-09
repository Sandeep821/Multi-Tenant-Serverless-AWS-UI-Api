'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// The document client affords developers the use of native JavaScript
// types instead of AttributeValues to simplify the JavaScript development
// experience with Amazon DynamoDB.
// - AWS Documentation
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.tenantName !== 'string' || typeof data.tenantId !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create the pet item.'));
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      tenantName: data.tenantName,
      tenantId: data.tenantId,
      msg: data.msg,
      createdAt: timestamp,
      updatedAt: timestamp,
      site:{
        name: data.site.name,
        style:{
          logo:{
            direction: data.site.style.logo.direction
          },
          nav: {
            direction: data.site.style.nav.direction
          }
        },
        elements:  {
          bannerheading: data.site.elements.bannerheading,
          bannersData: data.site.elements.bannersData,
          carouselData: data.site.elements.carouselData,
        },
      }
    }
  };

  // write the pet to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create the pet item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};