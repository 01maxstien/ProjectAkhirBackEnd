const { uploader } = require('../helpers/uploader')
const { sqlDB } = require('../database')
const fs = require('fs')

module.exports = {
    getProduct: (req,res) => {
        var nama = req.query.nama || '';
        var deskripsi = req.query.deskripsi || '';
        
        var sql =`SELECT p.*, c.nama as namaCategory FROM product p
                  JOIN category c
                    ON p.categoryId = c.id
                    WHERE p.nama LIKE '%${nama}%' 
                    AND deskripsi LIKE '%${deskripsi}%'`;
    
        sqlDB.query(sql, (err,results) => {
            console.log(results)
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    getProductById: (req,res) => {
        var sql =`SELECT * FROM product WHERE id=${req.params.id};`;
    
        sqlDB.query(sql, (err,results) => {
            if(err) {
                // console.log(err)
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    addProduct: (req,res) => {
        var newProduct = req.body;
        console.log(newProduct)
        if(newProduct) {
            var sql = `INSERT INTO product SET ? `
           
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
    deleteProduct: (req,res) => {
        var sql = `DELETE FROM product WHERE id = ${sqlDB.escape(req.params.id)}`
           
        sqlDB.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    editProduct: (req,res) => {
        var sql = `UPDATE product SET ? WHERE id = ${req.params.id};`;
        sqlDB.query(sql, req.body, (err,results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    },
    addImageProduct: (req,res) => {
        const path = '/images/product';
        const upload = uploader(path, 'Product').fields([{ name: 'image' }]);
    
        upload(req, res, (err) => {
            if(err){
                return res.status(500).json({ message: 'Upload file failed !', error: err.message });
            }
    
            const { image } = req.files;
            console.log(image)
    
            console.log(req.body.data)
            const data = JSON.parse(req.body.data);
            console.log(data)
            var insertData = []
            for(var i = 0; i < image.length; i++) {
                insertData.push([`${path}/${image[i].filename}`, data.productId])
            }
    
            var sql = `INSERT INTO imageproduct (pathName,productId) VALUES ? `;
            sqlDB.query(sql,[insertData], (err,results) => {
                if(err) {
                    for(var i = 0; i < image.length; i++) {
                        fs.unlinkSync('./public' + path + '/' + image[i].filename)
                    }
                    return res.status(500).send(err)
                }
    
                res.status(200).send(results)
            })
        })
    },
    getImageProductByCategoryId: (req,res) => {
        var sql = `SELECT ip.*, p.nama as NamaProduct from imageproduct ip
                JOIN product p
                ON p.id = ip.productId
                WHERE productId = ${sqlDB.escape(req.params.id)}`;
        console.log(sql)
        sqlDB.query(sql, (err, results) => {
            if(err) return res.status(500).send(err)
    
            res.status(200).send(results)
        })
    },
    editImageProductById: (req,res) => {
        var sql = `SELECT * FROM imageproduct WHERE id = ${sqlDB.escape(req.params.id)}`;
        sqlDB.query(sql, (err, results) => {
            if (err) return res.status(500).send(err)
    
            if(results.length > 0) {
                const path = '/images/product';
                const upload = uploader(path, 'Product').fields([{ name: 'image' }]);
    
                upload(req, res, (err) => {
                    if(err){
                        return res.status(500).json({ message: 'Upload file failed !', error: err.message });
                    }
            
                    const { image } = req.files;
                    console.log(image)
            
    
                    const data = { pathName: path + '/' + image[0].filename }
            
                    sql = `UPDATE imageproduct SET ? WHERE id = ${req.params.id};`
                    sqlDB.query(sql,data, (err,results1) => {
                        if(err) {
                            fs.unlinkSync('./public' + path + '/' + image[0].filename)
                            return res.status(500).send(err)
                        }
    
                        fs.unlinkSync('./public' + results[0].pathName)
                        res.status(200).send(results1)
                    })
                })
            }
        })
    },
    deleteImageProductById: (req,res) => {
        var sql = `SELECT * FROM imageproduct WHERE id = ${sqlDB.escape(req.params.id)}`;
    
        sqlDB.query(sql, (err,results) => {
            if(err) return res.status(500).send(err)
    
            sql = `DELETE FROM imageproduct WHERE id = ${sqlDB.escape(req.params.id)}`;
            sqlDB.query(sql,(err, results1) => {
                if(err) return res.status(500).send(err)
    
                fs.unlinkSync('./public' + results[0].pathName)
                
                res.status(200).send(results1)
            })
        })
    }
}