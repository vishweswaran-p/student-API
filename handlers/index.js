/** 
  * @file Handlers
  * @description This file has all the route handlers of this application
  * @author vishnu
  */

/** dependencies */
import express from 'express';
import studentRouter from 'routes/student';

let router = express.Router({caseSensitive: true});

/**
 * Student handlers
 */
router.get('/student', studentRouter.getStudents);
router.get('/student/:student_id/result', studentRouter.getStudent);
router.post('/upload', studentRouter.createStudents);

export default router;

