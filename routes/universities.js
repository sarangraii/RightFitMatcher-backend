const express = require('express');
const University = require('../models/University');

const router = express.Router();

// Get all universities
router.get('/', async (req, res) => {
  try {
    const { programType, limit = 50 } = req.query;
    
    let query = {};
    if (programType && programType !== 'All') {
      query.$or = [
        { programType: programType },
        { programType: 'Multiple' }
      ];
    }

    const universities = await University.find(query)
      .limit(parseInt(limit))
      .sort({ ranking: 1 });

    res.json({
      success: true,
      count: universities.length,
      universities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch universities',
      error: error.message
    });
  }
});

// Get university by ID
router.get('/:id', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    
    if (!university) {
      return res.status(404).json({
        success: false,
        message: 'University not found'
      });
    }

    res.json({
      success: true,
      university
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch university',
      error: error.message
    });
  }
});

// Filter by program type
router.get('/program/:type', async (req, res) => {
  try {
    const { type } = req.params;
    
    const universities = await University.find({
      $or: [
        { programType: type },
        { programType: 'Multiple' }
      ]
    }).sort({ ranking: 1 });

    res.json({
      success: true,
      count: universities.length,
      universities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch universities',
      error: error.message
    });
  }
});

module.exports = router;