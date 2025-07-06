import Router from 'express' 
import { assignTask, createAdmin, createUser, deleteTask, getAdminTasks, getTaskForEdit, getUser, loginAdmin, updateTask } from '../controllers/admin.controllers.js'
import { verifyJWT } from '../middleware/VerifyJWT.js'
const router = Router()

router.route('/createAdmin').post(createAdmin)
router.route('/loginAdmin').post(loginAdmin)
router.route('/createUser').post(verifyJWT,createUser)
router.route('/assignTask').post(verifyJWT,assignTask)
router.route('/:taskId/deleteTask').delete(verifyJWT,deleteTask)
router.route('/:taskId/updateTask').patch(verifyJWT,updateTask)
router.route('/getTasks').get(verifyJWT,getAdminTasks)
router.route('/getusers').get(verifyJWT,getUser)
router.route('/:taskId/getParticularTask').get(getTaskForEdit)



export default router 


