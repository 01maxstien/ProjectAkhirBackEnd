const { uploader } = require('../helpers/uploader')
const { sqlDB } = require('../database')
const fs = require('fs')

module.exports = {
    getFoto: (req,res) => {
        var sql =`SELECT * from galleryFoto`;
    
        sqlDB.query(sql, (err,results) => {
            console.log(results)
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    getFotoById: (req,res) => {
        var sql =`SELECT * FROM galleryFoto WHERE id=${req.params.id};`;
    
        sqlDB.query(sql, (err,results) => {
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    addFoto: (req,res) => {
        var newFoto = req.body;
        console.log(newFoto)
        if(newFoto) {
            var sql = `INSERT INTO galleryFoto SET ? `
           
            sqlDB.query(sql, newFoto, (err, results) => {
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
    deleteFoto: (req,res) => {
        var sql = `DELETE FROM galleryFoto WHERE id = ${sqlDB.escape(req.params.id)}`
           
        sqlDB.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    }
}
