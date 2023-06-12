import express from "express";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { UserRoutes } from "../modules/user/user.route";

const apiRoutes = express.Router();

const routes = [
    {
        path: "/users",
        route: UserRoutes,
    },
    {
        path: "/semesters",
        route: AcademicSemesterRoutes,
    },
];

routes.forEach(route => apiRoutes.use(route.path, route.route));

export default apiRoutes;
