const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemZ3aGtqamt4d3NodXB3ZHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDM2NDcsImV4cCI6MjA1OTg3OTY0N30.vIMKaY6llWcXPFoKcW7jAnVRcdBOTBACktUN-Mw9Rew"
const projectURL = "https://tgzfwhkjjkxwshupwdse.supabase.co"

const supabase = window.supabase.createClient(projectURL, anonKey);
async function signUp(name, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }  
      }
    });
  
    if (error) {
      console.error('Signup error:', error.message);
      return null;
    }
  
    console.log('Signup successful:', data);
    return data;
  }