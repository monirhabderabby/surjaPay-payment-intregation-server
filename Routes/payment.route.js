const router = require("express").Router();
const axios = require("axios");

router.post("/payment", async (req, res) => {
    try {
        const { data } = await axios.post("https://sandbox.shurjopayment.com/api/get_token", {
            username: "sp_sandbox",
            password: "pyyk97hu&6u6",
        });

        const ipAddress = req.socket.remoteAddress;

        const formData = {
            ...req.body,
            token: data?.token,
            store_id: data?.store_id,
            currency: "BDT",
            prefix: "sp",
            order_id: "15fsdfsd",
            return_url: `http://localhost:3000/success`,
            cancel_url: "http://localhost:3000/failed",
            client_ip: ipAddress,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${data?.token}`,
                "Content-Type": "application/json",
            },
        };

        const response = await axios.post("https://sandbox.shurjopayment.com/api/secret-pay", formData, config);
        console.log(response.data);
        const { checkout_url } = response?.data || {};

        res.status(200).send({
            success: true,
            checkout_url: checkout_url,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing payment");
    }
});

module.exports = router;
