const Subscription = require('../models/sub.models');
const { createSubValidation } = require('../validations/sub.validations');

async function createSub(req, res) {
  try {
    const { error } = createSubValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const sub = new Subscription({
      name: req.body.name,
      price: req.body.price,
      billingCycle: req.body.billingCycle,
      userId: req.user._id
    });

    await sub.save();
    res.status(201).json(sub);

  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
}

async function getSubs(req, res) {
  try {
    const subs = await Subscription.find({ userId: req.user._id });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
}

async function getSub(req, res) {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub || sub.userId.toString() !== req.user._id.toString())
      return res.status(404).json({ message: 'Subscription not found' });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
}

async function updateSub(req, res) {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub || sub.userId.toString() !== req.user._id.toString())
      return res.status(404).json({ message: 'Subscription not found' });

    sub.name = req.body.name || sub.name;
    sub.price = req.body.price || sub.price;
    sub.billingCycle = req.body.billingCycle || sub.billingCycle;

    await sub.save();
    res.json(sub);

  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
}

async function deleteSub(req, res) {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub || sub.userId.toString() !== req.user._id.toString())
      return res.status(404).json({ message: 'Subscription not found' });

    await sub.remove();
    res.json({ message: 'Subscription deleted' });

  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
}

module.exports = { createSub, getSubs, getSub, updateSub, deleteSub };
