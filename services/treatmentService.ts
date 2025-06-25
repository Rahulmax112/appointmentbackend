import { supabase } from "../db";

const getTreatments = async() => {
    try{

        const result = supabase.from('treatments').select('*')
        return result;

    }catch(e){
        throw e;
    }
}

export {getTreatments};