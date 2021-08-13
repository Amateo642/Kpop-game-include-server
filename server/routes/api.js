const Router = require('express').Router;
const girls = require('./controllers/girls');
const groups = require('./controllers/groups');

const router = Router();

router.get('/girls', girls.getGirls);
router.get('/girls/:id', girls.getGirl);
router.put('/girls', girls.updateVoices);

router.get('/groups', groups.getGroups);
router.get('/groups/:id', groups.getGroup);

module.exports = router;
