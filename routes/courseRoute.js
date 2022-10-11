import express from 'express';
import { createCourse, getAllCourses, getCourse, enrollCourse, releaseCourse, deleteCourse, updateCourse } from '../controllers/courseController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

export const router = express.Router();

router.route('/').post(roleMiddleware(["teacher", "admin"]), createCourse);
router.route('/').get(getAllCourses);
router.route('/:slug').get(getCourse);
router.route('/:slug').delete(deleteCourse); 
router.route('/:slug').put(updateCourse);
router.route('/enroll').post(enrollCourse);
router.route('/release').post(releaseCourse);