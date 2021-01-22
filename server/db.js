const pg = require('pg');

const conString = "postgres://wpgcxwuh:D44mU96DH7uLCdnM7_yYBGwTpBQoZ2yk@suleiman.db.elephantsql.com:5432/wpgcxwuh";
const conObj = {
   host: 'suleiman.db.elephantsql.com',
   port:'5432',
   user: 'wpgcxwuh',
   password: 'D44mU96DH7uLCdnM7_yYBGwTpBQoZ2yk'
}
const pool = new pg.Pool(conObj);

module.exports = pool;
