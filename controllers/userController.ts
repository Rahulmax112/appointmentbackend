import { createUser, loginUser } from '../services/userService';
import { setAuthCookies } from '../utils/setAuthCookies';

const Register = async (context: any) => {
  try {
    const { email, password, fullName, phone, role } = context.body;

  
    const data = await createUser(email, password, fullName, phone, role);
    
    return {
      success: true,
      user: data.user,
    };
  } catch (e: any) {
    context.set.status = 500;
    return {
      error: "Internal server error",
      message: e.message,
    };
  }
};

const Login = async(context:any) => {
    try {
    const { emailOrPhone, password } = context.body;
    

    const { user, session } = await loginUser(emailOrPhone, password);

   setAuthCookies(context.cookie, session, user); 

    return {
      success: true,
      message: "Login successful",
    };
  } catch (e: any) {
    context.set.status = 500;
    return {
      success: false,
      message: e.message,
    };
  }
}

export {Register, Login};
