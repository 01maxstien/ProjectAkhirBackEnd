const { sqlDB } = require('../database')

module.exports = {
    getCategory: (req,res) => {
        var nama = req.query.nama ? req.query.nama : '';
        
        var sql =`SELECT * FROM category WHERE nama LIKE '%${nama}%';`;
        
        sqlDB.query(sql, (err,results) => {
            console.log(results)
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    getCategoryById: (req,res) => {
        var sql =`SELECT * FROM category WHERE id=${sqlDB.escape(req.params.id)};`;
    
        console.log(sql)
        sqlDB.query(sql, (err,results) => {
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    addCategory: (req,res) => {
        var category = req.body.insertcategory;
        
        if(category) {
            var sql = `INSERT INTO category (nama) values ? `
           
            sqlDB.query(sql, [category], (err, results) => {
                if(err) {
                    return res.status(500).send(err)
                }
                sql = `SELECT * from category;`
                
                sqlDB.query(sql, (err, results) => {
                    if(err) return res.status(500).send(err)
    
                    res.status(200).send(results)
                })
            })
        }
        else {
            res.status(500).send('Tolong isi query insertcategory')
        }
    },
    editCategory: (req,res) => {
        var data = req.body;
        var sql = `UPDATE category SET ? WHERE id = ${req.params.id}`
           
        sqlDB.query(sql, data, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            sql = `SELECT * from category;`
            sqlDB.query(sql, (err,results1) => {
                if(err) return res.status(500).send(err)
    
                res.status(200).send(results1)
            })
        })
    },
    deleteCategory: (req,res) => {
        var sql = `DELETE FROM category WHERE id = ${req.params.id}`
           
        sqlDB.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    }
}