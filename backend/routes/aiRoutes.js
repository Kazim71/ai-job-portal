import express from 'express'
import { searchJobsWithAI, getSuggestedPrompts } from '../controllers/aiController.js'

const router = express.Router()

// AI-powered job search
router.post('/search', searchJobsWithAI)

// Get suggested prompts
router.get('/prompts', getSuggestedPrompts)

export default router