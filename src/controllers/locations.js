
const _ = require('lodash');
const permissions = require('../permissions');

const locationController = {};

locationController.get = function (req, res) {
    const user = req.user;
    if (_.isUndefined(user)) {
        return res.redirect('/');
    }

    let content = {};
    content.title = 'Locations';
    content.nav = 'locations';

    content.data = {};
    content.data.user = req.user;
    content.data.common = req.viewdata;
    content.data.departments = {};

    return res.render('locations', content);
}

module.exports = locationController;
