const { sqlDB } = require('../database')

module.exports = {
    getTim: (req,res) => {
        var sql =`SELECT * FROM tim`;
        
        sqlDB.query(sql, (err,results) => {
            console.log(results)
            if(err) {
                
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    getTimById: (req,res) => {
        var sql =`SELECT * FROM tim WHERE id=${sqlDB.escape(req.params.id)};`;
    
        console.log(sql)
        sqlDB.query(sql, (err,results) => {
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    addTim: (req,res) => {
        var tim = req.body.inserttim;
        
        if(category) {
            var sql = `INSERT INTO tim (NamaTim) values ? `
           
            sqlDB.query(sql, [tim], (err, results) => {
                if(err) {
                    return res.status(500).send(err)
                }
                sql = `SELECT * from tim;`
                
                sqlDB.query(sql, (err, results) => {
                    if(err) return res.status(500).send(err)
    
                    res.status(200).send(results)
                })
            })
        }
        else {
            res.status(500).send('Tolong isi query insertTim')
        }
    },
    editTim: (req,res) => {
        var data = req.body;
        var sql = `UPDATE tim SET ? WHERE id = ${req.params.id}`
           
        sqlDB.query(sql, data, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            sql = `SELECT * from tim;`
            sqlDB.query(sql, (err,results1) => {
                if(err) return res.status(500).send(err)
    
                res.status(200).send(results1)
            })
        })
    },
    deleteTim: (req,res) => {
        var sql = `DELETE FROM tim WHERE id = ${req.params.id}`
           
        sqlDB.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    }
}