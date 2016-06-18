module.exports = {
    port: process.env.PORT || 2000,
    db: process.env.MONGOLAB_URI || 'mongodb://localhost/todoapi',
    test_port: 2001,
    test_db: 'mongodb://localhost/todoapi_test'
};