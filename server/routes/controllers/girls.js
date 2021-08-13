const Girls = require('../../models/Girls');
const Groups = require('../../models/Groups');

const getGirls = async (req, res) => {
    try {
        let girls = await Girls.findAll();
        girls = await Promise.all(girls.map(async (girl) => {
            girl.urls = girl.urls.split(',');
            const group = await Groups.findOne({ where: { id: girl.groupId } });
            girl.dataValues.group = group.name; // TODO костыль какой-то
            return girl;
        }));
        return res.json(girls);
    }
    catch (err) {
        console.error(err);
        return res.json(err);
    }
}

const getGirl = async (req, res) => {
    const { id } = req.params;
    try {
        let girl = await Girls.findOne({ where: { id } });
        if (girl) {
            girl.urls = girl.urls.split(',');
            const group = await Groups.findOne({ where: { id: girl.groupId } });
            girl.dataValues.group = group.name; // TODO костыль какой-то
            return res.json(girl);
        }
        return res.json({});
    }
    catch (err) {
        console.error(err);
        return res.json(err);
    }
}

const updateVoices = async (req, res) => {
    const { id } = req.body;
    try {
        const girls = await Girls.findAll({ where: { id } });
        if (girls && girls[0]) {
            await Girls.update({ voices: girls[0].voices + 10 }, { where: { id } });
            return res.json(girls[0] || {});
        }
        return res.json({ error: 'unknown id' });
    }
    catch (err) {
        console.error(err);
        return res.json(err);
    }
}

module.exports = {
    getGirls,
    getGirl,
    updateVoices
}
