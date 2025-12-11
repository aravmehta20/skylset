const fs = require("fs")

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemZ3aGtqamt4d3NodXB3ZHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDM2NDcsImV4cCI6MjA1OTg3OTY0N30.vIMKaY6llWcXPFoKcW7jAnVRcdBOTBACktUN-Mw9Rew";
const projectURL = "https://tgzfwhkjjkxwshupwdse.supabase.co";

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(projectURL, anonKey);
const raw = fs.readFileSync("completed_listings.json", "utf8");
const internships = JSON.parse(raw); // <-- JS array



(async () => {
  for (const internship of internships) {
    const { error } = await supabase.from('Biomedical_Opportunities').insert([internship]);
    if (error) {
      console.error(error);
    } else {
      console.log('Inserted', internship.NAME);
    }
  }
})();
