import mysql from 'mysql';
import config from 'config';

const mysqlConfig = config.get("mysql");

const prefix = mysqlConfig.prefix;

function connect(mysqlCon) {
  return new Promise((resolve, reject) => {
    mysqlCon.connect(function (err) {
      if (err) reject(err);
      else resolve(true);
    });
  });
}

function close(mysqlCon) {
  mysqlCon.end();
}

export function get() {
  return new Promise((resolve, reject) => {
    const mysqlCon = mysql.createConnection({
      host: mysqlConfig.host,
      user: mysqlConfig.user,
      port: mysqlConfig.port,
      password: mysqlConfig.pass,
      database: mysqlConfig.database
    });
    connect(mysqlCon)
      .then(status => {
        mysqlCon.query(`SELECT * FROM ${prefix}posts WHERE post_type LIKE 'post'  ORDER BY post_date DESC`, (err, rows, fields) => {
          close(mysqlCon);
          if (err) reject(err);
          else {
            resolve(rows);
          }
        });
      })
      .catch(err => reject(err));
  });
}

export function getByName(postName) {
  return new Promise((resolve, reject) => {
    const mysqlCon = mysql.createConnection({
      host: mysqlConfig.host,
      user: mysqlConfig.user,
      password: mysqlConfig.pass,
      database: mysqlConfig.database
    });
    connect(mysqlCon)
      .then(status => {
        mysqlCon.query(`SELECT * FROM ${prefix}posts WHERE post_type LIKE 'post' AND post_name LIKE '${postName}'`, (err, rows, fields) => {
          close(mysqlCon);
          if (err) reject(err);
          else resolve(rows);
        });
      })
      .catch(err => reject(err));
  });
}

export function getByAfter(after) {
  return new Promise((resolve, reject) => {
    const mysqlCon = mysql.createConnection({
      host: mysqlConfig.host,
      user: mysqlConfig.user,
      password: mysqlConfig.pass,
      database: mysqlConfig.database
    });
    connect(mysqlCon)
      .then(status => {
        mysqlCon.query(`SELECT * FROM wp_posts WHERE post_type LIKE 'post' AND post_date >= DATE_FORMAT('${after}', '%Y-%m-%d %H:%i:%s') ORDER BY post_date DESC`, (err, rows, fields) => {
          close(mysqlCon);
          if (err) reject(err);
          else resolve(rows);
        });
      })
      .catch(err => reject(err));
  });
}