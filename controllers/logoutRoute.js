const express = require('express');
const router = express.Router();
// redirect to the home page
router.get('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.redirect('/login');
    });
});

module.exports = router;
