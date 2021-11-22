import Climb from "../models/climb.js";
import sanitize from 'mongo-sanitize';

export const getClimbs = async (req, res) => {

	try {
		var name = sanitize(req.query.name);
		var page = sanitize(req.query.page);

		const limit = 12;
		const startIndex = (Number(page) - 1) * limit;
		let total = 0;
		let climbs = [];
		if (name !== 'none') {
			climbs = await Climb.find({ name: { "$regex": name, "$options": "i" } }).sort({ _id: -1 }).limit(limit).skip(startIndex);
			total = await Climb.find({ name: { "$regex": name, "$options": "i" } }).count();
		} else {
			climbs = await Climb.find().sort({ _id: -1 }).limit(limit).skip(startIndex);
			total = await Climb.find().count();
		}
		console.log(total);
		const hasMore = total >= startIndex + limit;

		if (!climbs) {
			climbs = [];
		}

		res.json({ data: climbs, hasMore: hasMore });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getClimb = async (req, res) => {
	const { id } = req.params;

	try {
		const climb = await Climb.findById(id);
		res.status(200).json(climb);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
}

export const createClimb = async (req, res) => {
	const { climb } = req.body;
	const newClimb = new Climb({ ...climb, creator: req.userId })

	try {
		await newClimb.save();
		res.status(201).json(newClimb);
	} catch (error) {
		console.log(error);
		res.status(404).json({ msg: error });
	}
}

export const deleteClimb = async (req, res) => {
	const { id } = req.params;

	try {
		const climb = await Climb.findById(id);
		await Climb.findByIdAndRemove(id);
		res.status(202).json(climb);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
}