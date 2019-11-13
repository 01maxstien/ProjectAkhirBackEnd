const { uploader } = require('../helpers/uploader')
const { sqlDB } = require('../database')
const fs = require('fs')

module.exports = {
    getBerita: (req,res) => {    
        var sql = `SELECT * from berita`;
        sqlDB.query(sql, (err,results) => {
            console.log(results)
            if(err) {                                                                                           
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    getBeritaById: (req,res) => {
        var sql =`SELECT * FROM berita WHERE id=${req.params.id};`;
    
        sqlDB.query(sql, (err,results) => {
            console.log(req.params)
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    addBerita: (req,res) => {
        var newBerita= req.body;
        console.log(newBerita)
        if(newBerita) {
            var sql = `INSERT INTO berita SET ? `
           
            sqlDB.query(sql, newBerita, (err, results) => {
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
    deleteBerita: (req,res) => {
        var sql = `DELETE FROM berita WHERE id = ${sqlDB.escape(req.params.id)}`
           
        sqlDB.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    editBerita: (req,res) => {
        var sql = `UPDATE berita SET ? WHERE id = ${req.params.id};`;
        sqlDB.query(sql, req.body, (err,results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    }
}