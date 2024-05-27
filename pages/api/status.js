const axios = require("axios");
const crypto = require("crypto");

export default async function payment(req, res) {
  if (req.method === "POST") {
    const merchantTransactionId = res.req.body.merchantTransactionId;
    const merchantId = res.req.body.merchantId;

    try {
      const keyIndex = 1;
      const string =
        `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
      const sha256 = crypto.createHash("sha256").update(string).digest("hex");
      const checksum = sha256 + "###" + keyIndex;

      const options = {
        method: "GET",
        url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          "X-MERCHANT-ID": `${merchantId}`,
        },
      };

      // check payment status
      axios.request(options).then(async (response) => {
        if (response.data.success === true) {
          const url = `https://budaniyatechnologies.com/`;
          return res.redirect(url);
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  } else {
    res.status(500).json({ success: false, message: req.query });
  }
}
