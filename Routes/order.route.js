const router = require("express").Router();

router.get("/orders", (req, res) => {
    console.log(`params ${req.params?.order_id}`);
    res.status(200).send({
        success: true,
    });
});

module.exports = router;
