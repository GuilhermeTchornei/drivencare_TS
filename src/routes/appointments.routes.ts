import { Router } from "express";
import { authValidation } from "../middleware/auth.middleware.js";
import appointmentsControllers from "../controllers/appointments.controllers.js";

const appointmentsRouter = Router();

appointmentsRouter.post(
  "/doctors",
  authValidation,
  appointmentsControllers.doctorsList
);
appointmentsRouter.get(
  "/:doctorId",
  authValidation,
  appointmentsControllers.doctorsSchedule
);
appointmentsRouter.post(
  "/:doctorId",
  authValidation,
  appointmentsControllers.create
);
appointmentsRouter.put(
  "/:appointmentId",
  authValidation,
  appointmentsControllers.update
);
appointmentsRouter.delete(
  "/:appointmentId",
  authValidation,
  appointmentsControllers.deleteAppointment
);

export default appointmentsRouter;
