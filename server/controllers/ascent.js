import Ascent from "../models/ascent.js";

export const getAscents = async (req, res) => {
    const { page } = req.query;

    try {
        const limit = 12;
        const startIndex = (Number(page) - 1) * limit;
        
        const total = await Ascent.countDocuments({});
        const ascents = await Ascent.find().sort({_id: -1}).limit(limit).skip(startIndex);
        if(!ascents) {
            ascents = [];
        }

        res.json({ data: ascents, currentPage: Number(page), numberOfPages: Math.ceil(total / limit) });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const getAscentsByUser = async (req, res) => {
    const { page, userId } = req.query;

    try {
        const limit = 12;
        const startIndex = (Number(page) - 1) * limit;
        
        const ascents = await Ascent.find({$or: [{ userId: userId }]}).sort({_id: -1}).limit(limit).skip(startIndex);
        const total = await Climb.countDocuments({});

        if(!ascents) {
            ascents = [];
        }

        res.json({ data: ascents, currentPage: Number(page), numberOfPages: Math.ceil(total / limit) });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const createAscent = async (req, res) => {
    const ascent = req.body;
    const newAscent = new Ascent({ ...climb, creator: req.userId })

    try {
        await newAscent.save();
        res.status(201).json(newAscent);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteAscent = async (req, res) => {
    const { id } = req.params;

    try {
        const ascent = await Ascent.findById(id);
        await Ascent.findByIdAndRemove(id);
        res.status(202).json(ascent);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}