'use strict';

import {cats} from '../models/catModel.js';
import cat from '../models/catMongoModel.js';

const cat_list_get = async (req, res) => {
  if (req.query.gender !== undefined
      && req.query.weight !== undefined
  ) {

    const query = await cat.find({
      gender: req.query.gender,
      weight: {$gt: req.query.weight},
    });
    res.status(200).send(query);
  } else {
    const allCats = await cat.find({});
    res.status(200).json(allCats);
  }
};

const cat_get = async (req, res) => {
  const chosenCat = await cat.findById(req.params.id);
  res.send(chosenCat);
};

const cat_post = async (req, res) => {
  try {
    const importedCat = await cat.create({
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      color: req.body.color,
      filename: req.file.filename,
      weight: req.body.weight,
    });
    res.json({code: 200, inserted: importedCat});
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const cat_patch = async (req, res) => {
  try {
    const mod = await cat.updateOne({_id: req.params.id},
        {
          name: req.query.name,
          weight: req.query.weight,
          color: req.query.color,
        });

    res.send(mod);
  } catch (e) {
    res.send(e.message);
  }

};

export {
  cat_list_get,
  cat_get,
  cat_post,
  cat_patch,
};
