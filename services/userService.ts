import { supabase } from "../db";

const createUser = async (
  email: string,
  password: string,
  fullName: string,
  phone: string,
  role: string
) => {
  try {
    // Try to sign in to check if user exists
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInData?.user) {
      // 🛑 User exists and signed in successfully
      throw new Error("User already exists with this email. Try a different one.");
    }

    if (signInError && signInError.message !== "Invalid login credentials") {
      // Some other error, not just wrong password (e.g., network or auth issue)
      throw new Error("Error checking existing user: " + signInError.message);
    }

    // ✅ If sign-in failed with "Invalid credentials" → continue to create user
  } catch (err: any) {
    // Optional: handle network issues
    throw new Error(err.message || "Something went wrong checking user");
  }

  // ✅ Now create user
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    phone,
    email_confirm: true,
    user_metadata: {
      fullName,
      role,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};




const loginUser = async (emailOrPhone: string, password: string) => {
  let result;

  const isEmail = emailOrPhone.includes('@');

  if (isEmail) {
    result = await supabase.auth.signInWithPassword({
      email: emailOrPhone,
      password,
    });
  } else {
    // Server-side: fetch users via admin client
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) throw new Error("Error fetching users");

    const matchedUser = data.users.find(
      user => user.phone === emailOrPhone
    );


    if (!matchedUser) {
      throw new Error("Phone number not registered");
    }

    // Login with email
    result = await supabase.auth.signInWithPassword({
      email: matchedUser.email!,
      password,
    });
  }

  const { data, error } = result;

  if (error || !data.session || !data.user) {
    throw new Error(error?.message || 'Invalid login credentials');
  }

  return {
    user: data.user,
    session: data.session,
  };
};




export {createUser, loginUser}
