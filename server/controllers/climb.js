import Climb from "../models/climb.js";

export const getClimbs = async (req, res) => {
    const { page } = req.query;

    try {
        const limit = 12;
        const startIndex = (Number(page) - 1) * limit;
        
        const total = await Climb.countDocuments();
        const hasMore = total >= startIndex + limit;
        const climbs = await Climb.find().sort({_id: -1}).limit(limit).skip(startIndex);
        if(!climbs) {
            climbs = [];
        }

        res.json({data: climbs, hasMore: hasMore});
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
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}