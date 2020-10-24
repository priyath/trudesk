/*
 *       .                             .o8                     oooo
 *    .o8                             "888                     `888
 *  .o888oo oooo d8b oooo  oooo   .oooo888   .ooooo.   .oooo.o  888  oooo
 *    888   `888""8P `888  `888  d88' `888  d88' `88b d88(  "8  888 .8P'
 *    888    888      888   888  888   888  888ooo888 `"Y88b.   888888.
 *    888 .  888      888   888  888   888  888    .o o.  )88b  888 `88b.
 *    "888" d888b     `V88V"V8P' `Y8bod88P" `Y8bod8P' 8""888P' o888o o888o
 *  ========================================================================
 *  Author:     Chris Brame
 *  Updated:    1/20/19 4:43 PM
 *  Copyright (c) 2014-2019. All rights reserved.
 */

var _ = require('lodash')
var nodeMailer = require('nodemailer')

var settings = require('../models/setting')
const axios = require('axios');

var sms = {}

sms.sendSms = function ({group, subject, priority, tel}, callback) {

    const message = `TICKET ALERT\nNew issue reported by ${group}\n\nSubject: ${subject}\nPriority:${priority}`;
    const number = parseInt(tel, 10);

    if (isNaN(number)) {
        console.log('SMS failed. Not a number');
        return;
    }

    // eslint-disable-next-line no-unused-vars
    const payload = {
        user_name: "pgcodes",
        api_key: "7c07e32e1e9fee53bfc9",
        gateway_type: "1",
        country_code: "94",
        number,
        message,
    };

    axios.post('https://my.ipromo.lk/api/postsendsms', payload)
        .then((res) => {
            console.log(`Status: ${res.status}`);
            console.log('Body: ', res.data);
        }).catch((err) => {
        console.error(err);
    });
};

module.exports = sms;
