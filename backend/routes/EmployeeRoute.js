const { createEmployee, getAllEmployee, getAllEmployeeById, deleteAllEmployeeById, updateEmployee } = require('../controller/EmployeeCreate');



const router=require('express').Router()

router.get('/',getAllEmployee)
router.get('/:id',getAllEmployeeById)
router.delete('/:id',deleteAllEmployeeById)
router.put('/:id',updateEmployee)

router.post('/',createEmployee)


module.exports=router;