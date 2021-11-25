import Climb from "../models/climb.js";
import sanitize from 'mongo-sanitize';

export const getClimbs = async (req, res) => {
	try {
		let query = {
			"name": { $regex: `${req.query.name}`, $options: 'i' },
			"quality": { $gt: `${req.query.qualityMin}`, $lt: `${req.query.qualityMax}` },
		};

		let sort = {};

		sort[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1;

		const climbs = await Climb.find(query).sort(sort).limit(Number(req.query.limit)).skip(Number(req.query.skip));
		const total = await Climb.find(query).count();	
		
		res.json({ data: climbs, hasMore: total >= Number(req.query.limit) + Number(req.query.skip) });
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