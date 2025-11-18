const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemZ3aGtqamt4d3NodXB3ZHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDM2NDcsImV4cCI6MjA1OTg3OTY0N30.vIMKaY6llWcXPFoKcW7jAnVRcdBOTBACktUN-Mw9Rew";
const projectURL = "https://tgzfwhkjjkxwshupwdse.supabase.co";

const supabase = window.supabase.createClient(projectURL, anonKey);


async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out user:', error.message)
  } else {
    console.log('User account deleted successfully')
  }
}

async function updateUserMetadata(user_metadata){
  const { data, error } = await supabase.auth.updateUser({
    user_metadata: { user_metadata}
  })
  return data;
}