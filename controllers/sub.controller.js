const Subscription = require('../models/sub.models');

async function createSub(req, res) {
    try {
        const sub = new Subscription({ ...req.body, userId: req.user._id });
        await sub.save();
        res.status(201).json(sub);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getSubs(req, res) {
    try {
        const subs = await Subscription.find({ userId: req.user._id });
        res.json(subs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getSub(req, res) {
    try {
        const sub = await Subscription.findOne({ _id: req.params.id, userId: req.user._id });
        if (!sub) return res.status(404).json({ message: 'Subscription not found' });
        res.json(sub);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateSub(req, res) {
    try {
        const sub = await Subscription.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!sub) return res.status(404).json({ message: 'Subscription not found' });
        res.json(sub);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteSub(req, res) {
    try {
        const sub = await Subscription.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!sub) return res.status(404).json({ message: 'Subscription not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { createSub, getSubs, getSub, updateSub, deleteSub };
