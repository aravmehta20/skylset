const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemZ3aGtqamt4d3NodXB3ZHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDM2NDcsImV4cCI6MjA1OTg3OTY0N30.vIMKaY6llWcXPFoKcW7jAnVRcdBOTBACktUN-Mw9Rew"
const projectURL = "https://tgzfwhkjjkxwshupwdse.supabase.co"

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(projectURL,anonKey);
const internships = [
  {
    "NAME": "Smithsonian High School Internship Program",
    "TYPE": "internship",
    "PRICE": 0,
    "DEADLINE": "2025-03-15",
    "SKYLSCORE": 8,
    "HYPERLINK": "https://www.smithsonianofi.com/internship-opportunities/",
    "AREA_OF_INTEREST": ["Art/Design", "History", "Environmental Science"],
    "ELIGIBILITY": null,
    "LOCATION": "Washington, DC",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  },
  {
    "NAME": "Google Computer Science Summer Institute",
    "TYPE": "internship",
    "PRICE": 0,
    "DEADLINE": "2025-04-01",
    "SKYLSCORE": 9,
    "HYPERLINK": "https://buildyourfuture.withgoogle.com/programs/computer-science-summer-institute/",
    "AREA_OF_INTEREST": ["Computer Science", "Mathematics"],
    "ELIGIBILITY": null,
    "LOCATION": "Virtual",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  },
  {
    "NAME": "JPMorgan Chase High School Internship Program",
    "TYPE": "internship",
    "PRICE": 0,
    "DEADLINE": "2025-05-01",
    "SKYLSCORE": 8,
    "HYPERLINK": "https://careers.jpmorgan.com/us/en/students/programs/high-school-internship",
    "AREA_OF_INTEREST": ["Business", "Economics"],
    "ELIGIBILITY": null,
    "LOCATION": "Various U.S. Locations",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  },
  {
    "NAME": "MITRE High School Internship Program",
    "TYPE": "internship",
    "PRICE": 0,
    "DEADLINE": "2025-03-31",
    "SKYLSCORE": 8,
    "HYPERLINK": "https://www.mitre.org/careers/internships/high-school-internships",
    "AREA_OF_INTEREST": ["Engineering", "Computer Science"],
    "ELIGIBILITY": null,
    "LOCATION": "Virtual",
    "MIN_AGE": 15,
    "MAX_AGE": 18,
    "GRADE": [10, 11, 12]
  },
  {
    "NAME": "The New York Times High School Internship",
    "TYPE": "internship",
    "PRICE": 0,
    "DEADLINE": "2025-02-15",
    "SKYLSCORE": 9,
    "HYPERLINK": "https://www.nytco.com/careers/high-school-internship/",
    "AREA_OF_INTEREST": ["Writing/Journalism", "Art/Design"],
    "ELIGIBILITY": null,
    "LOCATION": "New York, NY",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  },
  {
    "NAME": "National Institutes of Health (NIH) High School Internship Program",
    "TYPE": "internship",
    "PRICE": 0,
    "DEADLINE": "2025-01-31",
    "SKYLSCORE": 9,
    "HYPERLINK": "https://www.training.nih.gov/programs/hsip",
    "AREA_OF_INTEREST": ["Health Science/Medicine", "Biology/Chemistry"],
    "ELIGIBILITY": null,
    "LOCATION": "Bethesda, MD",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  },
  {
    "NAME": "Microsoft High School Internship Program",
    "TYPE": "internship",
    "PRICE": 0,
    "DEADLINE": "2025-04-10",
    "SKYLSCORE": 8,
    "HYPERLINK": "https://careers.microsoft.com/us/en/high-school-internships",
    "AREA_OF_INTEREST": ["Computer Science", "Engineering"],
    "ELIGIBILITY": null,
    "LOCATION": "Virtual and Redmond, WA",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  },
  {
    "NAME": "Intel High School Internship Program",
    "TYPE": "internship",
    "PRICE": 0,
    "DEADLINE": "2025-03-20",
    "SKYLSCORE": 8,
    "HYPERLINK": "https://www.intel.com/content/www/us/en/jobs/high-school-internships.html",
    "AREA_OF_INTEREST": ["Engineering", "Computer Science", "Mathematics"],
    "ELIGIBILITY": null,
    "LOCATION": "Various U.S. Locations",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  },
  {
    "NAME": "City of New York High School Internship Program",
    "TYPE": "internship",
    "PRICE": 0,
    "DEADLINE": "2025-05-15",
    "SKYLSCORE": 7,
    "HYPERLINK": "https://www.nyc.gov/site/dycd/services/youth-internships.page",
    "AREA_OF_INTEREST": ["Business", "Law/Politics", "Environmental Science"],
    "ELIGIBILITY": null,
    "LOCATION": "New York, NY",
    "MIN_AGE": 15,
    "MAX_AGE": 18,
    "GRADE": [10, 11, 12]
  },
  {
    "NAME": "Environmental Protection Agency (EPA) Student Internship Program",
    "TYPE": "internship",
    "PRICE": 0,
    "DEADLINE": "2025-04-01",
    "SKYLSCORE": 8,
    "HYPERLINK": "https://www.epa.gov/careers/student-internships",
    "AREA_OF_INTEREST": ["Environmental Science", "Biology/Chemistry"],
    "ELIGIBILITY": null,
    "LOCATION": "Various U.S. Locations",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  }
];

const scholarships = [
  {
    "NAME": "Jack Kent Cooke Foundation College Scholarship",
    "TYPE": "scholarship",
    "PRICE": 40000,
    "DEADLINE": "2025-11-15",
    "SKYLSCORE": 9,
    "HYPERLINK": "https://www.jkcf.org/our-scholarships/college-scholarship-program/",
    "AREA_OF_INTEREST": ["Education"],
    "ELIGIBILITY": null,
    "LOCATION": "Virtual",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  },
  {
    "NAME": "Coca-Cola Scholars Program Scholarship",
    "TYPE": "scholarship",
    "PRICE": 20000,
    "DEADLINE": "2025-10-31",
    "SKYLSCORE": 10,
    "HYPERLINK": "https://www.coca-colascholarsfoundation.org/apply/",
    "AREA_OF_INTEREST": ["Education"],
    "ELIGIBILITY": null,
    "LOCATION": "Virtual",
    "MIN_AGE": 17,
    "MAX_AGE": 18,
    "GRADE": [12]
  },
  {
    "NAME": "Dell Scholars Program",
    "TYPE": "scholarship",
    "PRICE": 20000,
    "DEADLINE": "2025-12-01",
    "SKYLSCORE": 8,
    "HYPERLINK": "https://www.dellscholars.org/scholarship/",
    "AREA_OF_INTEREST": ["Education"],
    "ELIGIBILITY": null,
    "LOCATION": "Virtual",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  },
  {
    "NAME": "AXA Achievement Scholarship",
    "TYPE": "scholarship",
    "PRICE": 25000,
    "DEADLINE": "2025-12-15",
    "SKYLSCORE": 8,
    "HYPERLINK": "https://us.axa.com/axa-foundation/AXA-achievement-scholarship.html",
    "AREA_OF_INTEREST": ["Education"],
    "ELIGIBILITY": null,
    "LOCATION": "Virtual",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  },
  {
    "NAME": "Ronald McDonald House Charities Scholarship",
    "TYPE": "scholarship",
    "PRICE": 2500,
    "DEADLINE": "2025-11-30",
    "SKYLSCORE": 7,
    "HYPERLINK": "https://www.rmhc.org/rmhc-us-scholarships",
    "AREA_OF_INTEREST": ["Education"],
    "ELIGIBILITY": null,
    "LOCATION": "Virtual",
    "MIN_AGE": 15,
    "MAX_AGE": 18,
    "GRADE": [10, 11, 12]
  },
  {
    "NAME": "Prudential Spirit of Community Awards",
    "TYPE": "scholarship",
    "PRICE": 5000,
    "DEADLINE": "2025-11-05",
    "SKYLSCORE": 7,
    "HYPERLINK": "https://spirit.prudential.com/",
    "AREA_OF_INTEREST": ["Education", "Law/Politics"],
    "ELIGIBILITY": null,
    "LOCATION": "Virtual",
    "MIN_AGE": 14,
    "MAX_AGE": 18,
    "GRADE": [9, 10, 11, 12]
  },
  {
    "NAME": "GE-Reagan Foundation Scholarship Program",
    "TYPE": "scholarship",
    "PRICE": 10000,
    "DEADLINE": "2025-12-06",
    "SKYLSCORE": 9,
    "HYPERLINK": "https://www.reaganfoundation.org/education/scholarship-programs/ge-reagan-foundation-scholarship-program/",
    "AREA_OF_INTEREST": ["Education", "Law/Politics"],
    "ELIGIBILITY": null,
    "LOCATION": "Virtual",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  },
  {
    "NAME": "Burger King Scholars Program",
    "TYPE": "scholarship",
    "PRICE": 5000,
    "DEADLINE": "2025-12-15",
    "SKYLSCORE": 8,
    "HYPERLINK": "https://bk-scholars.com/",
    "AREA_OF_INTEREST": ["Education"],
    "ELIGIBILITY": null,
    "LOCATION": "Virtual",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  },
  {
    "NAME": "Dell Technologies Scholars Program",
    "TYPE": "scholarship",
    "PRICE": 20000,
    "DEADLINE": "2025-12-01",
    "SKYLSCORE": 8,
    "HYPERLINK": "https://www.dellscholars.org/",
    "AREA_OF_INTEREST": ["Education", "Computer Science"],
    "ELIGIBILITY": null,
    "LOCATION": "Virtual",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  },
  {
    "NAME": "Elks National Foundation Most Valuable Student Scholarship",
    "TYPE": "scholarship",
    "PRICE": 40000,
    "DEADLINE": "2025-11-15",
    "SKYLSCORE": 9,
    "HYPERLINK": "https://www.elks.org/scholars/scholarships/mvs.cfm",
    "AREA_OF_INTEREST": ["Education"],
    "ELIGIBILITY": null,
    "LOCATION": "Virtual",
    "MIN_AGE": 16,
    "MAX_AGE": 18,
    "GRADE": [11, 12]
  }
];


(async () => {
  for (const internship of internships) {
    const { error } = await supabase.from('Opportunities').insert([internship]);
    if (error) {
      console.error(error);
    } else {
      console.log('Inserted', internship.NAME);
    }
  }
})();
