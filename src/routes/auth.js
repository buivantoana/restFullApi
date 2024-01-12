import { Router } from "express";
import { signin, signup } from "../controller/auth";

let routerAuth = Router();
routerAuth.post("/signup", signup);
routerAuth.post("/signin", signin);

export default routerAuth;
