import express from 'express';
import * as postServices from 'services/post-service';
const router = express.Router({
  mergeParams: true
}); // eslint-disable-line

router.route('/')
  .get((req, res, next) => {
    const postName = req.query['post_name'];
    const after = req.query['after'];
    // console.log(postName);
    let promise = null;
    if (postName) {
      promise = postServices.getByName(postName);
    } else if (after) {
      promise = postServices.getByAfter(new Date(after).toISOString());
    } else promise = postServices.get();
    promise.then(data => {
      console.log(data.length);
      res.status(200).json(data);
    })
      .catch(err => res.status(500).json(err));
  });

router.route('/:post_name')
  .get((req, res, next) => {
    const postName = req.params['post_name'];
    postServices.getByName(postName)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  });

module.exports = router;