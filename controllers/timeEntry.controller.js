import { Project } from "../models/project.model.js";
import { TimeEntry } from "../models/timeEntry.model.js";

export const startTimeEntry = async (req, res) => {
  try {
    const { userId } = req.user;
    const { projectId } = req.params;
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({
        message: "Please provide description to the time entry",
        success: false,
      });
    }

    const projectCheck = await Project.findOne({
      _id: projectId,
      userId,
    });

    if (!projectCheck) {
      return res.status(404).json({
        message: "Project Not Found",
        success: false,
      });
    }

    let timeEntry = await TimeEntry.findOne({
      projectId: projectId,
      userId,
    }).sort({ createdAt: -1 });

    if (timeEntry) {
      // Check if there's a running session that needs to be saved
      if (timeEntry.status === "running") {
        const sessionEndTime = new Date();
        const sessionDuration = Math.floor((sessionEndTime - timeEntry.startTime) / 60000);

        // Save the previous session before starting a new one
        timeEntry.sessions.push({
          startTime: timeEntry.startTime,
          endTime: sessionEndTime,
          duration: sessionDuration,
        });
      }

      // Update existing entry - start new session
      timeEntry.startTime = new Date();
      timeEntry.endTime = null;
      timeEntry.description = description;
      timeEntry.status = "running";
      await timeEntry.save();
    } else {
      // Create new entry
      timeEntry = new TimeEntry({
        projectId: projectId,
        userId,
        description,
        startTime: new Date(),
        date: new Date(),
        status: "running",
      });
      await timeEntry.save();
    }

    return res.status(201).json({
      message: `Time Entry Started for ${projectCheck.name}`,
      success: true,
      timeEntry,
    });
  } catch (error) {
    console.error("Error At StartTimeEntry: ", error);
    return res.status(500).json({
      message: "Error Starting Time for The Project",
      success: false,
    });
  }
};

export const stopTimeEntry = async (req, res) => {
  try {
    const { userId } = req.user;
    const { timeEntryId } = req.params;

    const timeEntry = await TimeEntry.findOne({
      _id: timeEntryId,
      userId,
    });

    if (!timeEntry) {
      return res.status(404).json({
        message: "No Time Entries found for this project",
        success: false,
      });
    }

    //calculating the total time
    if(timeEntry.status === "running") {
        const sessionEndTime = new Date()
        const sessionDuration = Math.floor((sessionEndTime - timeEntry.startTime) / 60000)
        timeEntry.sessions.push({
            startTime: timeEntry.startTime,
            endTime: sessionEndTime,
            duration: sessionDuration
        })
    }

    // sum of all sessions present inside session array
    timeEntry.totalTime = timeEntry.sessions.reduce((sum, session) => sum + session.duration, 0)
    timeEntry.status = "stopped";
    await timeEntry.save();

    return res.status(200).json({
      message: `Timer Stopped ! Total Time: ${timeEntry.totalTime} minutes`,
      timeEntry,
      success: true,
    });
  } catch (error) {
    console.error("Error At StopTimeEntry: ", error);
    return res.status(500).json({
      message: "Error Stopping Time for The Project",
      success: false,
    });
  }
};

export const pauseTimer = async (req, res) => {
  try {
    const { userId } = req.user;
    const { timeEntryId } = req.params;

    const timeEntry = await TimeEntry.findOne({
      _id: timeEntryId,
      userId: userId,
    });

    if (timeEntry.status !== "running") {
      return res.status(400).json({
        message: "Timer is not running !",
        success: false,
      });
    }

    //calculate current session time
    const sessionEndTime = new Date();
    const sessionDuration = Math.floor(
      (sessionEndTime - timeEntry.startTime) / 60000,
    );

    // push this session to the sessions array
    timeEntry.sessions.push({
      startTime: timeEntry.startTime,
      endTime: sessionEndTime,
      duration: sessionDuration,
    });

    timeEntry.status = "paused";
    await timeEntry.save();

    return res.status(200).json({
      message: "Timer Paused !",
      timeEntry,
    });
  } catch (error) {
    console.error("Error At PauseTimer: ", error);
    return res.status(500).json({
      message: "Error Pausing Timer",
      success: false,
    });
  }
};

export const resumeTimer = async (req, res) => {
  try {
    const {userId} = req.user
    const {timeEntryId} = req.params

    const timeEntry = await TimeEntry.findOne({
        _id: timeEntryId,
        userId: userId
    })

    if(timeEntry.status !== "paused") {
        return res.status(400).json({
            message: "Timer is not paused",
            success: false
        })
    }

    //start new session
    timeEntry.startTime = new Date()
    timeEntry.status = "running"
    await timeEntry.save()

    return res.status(200).json({
        message: "Timer Resumed",
        timeEntry,
        succes: true
    })
  } catch (error) {
    console.error("Error At ResumeTimer: ", error);
    return res.status(500).json({
      message: "Error Resuming Time for The Project",
      success: false,
    });
  }
};
