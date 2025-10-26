const mongoose = require('mongoose');
const dotenv = require('dotenv');
const University = require('../models/University');

dotenv.config();

const universities = [
  {
    name: "Harvard Business School",
    location: { city: "Boston", state: "MA", country: "USA" },
    ranking: 1,
    programType: "MBA",
    requirements: {
      minGMAT: 690, avgGMAT: 730, maxGMAT: 790,
      minGPA: 3.5, avgGPA: 3.71,
      minWorkExp: 3, avgWorkExp: 4.7
    },
    stats: {
      acceptanceRate: 11.5,
      avgSalary: 165000,
      totalStudents: 1873,
      internationalStudents: 35
    },
    tuition: { outState: 73440, international: 73440 },
    website: "https://www.hbs.edu",
    description: "Top-ranked MBA program with unparalleled global network"
  },
  {
    name: "Stanford Graduate School of Business",
    location: { city: "Stanford", state: "CA", country: "USA" },
    ranking: 2,
    programType: "MBA",
    requirements: {
      minGMAT: 680, avgGMAT: 738, maxGMAT: 790,
      minGPA: 3.4, avgGPA: 3.75,
      minWorkExp: 3, avgWorkExp: 4.5
    },
    stats: {
      acceptanceRate: 6.9,
      avgSalary: 168000,
      totalStudents: 855,
      internationalStudents: 42
    },
    tuition: { outState: 74706, international: 74706 },
    website: "https://www.gsb.stanford.edu",
    description: "Silicon Valley's premier business school"
  },
  {
    name: "Wharton School - University of Pennsylvania",
    location: { city: "Philadelphia", state: "PA", country: "USA" },
    ranking: 3,
    programType: "MBA",
    requirements: {
      minGMAT: 680, avgGMAT: 733, maxGMAT: 780,
      minGPA: 3.3, avgGPA: 3.6,
      minWorkExp: 3, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 20.7,
      avgSalary: 155000,
      totalStudents: 1726,
      internationalStudents: 33
    },
    tuition: { outState: 74500, international: 74500 },
    website: "https://www.wharton.upenn.edu",
    description: "Prestigious finance and leadership program"
  },
  {
    name: "MIT Sloan School of Management",
    location: { city: "Cambridge", state: "MA", country: "USA" },
    ranking: 4,
    programType: "MBA",
    requirements: {
      minGMAT: 680, avgGMAT: 728, maxGMAT: 780,
      minGPA: 3.4, avgGPA: 3.66,
      minWorkExp: 2, avgWorkExp: 4.7
    },
    stats: {
      acceptanceRate: 14.6,
      avgSalary: 152000,
      totalStudents: 813,
      internationalStudents: 38
    },
    tuition: { outState: 77168, international: 77168 },
    website: "https://mitsloan.mit.edu",
    description: "Innovation and technology-focused MBA"
  },
  {
    name: "Columbia Business School",
    location: { city: "New York", state: "NY", country: "USA" },
    ranking: 5,
    programType: "MBA",
    requirements: {
      minGMAT: 670, avgGMAT: 729, maxGMAT: 780,
      minGPA: 3.3, avgGPA: 3.6,
      minWorkExp: 3, avgWorkExp: 5.1
    },
    stats: {
      acceptanceRate: 16.4,
      avgSalary: 150000,
      totalStudents: 1622,
      internationalStudents: 45
    },
    tuition: { outState: 77376, international: 77376 },
    website: "https://www8.gsb.columbia.edu",
    description: "New York's premier business school"
  },
  {
    name: "Chicago Booth School of Business",
    location: { city: "Chicago", state: "IL", country: "USA" },
    ranking: 6,
    programType: "MBA",
    requirements: {
      minGMAT: 670, avgGMAT: 730, maxGMAT: 780,
      minGPA: 3.2, avgGPA: 3.61,
      minWorkExp: 3, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 24.4,
      avgSalary: 150000,
      totalStudents: 1192,
      internationalStudents: 36
    },
    tuition: { outState: 72000, international: 72000 },
    website: "https://www.chicagobooth.edu",
    description: "Analytical approach to business education"
  },
  {
    name: "Northwestern Kellogg School of Management",
    location: { city: "Evanston", state: "IL", country: "USA" },
    ranking: 7,
    programType: "MBA",
    requirements: {
      minGMAT: 660, avgGMAT: 727, maxGMAT: 770,
      minGPA: 3.2, avgGPA: 3.6,
      minWorkExp: 3, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 23.2,
      avgSalary: 145000,
      totalStudents: 1308,
      internationalStudents: 35
    },
    tuition: { outState: 73404, international: 73404 },
    website: "https://www.kellogg.northwestern.edu",
    description: "Marketing and teamwork excellence"
  },
  {
    name: "UC Berkeley Haas School of Business",
    location: { city: "Berkeley", state: "CA", country: "USA" },
    ranking: 8,
    programType: "MBA",
    requirements: {
      minGMAT: 660, avgGMAT: 725, maxGMAT: 770,
      minGPA: 3.3, avgGPA: 3.66,
      minWorkExp: 3, avgWorkExp: 4.9
    },
    stats: {
      acceptanceRate: 17.7,
      avgSalary: 140000,
      totalStudents: 543,
      internationalStudents: 37
    },
    tuition: { inState: 62847, outState: 64246, international: 64246 },
    website: "https://haas.berkeley.edu",
    description: "Innovation in sustainable business"
  },
  {
    name: "Yale School of Management",
    location: { city: "New Haven", state: "CT", country: "USA" },
    ranking: 9,
    programType: "MBA",
    requirements: {
      minGMAT: 650, avgGMAT: 723, maxGMAT: 760,
      minGPA: 3.2, avgGPA: 3.65,
      minWorkExp: 2, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 25.1,
      avgSalary: 135000,
      totalStudents: 738,
      internationalStudents: 43
    },
    tuition: { outState: 72350, international: 72350 },
    website: "https://som.yale.edu",
    description: "Integrated curriculum with global perspective"
  },
  {
    name: "Dartmouth Tuck School of Business",
    location: { city: "Hanover", state: "NH", country: "USA" },
    ranking: 10,
    programType: "MBA",
    requirements: {
      minGMAT: 650, avgGMAT: 722, maxGMAT: 760,
      minGPA: 3.2, avgGPA: 3.53,
      minWorkExp: 3, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 23.9,
      avgSalary: 140000,
      totalStudents: 583,
      internationalStudents: 35
    },
    tuition: { outState: 73440, international: 73440 },
    website: "https://www.tuck.dartmouth.edu",
    description: "Intimate and collaborative learning environment"
  },
  {
    name: "Duke Fuqua School of Business",
    location: { city: "Durham", state: "NC", country: "USA" },
    ranking: 11,
    programType: "MBA",
    requirements: {
      minGMAT: 640, avgGMAT: 703, maxGMAT: 750,
      minGPA: 3.1, avgGPA: 3.49,
      minWorkExp: 2, avgWorkExp: 4.9
    },
    stats: {
      acceptanceRate: 25.4,
      avgSalary: 135000,
      totalStudents: 896,
      internationalStudents: 40
    },
    tuition: { outState: 68200, international: 68200 },
    website: "https://www.fuqua.duke.edu",
    description: "Team Fuqua spirit with global reach"
  },
  {
    name: "University of Michigan Ross School of Business",
    location: { city: "Ann Arbor", state: "MI", country: "USA" },
    ranking: 12,
    programType: "MBA",
    requirements: {
      minGMAT: 640, avgGMAT: 708, maxGMAT: 750,
      minGPA: 3.1, avgGPA: 3.5,
      minWorkExp: 2, avgWorkExp: 5.1
    },
    stats: {
      acceptanceRate: 26.7,
      avgSalary: 135000,
      totalStudents: 821,
      internationalStudents: 34
    },
    tuition: { inState: 64350, outState: 69450, international: 69450 },
    website: "https://michiganross.umich.edu",
    description: "Action-based learning with strong alumni network"
  },
  {
    name: "NYU Stern School of Business",
    location: { city: "New York", state: "NY", country: "USA" },
    ranking: 13,
    programType: "MBA",
    requirements: {
      minGMAT: 630, avgGMAT: 714, maxGMAT: 750,
      minGPA: 3.0, avgGPA: 3.51,
      minWorkExp: 2, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 26.1,
      avgSalary: 130000,
      totalStudents: 786,
      internationalStudents: 39
    },
    tuition: { outState: 74184, international: 74184 },
    website: "https://www.stern.nyu.edu",
    description: "Finance excellence in the heart of NYC"
  },
  {
    name: "UCLA Anderson School of Management",
    location: { city: "Los Angeles", state: "CA", country: "USA" },
    ranking: 14,
    programType: "MBA",
    requirements: {
      minGMAT: 630, avgGMAT: 706, maxGMAT: 750,
      minGPA: 3.0, avgGPA: 3.5,
      minWorkExp: 2, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 30.3,
      avgSalary: 130000,
      totalStudents: 734,
      internationalStudents: 31
    },
    tuition: { inState: 59866, outState: 64711, international: 64711 },
    website: "https://www.anderson.ucla.edu",
    description: "Entertainment and tech industry connections"
  },
  {
    name: "Cornell Johnson Graduate School of Management",
    location: { city: "Ithaca", state: "NY", country: "USA" },
    ranking: 15,
    programType: "MBA",
    requirements: {
      minGMAT: 620, avgGMAT: 700, maxGMAT: 740,
      minGPA: 3.0, avgGPA: 3.37,
      minWorkExp: 2, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 30.7,
      avgSalary: 128000,
      totalStudents: 573,
      internationalStudents: 43
    },
    tuition: { outState: 68992, international: 68992 },
    website: "https://www.johnson.cornell.edu",
    description: "Immersive learning with strong finance focus"
  },
  {
    name: "Carnegie Mellon Tepper School of Business",
    location: { city: "Pittsburgh", state: "PA", country: "USA" },
    ranking: 16,
    programType: "MBA",
    requirements: {
      minGMAT: 620, avgGMAT: 691, maxGMAT: 740,
      minGPA: 3.0, avgGPA: 3.35,
      minWorkExp: 2, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 31.2,
      avgSalary: 125000,
      totalStudents: 437,
      internationalStudents: 53
    },
    tuition: { outState: 67680, international: 67680 },
    website: "https://www.cmu.edu/tepper",
    description: "Quantitative and analytical excellence"
  },
  {
    name: "University of Virginia Darden School of Business",
    location: { city: "Charlottesville", state: "VA", country: "USA" },
    ranking: 17,
    programType: "MBA",
    requirements: {
      minGMAT: 620, avgGMAT: 706, maxGMAT: 740,
      minGPA: 3.0, avgGPA: 3.48,
      minWorkExp: 2, avgWorkExp: 4.9
    },
    stats: {
      acceptanceRate: 32.4,
      avgSalary: 130000,
      totalStudents: 676,
      internationalStudents: 35
    },
    tuition: { inState: 60024, outState: 63024, international: 63024 },
    website: "https://www.darden.virginia.edu",
    description: "Case method teaching excellence"
  },
  {
    name: "UT Austin McCombs School of Business",
    location: { city: "Austin", state: "TX", country: "USA" },
    ranking: 18,
    programType: "MBA",
    requirements: {
      minGMAT: 610, avgGMAT: 690, maxGMAT: 730,
      minGPA: 2.9, avgGPA: 3.42,
      minWorkExp: 2, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 33.8,
      avgSalary: 125000,
      totalStudents: 533,
      internationalStudents: 28
    },
    tuition: { inState: 38296, outState: 52976, international: 52976 },
    website: "https://www.mccombs.utexas.edu",
    description: "Entrepreneurship in a thriving tech hub"
  },
  {
    name: "UNC Kenan-Flagler Business School",
    location: { city: "Chapel Hill", state: "NC", country: "USA" },
    ranking: 19,
    programType: "MBA",
    requirements: {
      minGMAT: 600, avgGMAT: 687, maxGMAT: 730,
      minGPA: 2.9, avgGPA: 3.42,
      minWorkExp: 2, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 36.6,
      avgSalary: 120000,
      totalStudents: 572,
      internationalStudents: 30
    },
    tuition: { inState: 45655, outState: 62903, international: 62903 },
    website: "https://www.kenan-flagler.unc.edu",
    description: "Collaborative culture with strong leadership focus"
  },
  {
    name: "USC Marshall School of Business",
    location: { city: "Los Angeles", state: "CA", country: "USA" },
    ranking: 20,
    programType: "MBA",
    requirements: {
      minGMAT: 600, avgGMAT: 688, maxGMAT: 730,
      minGPA: 2.9, avgGPA: 3.3,
      minWorkExp: 2, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 35.0,
      avgSalary: 120000,
      totalStudents: 439,
      internationalStudents: 32
    },
    tuition: { outState: 63096, international: 63096 },
    website: "https://www.marshall.usc.edu",
    description: "Trojan network with entertainment industry ties"
  },
  {
    name: "Emory Goizueta Business School",
    location: { city: "Atlanta", state: "GA", country: "USA" },
    ranking: 21,
    programType: "MBA",
    requirements: {
      minGMAT: 600, avgGMAT: 681, maxGMAT: 720,
      minGPA: 2.9, avgGPA: 3.29,
      minWorkExp: 2, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 37.1,
      avgSalary: 118000,
      totalStudents: 346,
      internationalStudents: 35
    },
    tuition: { outState: 63000, international: 63000 },
    website: "https://goizueta.emory.edu",
    description: "Small cohorts with personalized attention"
  },
  {
    name: "Washington University Olin Business School",
    location: { city: "St. Louis", state: "MO", country: "USA" },
    ranking: 22,
    programType: "MBA",
    requirements: {
      minGMAT: 590, avgGMAT: 680, maxGMAT: 720,
      minGPA: 2.8, avgGPA: 3.35,
      minWorkExp: 2, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 38.0,
      avgSalary: 115000,
      totalStudents: 277,
      internationalStudents: 40
    },
    tuition: { outState: 59950, international: 59950 },
    website: "https://olin.wustl.edu",
    description: "Healthcare and consulting focus"
  },
  {
    name: "Georgetown McDonough School of Business",
    location: { city: "Washington", state: "DC", country: "USA" },
    ranking: 23,
    programType: "MBA",
    requirements: {
      minGMAT: 590, avgGMAT: 670, maxGMAT: 710,
      minGPA: 2.8, avgGPA: 3.29,
      minWorkExp: 2, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 46.7,
      avgSalary: 115000,
      totalStudents: 549,
      internationalStudents: 32
    },
    tuition: { outState: 61392, international: 61392 },
    website: "https://msb.georgetown.edu",
    description: "International business and government relations"
  },
  {
    name: "Indiana Kelley School of Business",
    location: { city: "Bloomington", state: "IN", country: "USA" },
    ranking: 24,
    programType: "MBA",
    requirements: {
      minGMAT: 580, avgGMAT: 664, maxGMAT: 710,
      minGPA: 2.8, avgGPA: 3.33,
      minWorkExp: 1, avgWorkExp: 5
    },
    stats: {
      acceptanceRate: 43.6,
      avgSalary: 110000,
      totalStudents: 384,
      internationalStudents: 35
    },
    tuition: { inState: 28298, outState: 50328, international: 50328 },
    website: "https://kelley.iu.edu",
    description: "Strong marketing and brand management"
  },
  {
    name: "Rice Jones Graduate School of Business",
    location: { city: "Houston", state: "TX", country: "USA" },
    ranking: 25,
    programType: "MBA",
    requirements: {
      minGMAT: 580, avgGMAT: 676, maxGMAT: 710,
      minGPA: 2.8, avgGPA: 3.29,
      minWorkExp: 1, avgWorkExp: 4.8
    },
    stats: {
      acceptanceRate: 41.2,
      avgSalary: 112000,
      totalStudents: 244,
      internationalStudents: 38
    },
    tuition: { outState: 58680, international: 58680 },
    website: "https://business.rice.edu",
    description: "Energy sector and entrepreneurship focus"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing universities
    await University.deleteMany({});
    console.log('Cleared existing universities');

    // Insert new universities
    await University.insertMany(universities);
    console.log(`Seeded ${universities.length} universities`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();