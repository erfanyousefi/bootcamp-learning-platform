const {sendOtp, checkOtp} = require("./auth.service");

async function sendOtpHandler(req, res, next) {
  const {mobile} = req.body;
  const result = await sendOtp(mobile);
  res.json({
    error: null,
    data: result,
  });
}
async function checkOtpHandler(req, res, next) {
  const {mobile, code} = req.body;
  const result = await checkOtp(mobile, code);
  res.json({
    error: null,
    data: result,
  });
}
module.exports = {
  sendOtpHandler,
  checkOtpHandler,
};
