import express, { Router } from 'express'
import { getAllCourses, getLecturesByCourseId } from '../controllers/course.controller.js';
import { isLogged } from '../middlewares/auth.middleware.js';

const router=Router();

router.route("/").get(getAllCourses)
router.route("/:id").get(isLogged,getLecturesByCourseId)

export default router;