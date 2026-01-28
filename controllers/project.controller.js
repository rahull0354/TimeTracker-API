import { Project } from "../models/project.model.js"
import { User } from "../models/user.model.js"

export const createProject = async (req, res) => {
    try {
        const {userId} = req.user
        const {name, description, clientName, hourlyRate} = req.body

        if(!name || !description || !clientName || !hourlyRate) {
            return res.status(400).json({
                message: "Please Fill in all the fields",
                success: false
            })
        }

        const newProject = new Project({
            name,
            description,
            clientName,
            hourlyRate,
            userId
        })

        await newProject.save()

        return res.status(201).json({
            message: "Project Created Successfully!",
            success: true,
            newProject
        })
    } catch (error) {
        console.error("Error At CreateProject: ", error);
        return res.status(500).json({
            message: "Error Creating Project",
            success: false
        }
        )
    }
}