import { supabase } from "../db";

const getTreatments = async() => {
    try{

        const result = supabase.from('treatments').select('*')
        return result;

    }catch(e){
        throw e;
    }
}

const getAppointmentByDate = async(appointmentDate:any)=> {
    try{

        const { data: appointments, error } = await supabase
        .from('appointments')
        .select('start_time, end_time')
        .eq('appointment_date', appointmentDate);

        if(error) throw error;
        return appointments;


    }catch(e){
        throw e;
    }
}

export {getTreatments, getAppointmentByDate};