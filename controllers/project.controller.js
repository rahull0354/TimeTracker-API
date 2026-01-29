import { Project } from "../models/project.model.js";

export const createProject = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name, description, clientName, hourlyRate } = req.body;

    if (!name || !description || !clientName || !hourlyRate) {
      return res.status(400).json({
        message: "Please Fill in all the fields",
        success: false,
      });
    }

    const newProject = new Project({
      name,
      description,
      clientName,
      hourlyRate,
      userId,
    });

    await newProject.save();

    return res.status(201).json({
      message: "Project Created Successfully!",
      success: true,
      newProject,
    });
  } catch (error) {
    console.error("Error At CreateProject: ", error);
    return res.status(500).json({
      message: "Error Creating Project",
      success: false,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { name, description, clientName, hourlyRate } = req.body;

    let updateProject = await Project.findOne({ _id: id, userId: userId });
    if (!updateProject) {
      return res.status(404).json({
        message: "Project not found !",
        success: false,
      });
    }

    // fields to update
    if (name) updateProject.name = name;
    if (description) updateProject.description = description;
    if (clientName) updateProject.clientName = clientName;
    if (hourlyRate) updateProject.hourlyRate = hourlyRate;

    await updateProject.save();

    updateProject = {
      _id: updateProject._id,
      name: updateProject.name,
      description: updateProject.description,
      clientName: updateProject.clientName,
      hourlyRate: updateProject.hourlyRate,
    };

    return res.status(200).json({
      message: "Project details updated !",
      success: true,
      updateProject,
    });
  } catch (error) {
    console.error("Error At UpdateProject: ", error);
    return res.status(500).json({
      message: "Error Updating Project",
      success: false,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    let deleteProject = await Project.findOne({ _id: id, userId: userId });
    if (!deleteProject) {
      return res.status(404).json({
        message: "Project Doesn't Exists !",
        success: false,
      });
    }

    await deleteProject.deleteOne({ _id: id, userId: userId });

    return res.status(200).json({
      message: "Project Details Deleted !",
      success: true,
    });
  } catch (error) {
    console.error("Error At DeleteProject: ", error);
    return res.status(500).json({
      message: "Error Deleting Project",
      success: false,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const { userId } = req.user;

    const projects = await Project.find({ userId: userId });

    return res.status(200).json({
      projects,
      success: true,
    });
  } catch (error) {
    console.error("Error At Fetching Projects: ", error);
    return res.status(500).json({
      message: "Error Fetching Projects",
      success: false,
    });
  }
};

export const changeStatusOfProject = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Please provide the required status",
        success: false,
      });
    }

    let projectCheck = await Project.findOne({ _id: id, userId: userId });
    if (!projectCheck) {
      return res.status(404).json({
        message: "Project Doesn't Exist",
        success: false,
      });
    }

    // saving the status
    projectCheck.status = status;
    await projectCheck.save();

    projectCheck = {
      status: projectCheck.status,
    };

    return res.status(200).json({
      message: "Status Updated !",
      projectCheck,
      success: true,
    });
  } catch (error) {
    console.error("Error At ChangeStatusOfProject: ", error);
    return res.status(500).json({
      message: "Error Changing status of Project",
      success: false,
    });
  }
};
