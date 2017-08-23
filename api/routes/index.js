import express from 'express';
const router = express.Router({mergeParams: true}); // eslint-disable-line

router.use('/', require('./post'));

module.exports = router;
