const Groups = require('../../models/Groups');

const getGroups = async (req, res) => {
    try {
        const groups = await Groups.findAll();
        return res.json(groups.map(group => {
            group.urls = group.urls.split(',');
            return group;
        }));
    }
    catch (err) {
        console.error(err);
        return res.json(err);
    }
}

const getGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const groups = await Groups.findAll({ where: { id } });
        if (groups && groups[0]) {
            groups[0].urls = groups[0].urls.split(',');
            return res.json(groups[0]);
        }
        return res.json({});
    }
    catch (err) {
        console.error(err);
        return res.json(err);
    }
}

module.exports = {
    getGroups,
    getGroup
}
