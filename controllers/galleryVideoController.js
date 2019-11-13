const { uploader } = require('../helpers/uploader')
const { sqlDB } = require('../database')
const fs = require('fs')

module.exports = {
    getVideo: (req,res) => {
        var sql =`SELECT * from galleryVideo`;
    
        sqlDB.query(sql, (err,results) => {
            console.log(results)
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    getVideoById: (req,res) => {
        var sql =`SELECT * FROM galleryVideo WHERE id=${req.params.id};`;
    
        sqlDB.query(sql, (err,results) => {
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    addVideo: (req,res) => {
        var newVideo = req.body;
        console.log(newVideo)
        if(newVideo) {
            var sql = `INSERT INTO galleryVideo SET ? `
           
            sqlDB.query(sql, newVideo, (err, results) => {
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
    deleteVideo: (req,res) => {
        var sql = `DELETE FROM galleryVideo WHERE id = ${sqlDB.escape(req.params.id)}`
           
        sqlDB.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    }
}
