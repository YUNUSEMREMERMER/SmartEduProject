import nodemailer from 'nodemailer';
import {Course} from  '../models/Course.js'
import {User} from '../models/User.js'

export const getIndexPage = async (req, res) => {
  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.find().countDocuments({role:'student'})
  const totalTeachers = await User.find().countDocuments({role:'teacher'})

  res.status(200).render('index', {
    page_name: 'index',
    courses,
    totalCourses,
    totalStudents,
    totalTeachers

  });
};
export const getAboutPage = (req, res) => {
  res.render('about', {
    page_name: 'about',
  });
};

export const getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

export const getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

export const getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

export const sendEmail = (req, res) => {
  console.log(req.body);
  req.flash("success", "we received your message succesfully")
  res.redirect('/contact');
};
