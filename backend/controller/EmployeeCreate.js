const EmployeeModel = require("../model/EmployeeModel");

const createEmployee = async (req, res) => {
    try {
        const { name,email,phone,department,salary } = req.body;

        // Check if all required fields are provided
        if (!salary || !department || !phone || !email || !name) {
            return res.status(400).json({ message: "All fields (salary, department, phone, email, name) are required" });
        }

        // Proceed to create a new employee
        const emp = new EmployeeModel({ salary, department, phone, email, name });
        await emp.save();
        res.status(201).json({ message: "Employee created successfully" });
    } catch (err) {
        console.log('see full details', err);
        res.status(500).send({ message: "Internal server error" });
    }
};
const updateEmployee = async (req, res) => {
    try {
        const { name,email,phone,department,salary } = req.body;
        const {id}=req.params;

        let updateData={name,email,phone,department,salary}
        // Proceed to create a new employee
        const updateEmployee = await EmployeeModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
        if(!updateData){
            return res.status(404).json({message:"employee not found"})
        }
        
        res.status(200).json({
             message: "Employee updated successfully",
             success:true,
             data:updateEmployee
             });
    } catch (err) {
        console.log('see full details', err);
        res.status(500).send({ message: "Internal server error" });
    }
};

const getAllEmployee = async (req, res) => {
    try {
        let {page,limit,search}=req.query;

        page=parseInt(page) || 1;
        limit=parseInt(limit) || 5;

        const skip=(page-1)*limit;

        let searchcriteria={}
        if(search){
            searchcriteria={
                name:{
                    $regex:search,$options:'i'

                }
            }
        }
        const totalEmployees=await EmployeeModel.countDocuments(searchcriteria);

        const emps=await EmployeeModel.find(searchcriteria)
        .skip(skip)
        .limit(limit)
        .sort({updatedAt:-1})
        const totalPages=Math.ceil(totalEmployees/limit)
        res.status(200).
        json({
            message: "Employees get successfully",
            success:true,
            data:{
                employees:emps,
                pagination:{
                    totalEmployees:totalEmployees,
                    currentPage:page,
                    totalPages,
                    pageSize:limit

                }
            }
        })
    } catch (err) {
        console.log('see full details', err);
        res.status(500).send({ message: "Internal server error" });
    }
};


const getAllEmployeeById = async (req, res) => {
    try {
       const {id}=req.params;

        // Proceed to create a new employee
        const emp = await EmployeeModel.find({_id:id});
       
        res.status(201).json({
             message: "Got  Employee by id successfully",
             data:emp,
             success:true
             });
    } catch (err) {
        console.log('see full details', err);
        res.status(500).send({ message: "Internal server error" });
    }
};
const deleteAllEmployeeById = async (req, res) => {
    try {
       const {id}=req.params;

        // Proceed to create a new employee
        const emp = await EmployeeModel.deleteOne({_id:id});
       
        res.status(201).json({
             message: "delete Employee by id successfully",
             data:emp,
             success:true
             });
    } catch (err) {
        console.log('see full details', err);
        res.status(500).send({ message: "Internal server error" });
    }
};

module.exports = {
    createEmployee,
    getAllEmployee,
    getAllEmployeeById,
    deleteAllEmployeeById,
    updateEmployee
};
