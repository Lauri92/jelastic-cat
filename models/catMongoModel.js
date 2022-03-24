'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const catSchema = new Schema({
  name: {type: String, minlength: [2, 'Name has to be at least 2 characters']},
  dateOfBirth: {type: Date, max: [Date.now, 'Can\'t create cat from future']},
  gender: {type: String, enum: ['Male', 'Female']},
  color: {type: String},
  filename: {type: String},
  weight: {
    type: Number, min: [1, 'Too light!'],
    max: [19, 'Too heavy'],
  },
});

export default mongoose.model('Cat', catSchema);