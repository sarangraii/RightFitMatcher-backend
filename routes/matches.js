const express = require('express');
const { body } = require('express-validator');
const University = require('../models/University');
const Search = require('../models/Search');
const auth = require('../middleware/auth');
const validate = require('../middleware/validation');
const { calculateMatchScore, categorizeUniversity } = require('../utils/matchingAlgorithm');

const router = express.Router();

// Get matches
router.post('/', [
  body('gmatScore').optional().isFloat({ min: 0, max: 800 }),
  body('greScore').optional().isFloat({ min: 0, max: 340 }),
  body('gpa').isFloat({ min: 0, max: 4.0 }).withMessage('GPA must be between 0 and 4.0'),
  body('workExperience').optional().isInt({ min: 0 }),
  body('programType').optional().isIn(['MBA', 'MS', 'PhD', 'Undergraduate', 'Other']),
  validate
], async (req, res) => {
  try {
    const { gmatScore, greScore, gpa, workExperience = 0, programType = 'MBA' } = req.body;

    // Convert GRE to GMAT equivalent if provided
    let effectiveGMAT = gmatScore;
    if (!gmatScore && greScore) {
      // GRE to GMAT conversion formula (approximate)
      effectiveGMAT = Math.round((greScore - 260) * 3.5 + 200);
    }

    // Get relevant universities
    const universities = await University.find({
      $or: [
        { programType: programType },
        { programType: 'Multiple' }
      ]
    });

    // Calculate match scores
    const matches = universities.map(uni => {
      const score = calculateMatchScore({
        gmatScore: effectiveGMAT,
        gpa,
        workExperience
      }, uni);

      return {
        university: uni,
        matchScore: score.matchScore,
        admissionProbability: score.probability,
        category: score.category,
        strengths: score.strengths,
        weaknesses: score.weaknesses
      };
    });

    // Sort by match score
    matches.sort((a, b) => b.matchScore - a.matchScore);

    // Save search if user is authenticated
    if (req.userId) {
      const search = new Search({
        userId: req.userId,
        searchParams: { gmatScore: effectiveGMAT, gpa, workExperience, programType },
        results: matches.slice(0, 20).map(m => ({
          university: m.university._id,
          matchScore: m.matchScore,
          admissionProbability: m.admissionProbability,
          category: m.category
        }))
      });
      await search.save();
    }

    res.json({
      success: true,
      count: matches.length,
      searchParams: {
        gmatScore: effectiveGMAT,
        greScore,
        gpa,
        workExperience,
        programType
      },
      matches: matches.slice(0, 25) // Return top 25 matches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate matches',
      error: error.message
    });
  }
});

// Get search history (authenticated only)
router.get('/history', auth, async (req, res) => {
  try {
    const searches = await Search.find({ userId: req.userId })
      .populate('results.university')
      .sort({ timestamp: -1 })
      .limit(10);

    res.json({
      success: true,
      count: searches.length,
      searches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch search history',
      error: error.message
    });
  }
});

// Save search results
router.post('/save', auth, async (req, res) => {
  try {
    const { searchParams, results } = req.body;

    const search = new Search({
      userId: req.userId,
      searchParams,
      results
    });

    await search.save();

    res.json({
      success: true,
      message: 'Search saved successfully',
      search
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save search',
      error: error.message
    });
  }
});

module.exports = router;