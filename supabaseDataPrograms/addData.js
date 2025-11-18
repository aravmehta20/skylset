const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemZ3aGtqamt4d3NodXB3ZHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDM2NDcsImV4cCI6MjA1OTg3OTY0N30.vIMKaY6llWcXPFoKcW7jAnVRcdBOTBACktUN-Mw9Rew";
const projectURL = "https://tgzfwhkjjkxwshupwdse.supabase.co";

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(projectURL, anonKey);

const internships = [
  {
    "NAME": "Houston Methodist High School Emerging Researcher Experience",
    "TYPE": "internship",
    "PRICE": 0,
    "DEADLINE": "2025-01-31",
    "SKYLSCORE": 8,
    "HYPERLINK": "https://www.houstonmethodist.org/2623_education/research-education/summerinternshipprogram/highschoolresearchinternship/",
    "AREA_OF_INTEREST": ["Health Science/Medicine", "Biology/Chemistry"],
    "ELIGIBILITY": null,
    "LOCATION": "Houston, TX",
    "MIN_AGE": 16,
    "MAX_AGE": null,
    "GRADE": [11, 12]
  },
  {
    "NAME": "Carl B. & Florence E. King Foundation High School Summer Program in Biomedical Sciences",
    "TYPE": "research",
    "PRICE": 0,
    "DEADLINE": "2026-01-14",
    "SKYLSCORE": 9,
    "HYPERLINK": "https://blog.collegevine.com/high-school-internships-houston#:~:text=Carl%20B.%20%26%20Florence%20E.%20King%20Foundation%20High%20School%20Summer%20Program%20in%20Biomedical%20Sciences",
    "AREA_OF_INTEREST": ["Health Science/Medicine", "Biology/Chemistry"],
    "ELIGIBILITY": null,
    "LOCATION": "Houston, TX",
    "MIN_AGE": 18,
    "MAX_AGE": null,
    "GRADE": [12]
  }
];



(async () => {
  for (const internship of internships) {
    const { error } = await supabase.from('Biomedical Opportunities').insert([internship]);
    if (error) {
      console.error(error);
    } else {
      console.log('Inserted', internship.NAME);
    }
  }
})();
