import Grade from "../models/grade.js";
import sanitize from 'mongo-sanitize';

export const getGrades = async (req, res) => {

	try {
		let grades = [];
		grades = await Grade.find().sort({ value: 1 });

		res.json({ data: grades });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getGrade = async (req, res) => {
	const { id } = req.params;

	try {
		const grade = await Grade.findById(id);
		res.status(200).json(grade);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
}

export const createGrade = async (req, res) => {
	const { grade } = req.body;
	const newGrade = new Grade({ ...grade, creator: req.userId })

	try {
		await newGrade.save();
		res.status(201).json(newGrade);
	} catch (error) {
		console.log(error);
		res.status(404).json({ msg: error });
	}
}

export const deleteGrade = async (req, res) => {
	const { id } = req.params;

	try {
		const grade = await Grade.findById(id);
		await Grade.findByIdAndRemove(id);
		res.status(202).json(grade);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
}