const { uploader } = require('../helpers/uploader')
const { sqlDB } = require('../database')
const fs = require('fs')

module.exports = {
    getPlayer: (req,res) => {        
        var sql =`SELECT p.*, pp.nama as posisiPemain FROM player p
                    JOIN posisiplayer pp
                    ON p.posisiId = pp.id`;
    
        sqlDB.query(sql, (err,results) => {
            console.log(results)
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    getPlayerById: (req,res) => {
        var sql =`SELECT * FROM player WHERE id=${req.params.id};`;
    
        sqlDB.query(sql, (err,results) => {
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    addPlayer: (req,res) => {
        var newPlayer = req.body;
        console.log(newPlayer)
        if(newPlayer) {
            var sql = `INSERT INTO player SET ? `
           
            sqlDB.query(sql, newPlayer, (err, results) => {
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
    deletePlayer: (req,res) => {
        var sql = `DELETE FROM player WHERE id = ${sqlDB.escape(req.params.id)}`
           
        sqlDB.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    editPlayer: (req,res) => {
        var sql = `UPDATE player SET ? WHERE id = ${req.params.id};`;
        sqlDB.query(sql, req.body, (err,results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    }
}