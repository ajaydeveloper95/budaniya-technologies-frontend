const axios = require("axios");
const crypto = require("crypto");

export default async function payment(req, res) {
  if (req.method === "POST") {
    // phonepe payment gatway
    let salt_key = "3246fbfd-d226-4739-9e65-d9d7d4aa8382";
    let marchant_id = "M22GCK7NGXG0G";
    let merchantTransactionId = "T" + Date.now();
    let MUID = "MID" + Date.now();

    try {
      // phonepe api data config
      const data = {
        merchantId: marchant_id,
        merchantTransactionId: merchantTransactionId,
        merchantUserId: MUID,
        name: req.body.name,
        amount: req.body.amount * 100,
        redirectUrl: `https://budaniyatechnologies.com/status?id=${merchantTransactionId}`,
        redirectMode: "POST",
        mobileNumber: req.body.phone,
        paymentInstrument: {
          type: "PAY_PAGE",
        },
      };
      // use ful
      const payload = JSON.stringify(data);
      const payloadMain = Buffer.from(payload).toString("base64");
      const keyIndex = 1;
      const string = payloadMain + "/pg/v1/pay" + salt_key;
      const sha256 = crypto.createHash("sha256").update(string).digest("hex");
      const checksum = sha256 + "###" + keyIndex;

      // prod URL
      const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

      // api request data
      const options = {
        method: "POST",
        url: prod_URL,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
        data: {
          request: payloadMain,
        },
      };

      // axios api call start
      axios
        .request(options)
        .then(function (response) {
          return res.redirect(
            307,
            response.data.data.instrumentResponse.redirectInfo.url
          );
        })
        .catch(function (error) {
          console.error(error);
        });
      // axios api call end
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  } else {
    res.status(500).json({ success: false, data: "some issue on server" });
  }
}
