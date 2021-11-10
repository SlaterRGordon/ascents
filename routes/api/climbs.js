const express = require('express');
const router = express.Router();

// Climb Model
const Climb = require('../../models/Climb');

// @route	GET api/climbs
// @desc	Get all climbs
// @access	Public
router.get('/', (req, res) => {
	Climb.find()
		.sort({date: -1})
		.then(climbs => res.json(climbs));
});

// @route	POST api/climbs
// @desc	Create a Climb
// @access	Public
router.post('/', (req, res) => {
	const newClimb = new Climb({
		name: req.body.name
	});

	newClimb.save().then(climb => {res.json(climb)});
});

// @route	DELETE api/climbs/:id
// @desc	Delete a Climb
// @access	Public
router.delete('/:id', (req, res) => {
	Climb.findById(req.params.id)
		.then(climb => climb.remove().then(() => res.json({success: true})))
		.catch(err => res.status(404).json({success: false}));
})

module.exports = router;