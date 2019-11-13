const { sqlDB } = require('../database')

module.exports = {
    getPosisiPlayer: (req,res) => {
        var nama = req.query.nama ? req.query.nama : '';
        
        var sql =`SELECT * FROM posisiplayer WHERE nama LIKE '%${nama}%';`;
        
        sqlDB.query(sql, (err,results) => {
            console.log(results)
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    getPosisiPlayerById: (req,res) => {
        var sql =`SELECT * FROM posisiplayer WHERE id=${sqlDB.escape(req.params.id)};`;
    
        console.log(sql)
        sqlDB.query(sql, (err,results) => {
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    addPosisiPlayer: (req,res) => {
        var posisiplayer = req.body.insertposisiplayer;
        
        if(posisiplayer) {
            var sql = `INSERT INTO posisiplayer (nama) values ? `
           
            sqlDB.query(sql, [posisiplayer], (err, results) => {
                if(err) {
                    return res.status(500).send(err)
                }
                sql = `SELECT * from posisiplayer;`
                
                sqlDB.query(sql, (err, results) => {
                    if(err) return res.status(500).send(err)
    
                    res.status(200).send(results)
                })
            })
        }
        else {
            res.status(500).send('Tolong isi query insertposisiplayer')
        }
    },
    editPosisiPLayer: (req,res) => {
        var data = req.body;
        var sql = `UPDATE posisiplayer SET ? WHERE id = ${req.params.id}`
           
        sqlDB.query(sql, data, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            sql = `SELECT * from posisiplayer;`
            sqlDB.query(sql, (err,results1) => {
                if(err) return res.status(500).send(err)
    
                res.status(200).send(results1)
            })
        })
    },
    deletePosisiPlayer: (req,res) => {
        var sql = `DELETE FROM posisiplayer WHERE id = ${req.params.id}`
           
        sqlDB.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    }
}