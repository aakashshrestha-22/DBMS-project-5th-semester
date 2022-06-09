const mysql = require("mysql");
// //connect to DB

const pool = mysql.createPool({ 
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
//home
exports.butt=(req,res)=>{
  res.render('homepage')
}

//vtu
exports.certf=(req,res)=>{
  res.render('cert-ficate')
}

exports.college=(req,res)=>{
  res.render('about-college')
}
//view
exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
      //symphony is wrong and not connected
    }
    console.log("connected as ID" + connection.threadId);
    //queries
    connection.query(
      'SELECT * FROM user WHERE status ="active"',
      (err, rows) => {
        //when done with connection
        connection.release();
        console.log(err ,  rows)
        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
        console.log("The data from user:\n", rows);
      }
      );
      
  });
};

//FIND BY SEARCH

exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
      //symphony is wrong and not connected
    }
    console.log("connected as ID" + connection.threadId);

    let searchTerm = req.body.search;
    //queries
    connection.query(
      'SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?',['%'+searchTerm+'%','%'+searchTerm+'%'],
      (err, rows) => {
        //when done with connection
        connection.release();
        console.log(err ,  rows)
        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
        console.log("The data from user:\n", rows);
      }
      );
      
  });
};

exports.form=(req,res)=>{
  res.render('add-user')
}
// add new user
exports.create= (req,res)=>{
  // res.render('add-user')
  const{first_name, last_name, email, phone, comments}=req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
      //symphony is wrong and not connected
    }
    console.log("connected as ID" + connection.threadId);
    
    //queries
    connection.query(
     'INSERT INTO user SET  first_name = ? ,last_name = ?,email=?,phone=?,comments=?',[first_name,last_name, email, phone, comments], 
      (err, rows) => {
        //when done with connection
        connection.release();
        console.log(err ,  rows)
        if (!err) {
          res.render("add-user", { alert: 'User Added Successfully' });
        } else {
          console.log(err);
        }
        console.log("The data from user:\n", rows);
      }
      );
      
  });
}

//edit user
exports.edit= (req,res)=>{ 
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
      //symphony is wrong and not connected
    }
    console.log("connected as ID" + connection.threadId);
    //queries
    connection.query(
      'SELECT * FROM user WHERE id= ?',[req.params.id],
      (err, rows) => {
        //when done with connection
        connection.release();
        console.log(err ,  rows)
        if (!err) {
          res.render("edit-user", { rows });
        } else {
          console.log(err);
        }
        console.log("The data from user:\n", rows);
      }
      );
      
  });
}

//update user
exports.update= (req,res)=>{ 
  const{first_name, last_name, email, phone, comments}=req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
      //symphony is wrong and not connected
    }
    console.log("connected as ID" + connection.threadId);
    //queries
    connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id],
      (err, rows) => {
        //when done with connection
        connection.release();
        console.log(err ,  rows)
        if (!err) {
         
          pool.getConnection((err, connection) => {
            if (err) {
              throw err;
              //symphony is wrong and not connected
            }
            console.log("connected as ID" + connection.threadId);
            //queries
            connection.query(
              'SELECT * FROM user WHERE id= ?',[req.params.id],
              (err, rows) => {
                //when done with connection
                connection.release();
                console.log(err ,  rows)
                if (!err) {
                  res.render("edit-user", { rows, alert:`${first_name} has been updated` });
                } else {
                  console.log(err);
                }
                console.log("The data from user:\n", rows);
              }
              );
              
          });


        } else {
          console.log(err);
        }
        console.log("The data from user:\n", rows);
      }
      );
      
  });
}
//delete user
exports.delete= (req,res)=>{ 
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
      //symphony is wrong and not connected
    }
    console.log("connected as ID" + connection.threadId);
    //queries
    connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        //when done with connection
        connection.release();
        console.log(err ,  rows)
        if (!err) {
          res.redirect('/')
        } else {
          console.log(err);
        }
        console.log("The data from user:\n", rows);
      }
      );
      
  });
}

//view user
exports.viewAll = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
      //symphony is wrong and not connected
    }
    console.log("connected as ID" + connection.threadId);
    //queries
    connection.query(
      'SELECT * FROM user WHERE id=?',[req.params.id],
      (err, rows) => {
        //when done with connection
        connection.release();
        console.log(err ,  rows)
        if (!err) {
          res.render("view-user", { rows });
        } else {
          console.log(err);
        }
        console.log("The data from user:\n", rows);
      }
      );
      
  });
};
