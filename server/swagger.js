const swaggerJSDoc = require('swagger-jsdoc');
const config = require('./config/keys');

const swaggerDefinition = {
    openapi: '3.0.0', // Specify the version of Swagger
    info: {
        title: 'Bragging-rights API',
        version: '1.0.0',
        description: 'API for Bragging-rights',
    },
    servers: [
        {
            url: `${config.backendUrl}/api`, // Update with your API's URL
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./server.js'], // Update with the path to your main API file
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
