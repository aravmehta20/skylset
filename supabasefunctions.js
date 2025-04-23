const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemZ3aGtqamt4d3NodXB3ZHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDM2NDcsImV4cCI6MjA1OTg3OTY0N30.vIMKaY6llWcXPFoKcW7jAnVRcdBOTBACktUN-Mw9Rew"
const projectURL = "https://tgzfwhkjjkxwshupwdse.supabase.co"

const supabase = createClient(projectURL, anonKey);


function editUserData(
const { data, error } = await supabase
  .from('Opportunities')
  .select('*');
//fetch method
const { data, error } = await supabase
  .from('characters')
  .select()
//insert method
const { error } = await supabase
  .from('countries')
  .insert({ id: 1, name: 'Mordor' })
await supabase.
