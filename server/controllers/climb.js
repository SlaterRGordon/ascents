import Climb from "../models/climb.js";

export const getClimbs = async (req, res) => {
    const { page } = req.query;

    try {
        const limit = 4;
        const startIndex = (Number(page) - 1) * limit;
        
        const total = await Climb.countDocuments({});
        const climbs = await Climb.find().sort({_id: -1}).limit(limit).skip(startIndex);
        if(!climbs) {
            climbs = [];
        }

        res.json({ data: climbs, currentPage: Number(page), numberOfPages: Math.ceil(total / limit) });
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
    const climb = req.body;
    const newClimb = new Climb({ ...climb, creator: req.userId })

    try {
        await newClimb.save();
        res.status(201).json(newClimb);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// export const updateClimb = async (req, res) => {
//     const { id } = req.params;
//     const { title, message, creator, selectedFile, tags } = req.body;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

//     await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//     res.json(updatedPost);
// }

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