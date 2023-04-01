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
            return_url: `http://localhost:4000/payment/success`,
            cancel_url: "http://localhost:4000/payment/failed",
            client_ip: ipAddress,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${data?.token}`,
                "Content-Type": "application/json",
            },
        };

        const response = await axios.post("https://sandbox.shurjopayment.com/api/secret-pay", formData, config);
        const { checkout_url } = response?.data || {};

        res.status(200).send({
            success: true,
            checkout_url: checkout_url,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: error,
        });
    }
});

router.get("/payment/success", (req, res) => {
    const { order_id } = req.query;
    // Handle payment success
    // Here will goes code to save payment info to our DB

    // redirect to our success page
    res.redirect("https://surja-pay-payment-intregation-front-part.vercel.app/success");
});

router.get("/payment/failed", (req, res) => {
    const { order_id } = req.query;
    // Handle payment success
    // Here will goes code cancle the order

    // redirect to our success page
    res.redirect("https://surja-pay-payment-intregation-front-part.vercel.app/failed");
});

module.exports = router;
