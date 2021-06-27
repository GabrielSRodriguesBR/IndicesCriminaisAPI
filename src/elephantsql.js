var pg = require('pg');

var conString = "postgres://bmnzefbl:6LsZq1Hb-uId8yYhtBY_UYDDsyk07D8q@tuffi.db.elephantsql.com/bmnzefbl";
var db = new pg.Client(conString);

db.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    db.query('SELECT NOW() AS "theTime"', function(err, result) {
        
      if(err) {
        return console.error('error running query', err);
      }
  
      console.log(result.rows);
      
      
    });
  });

module.exports = db;