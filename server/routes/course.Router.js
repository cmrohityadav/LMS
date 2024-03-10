import express, { Router } from 'express'
import { addLectureToCourseById, createCourse, getAllCourses, getLecturesByCourseId, removeCourse, updateCourse } from '../controllers/course.controller.js';
import { authorizedRoles, isLogged } from '../middlewares/auth.middleware.js';
import upload from "../middlewares/multer.middleware.js";


const router=Router();

router.route("/")
.get(getAllCourses)
.post(isLogged,authorizedRoles("ADMIN"),upload.single("thumbnail"),createCourse)

router.route("/:id").
get(isLogged,getLecturesByCourseId)
.put(isLogged,authorizedRoles("ADMIN"),updateCourse)
.delete(isLogged,authorizedRoles("ADMIN"),removeCourse)
.post(isLogged,authorizedRoles("ADMIN"),upload.single("lecture"),addLectureToCourseById)

export default router;