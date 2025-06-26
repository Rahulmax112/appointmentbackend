import {
  getAppointmentByDate,
  getTreatments,
} from "../services/treatmentService";

const getAllTreatments = async (context: any) => {
  try {
    const treatments = await getTreatments();
    context.set.status = 200;
    return {
      success: true,
      data: treatments,
    };
  } catch (e: any) {
    return (
      (context.set.status = 500),
      {
        error: "Internal server error",
        message: e.message,
      }
    );
  }
};

const getAllTimeSlots = async (context: any) => {
  try {
    const { duration, date } = context.body;
    console.log(duration, date);

    if (!duration || !date) {
      context.set.status = 400;
      return { success: false, message: "date and duration are required" };
    }

    const slotDuration = parseInt(duration); // in minutes
    const startHour = 9; // Clinic opens at 9:00 AM
    const endHour = 19; // Closes at 7:00 PM

    const startMin = startHour * 60;
    const endMin = endHour * 60;

    // Convert "HH:MM" → minutes
    const timeToMinutes = (time: string): number => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };

    // Convert minutes → "HH:MM"
    const minutesToTime = (mins: number): string => {
      const h = String(Math.floor(mins / 60)).padStart(2, "0");
      const m = String(mins % 60).padStart(2, "0");
      return `${h}:${m}`;
    };

    // Convert 24-hour to 12-hour format
    const to12HourFormat = (time: string) => {
      const [h, m] = time.split(":").map(Number);
      const ampm = h >= 12 ? "PM" : "AM";
      const hour = h % 12 === 0 ? 12 : h % 12;
      return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
    };

    const appointments = await getAppointmentByDate(date);

    const isSlotBooked = (start: string, end: string): boolean => {
      const slotStart = timeToMinutes(start.split(".")[0]); // Remove milliseconds if present
      const slotEnd = timeToMinutes(end.split(".")[0]);

      return appointments.some((appt) => {
        const apptStart = timeToMinutes(appt.start_time.split(".")[0]);
        const apptEnd = timeToMinutes(appt.end_time.split(".")[0]);

        // Check for any overlap (partial or full)
        return slotStart < apptEnd && slotEnd > apptStart;
      });
    };

    const slots: any[] = [];

    for (
      let currentMin = startMin;
      currentMin + slotDuration <= endMin;
      currentMin += slotDuration
    ) {
      const startTime24 = minutesToTime(currentMin);
      const endTime24 = minutesToTime(currentMin + slotDuration);

      // Only push if not overlapping
      if (!isSlotBooked(startTime24, endTime24)) {
        const startTime12 = to12HourFormat(startTime24);
        const endTime12 = to12HourFormat(endTime24);

        slots.push({
          timeRange: `${startTime12} to ${endTime12}`,
          startTime: startTime12,
          endTime: endTime12,
          available: true,
        });
      }
    }

    context.set.status = 200;
    return { success: true, slots };
  } catch (e: any) {
    context.set.status = 500;
    return {
      success: false,
      error: "Internal server error",
      message: e.message,
    };
  }
};

export { getAllTreatments, getAllTimeSlots };
