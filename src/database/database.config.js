const mysql= require('mysql')
const dbconfig = {
    'connection': {
        'host':'localhost',
        'port':8888,
        'user':'root',
        'password':'a*70427042'

    },
	'database': 'trab_db',
    'users_table': 'user'
};
const connect = mysql.createConnection(dbconfig.connection);

module.exports={
    dbconfig:dbconfig,
    connect:connect
}