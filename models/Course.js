import mongoose from 'mongoose';
import slugify from 'slugify';

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: { type: String, unique: true, require: true },
  description: { type: String, require: true },
  createdDate: { type: Date, default: Date.now },
  slug: { type: String, unique: true },
  category: {type: mongoose.Schema.Types.ObjectId, ref:'Category'},
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});

CourseSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});


export const Course = mongoose.model('Course', CourseSchema);
