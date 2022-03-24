'use strict';

import {Router} from 'express';
import {
  cat_list_get,
  cat_get,
  cat_post,
  cat_patch,
} from '../controllers/catController.js';
import multer from 'multer';
import cat from '../models/catMongoModel.js';

const router = Router();
/*
router.route('/').
    get(cat_list_get).
    post(multer({
      dest: './uploads',
    }).single('cat'), cat_post).
    put((req, res) => {
      res.send('Cat put test');
    }).
    delete((req, res) => {
      res.send('Cat delete test');
    });
*/

router.route('/').
    get(cat_list_get).
    post(multer({
      dest: './uploads',
    }).single('file'), cat_post);

router.route('/:id').
    get(cat_get).
    patch(cat_patch)
;

export default router;
