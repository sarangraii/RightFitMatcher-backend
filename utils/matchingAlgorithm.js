// Matching algorithm for university recommendations

function calculateMatchScore(userProfile, university) {
  const { gmatScore, gpa, workExperience } = userProfile;
  const { requirements } = university;

  // Weight factors
  const GMAT_WEIGHT = 0.40;
  const GPA_WEIGHT = 0.35;
  const WORK_EXP_WEIGHT = 0.25;

  // Calculate GMAT score (0-100)
  let gmatScore_normalized = 0;
  if (gmatScore && requirements.avgGMAT) {
    if (gmatScore >= requirements.avgGMAT) {
      gmatScore_normalized = Math.min(100, 80 + ((gmatScore - requirements.avgGMAT) / 50) * 20);
    } else if (gmatScore >= requirements.minGMAT) {
      const range = requirements.avgGMAT - requirements.minGMAT;
      gmatScore_normalized = 50 + ((gmatScore - requirements.minGMAT) / range) * 30;
    } else {
      gmatScore_normalized = Math.max(0, (gmatScore / requirements.minGMAT) * 50);
    }
  }

  // Calculate GPA score (0-100)
  let gpaScore = 0;
  if (gpa && requirements.avgGPA) {
    if (gpa >= requirements.avgGPA) {
      gpaScore = Math.min(100, 80 + ((gpa - requirements.avgGPA) / 0.5) * 20);
    } else if (gpa >= requirements.minGPA) {
      const range = requirements.avgGPA - requirements.minGPA;
      gpaScore = 50 + ((gpa - requirements.minGPA) / range) * 30;
    } else {
      gpaScore = Math.max(0, (gpa / requirements.minGPA) * 50);
    }
  }

  // Calculate work experience score (0-100)
  let workExpScore = 0;
  if (requirements.avgWorkExp) {
    if (workExperience >= requirements.avgWorkExp) {
      workExpScore = Math.min(100, 80 + ((workExperience - requirements.avgWorkExp) / 2) * 20);
    } else if (workExperience >= requirements.minWorkExp) {
      const range = requirements.avgWorkExp - requirements.minWorkExp;
      workExpScore = 50 + ((workExperience - requirements.minWorkExp) / range) * 30;
    } else if (requirements.minWorkExp === 0) {
      workExpScore = 70; // No work experience required
    } else {
      workExpScore = Math.max(0, (workExperience / requirements.minWorkExp) * 50);
    }
  } else {
    workExpScore = 70; // Default if not specified
  }

  // Calculate weighted match score
  const matchScore = Math.round(
    gmatScore_normalized * GMAT_WEIGHT +
    gpaScore * GPA_WEIGHT +
    workExpScore * WORK_EXP_WEIGHT
  );

  // Calculate admission probability
  let probability = matchScore;
  if (university.stats?.acceptanceRate) {
    // Adjust based on acceptance rate
    probability = Math.round(matchScore * (university.stats.acceptanceRate / 100) * 1.5);
    probability = Math.min(95, probability); // Cap at 95%
  }

  // Categorize university
  let category = 'Target';
  if (probability >= 70) category = 'Safety';
  else if (probability < 40) category = 'Reach';

  // Identify strengths and weaknesses
  const strengths = [];
  const weaknesses = [];

  if (gmatScore_normalized >= 80) strengths.push('Excellent test score');
  else if (gmatScore_normalized < 50) weaknesses.push('Test score below average');

  if (gpaScore >= 80) strengths.push('Strong GPA');
  else if (gpaScore < 50) weaknesses.push('GPA below requirements');

  if (workExpScore >= 80) strengths.push('Extensive work experience');
  else if (workExpScore < 50) weaknesses.push('Limited work experience');

  return {
    matchScore,
    probability,
    category,
    strengths,
    weaknesses,
    breakdown: {
      gmat: Math.round(gmatScore_normalized),
      gpa: Math.round(gpaScore),
      workExp: Math.round(workExpScore)
    }
  };
}

function categorizeUniversity(probability) {
  if (probability >= 70) return 'Safety';
  if (probability >= 40) return 'Target';
  return 'Reach';
}

module.exports = {
  calculateMatchScore,
  categorizeUniversity
};