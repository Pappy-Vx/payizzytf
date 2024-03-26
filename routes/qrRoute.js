const express = require('express');
const Router = express.Router();
const qrController = require ('../controller/qrController')


Router.get ('/qr/acct', qrController.getUserQRCode)

module.exports = Router