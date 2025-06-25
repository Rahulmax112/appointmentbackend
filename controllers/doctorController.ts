import { getDoctors } from "../services/doctorService";

const getAllDoctors = async(context:any) => {
    try{

    const doctors = await getDoctors();
    context.set.status = 200;
    return {
      success: true,
      data: doctors,
    };

    }catch(e:any){
        return (
            (context.set.text=500),{
                error:'Interal Server Error',
                message:e.message
            }

        )
    }
}

export {getAllDoctors};