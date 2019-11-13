const { sqlDB } = require('../database');

module.exports = {

    getCartById : (req,res) => {

        var sql = `SELECT c.id as id,
                c.userId as userId,
                p.id as id_product,
                c.quantity as quantity,
                p.harga as price,
                p.discount as discount,
                p.imageProduct as imageProduct,
                p.nama as Productname
                from cart c
                JOIN product p
                ON p.id = c.productId
                WHERE userId = 8`;
                            // ${sqlDB.escape(req.body.id_user)}
         

        sqlDB.query(sql, (err,result)=>{
            if(err) return res.status(500).send({ message : 'Select Database Error', err })

            res.status(200).send(result)
            console.log(result)
        })
    },

    getCart : (req, res) => {

        var userId= req.query.userId || ''
        var productId= req.query.productId || ''

        var sql = `SELECT * from cart WHERE userId LIKE '%${userId}%' AND productId LIKE '%${productId}%'`

        
        sqlDB.query(sql,(err,result) => {
            if(err) return res.status(500).send({ message : 'Get Database by Query Error', err })

            res.status(200).send(result)
        })

    },

    getCartWithoutJoin : (req,res) => {
        var sql = `SELECT * FROM cart`

        sqlDB.query(sql,(err,result) => {
            if(err) return res.status(500).send({ message : 'Get Database Error', err })

            res.status(200).send(result)
        })

    },

    addcart : (req,res) => {
        var sql = `INSERT INTO cart SET ?`;

        console.log(req.body)
        sqlDB.query(sql, req.body, (err,result) => {
            if(err) return res.status(500).send({ message : 'Insert Database Error', err })

            res.status(200).send({ message: 'Insert Database berhasil', result})
        })
    },

    editCart :  (req,res) => {
        var sql = `UPDATE cart SET ? WHERE id = ${sqlDB.escape(req.params.id)}`;

        sqlDB.query(sql, req.body, (err,result) => {
            if(err) return res.status(500).send({ message : 'UPDATE Database Error', err })

            res.status(200).send(result)
        })
    },

    deleteCart: (req,res) => {
        var sql = `DELETE FROM cart WHERE id = ${req.params.id}`
           
        sqlDB.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
    
            res.status(200).send(results)
        })
    }

    // getDataCustomer : (req,res) => {
    
    //        var sql = `SELECT *  FROM data_customer WHERE id_user = ${sqlDB.escape(req.params.id)} `;
    
    //        sqlDB.query(sql, (err,result)=>{
    //            if(err) return res.status(500).send({ message : 'Select Database Error', err })
    
    //            res.status(200).send(result)
    //        })
    //    },

    // addDataCustomer : (req,res) => {

    //     var sql = `INSERT INTO data_customer SET ?`;

    //     sqlDB.query(sql, req.body, (err,result) => {
    //         if(err) return res.status(500).send({ message : 'INSERT into database error', err })

    //         res.status(200).send(result)
    //     })
    // },

    // totalPrice  : (req,res) => {

    //     var sql = `SELECT sum (harga * quantity) as totalPrice
    //                             FROM cart c
    //                             JOIN products p
    //                             ON p.id = c.id_product;`;
        
    //     sqlDB.query(sql, (err,result) => {
    //         if(err) return res.status(500).send({ message : 'Select totalprice from database error', err})

    //         res.status(200).send(result)
    //     })
    // }
}