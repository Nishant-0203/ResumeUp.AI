const Job = require('../models/Job');
const Analysis = require('../models/Analysis');
const axios = require('axios');

exports.getRecommendedJobs = async (req, res) => {
    try {
        // Get the user's latest analysis
        const latestAnalysis = await Analysis.findOne({ 
            user: req.user._id 
        }).sort({ createdAt: -1 });

        if (!latestAnalysis) {
            return res.status(404).json({ message: 'No resume analysis found' });
        }

        // Extract skills from analysis
        const userSkills = latestAnalysis.analysisJson?.skillsToImprove || [];
        // Default to Entry Level if no clear experience level is found
        const experienceLevel = 'Entry Level';

        // Using RapidAPI Jobs API
        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/search',
            params: {
                query: userSkills.join(' '),
                page: '1',
                num_pages: '1'
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);

        // Transform and save jobs to our database
        const jobs = response.data.data.map(job => ({
            title: job.job_title,
            company: job.employer_name,
            location: job.job_city ? `${job.job_city}, ${job.job_country}` : 'Remote',
            description: job.job_description,
            linkedinUrl: job.job_apply_link,
            skills: userSkills,
            experienceLevel,
            jobType: job.job_employment_type || 'Full-time',
            salary: job.job_salary || 'Not specified',
            postDate: job.job_posted_at_datetime || new Date()
        }));

        await Job.insertMany(jobs);

        // Get recommended jobs from our database with advanced filtering
        const recommendedJobs = await Job.find({
            $and: [
                { skills: { $in: userSkills } },
                { experienceLevel: experienceLevel },
                { 
                    postDate: { 
                        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
                    } 
                }
            ]
        })
        .sort({ postDate: -1 }) // Sort by post date
        .limit(15);

        res.json(recommendedJobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        
        // Send more specific error messages
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            res.status(error.response.status).json({
                message: `API Error: ${error.response.data.message || 'Failed to fetch jobs'}`,
                details: error.response.data
            });
        } else if (error.request) {
            // The request was made but no response was received
            res.status(503).json({
                message: 'No response from jobs API. Please try again later.'
            });
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(500).json({
                message: 'Error fetching job recommendations',
                details: error.message
            });
        }
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs' });
    }
};
