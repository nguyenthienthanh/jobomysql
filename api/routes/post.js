import express from 'express';
import * as postServices from 'services/post-service';
const router = express.Router({
  mergeParams: true
}); // eslint-disable-line

router.route('/')
  .get((req, res, next) => {
    postServices.get()
      .then(data => res.status(200).json(data))
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