import { supabase } from "../db";

const getDoctors = async() => {
    try{

        const result = supabase.from('doctors').select('*')
        return result;

    }catch(e){
        throw e;
    }
}

export {getDoctors};