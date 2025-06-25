import { getTreatments } from "../services/treatmentService";

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

export { getAllTreatments };
