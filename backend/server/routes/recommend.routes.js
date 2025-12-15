import { Router } from "express"
import jobEnqueuer from "../controller/jobs.controller.js"
import { requireAuth } from '@clerk/express'

const route = Router()

route.post("/recommend", requireAuth(), jobEnqueuer)

export { route }