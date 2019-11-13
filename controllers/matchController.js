const { sqlDB } = require('../database')

module.exports = {
    getMatch: (req,res) => {

        var sql =`SELECT m.*, t.NamaTim as TimHome, t2.NamaTim as TimAway FROM matchtim m
                    JOIN tim t
                    ON m.idTimHome = t.id
                    join tim t2
                    on m.idTimAway =t2.id;`;
        sqlDB.query(sql, (err,results) => {
            console.log(results)
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    getMatchById: (req,res) => {
        var sql =`SELECT * FROM matchtim WHERE id=${req.params.id};`;
    
        sqlDB.query(sql, (err,results) => {
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    addMatch: (req,res) => {
        var newProduct = req.body;
        console.log(newProduct)
        if(newProduct) {
            var sql = `INSERT INTO matchtim SET ? `
           
            sqlDB.query(sql, newProduct, (err, results) => {
                if(err) {
                    return res.status(500).send(err)
                }
    
                res.status(200).send(results)
            })
        }
        else {
            res.status(500).send('Tolong kasih Body')
        }
    },
    deleteMatch: (req,res) => {
        var sql = `DELETE FROM matchtim WHERE id = ${sqlDB.escape(req.params.id)}`
           
        sqlDB.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    editMatch: (req,res) => {
        var sql = `UPDATE matchtim SET ? WHERE id = ${req.params.id};`;
        sqlDB.query(sql, req.body, (err,results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    }
}