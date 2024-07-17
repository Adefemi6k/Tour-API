const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'Success',
      result: {
        data: newDoc,
      },
    });
  });

// Get All Documents
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tourId(Hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // const tours = await query;
    const docs = await features.query;
    // const docs = await features.query.explain();

    // SEND RESPONSE
    res.status(200).json({
      status: 'Success',
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

// Get One Document
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;
    // Tour.findOne({ _id: req.params.id });

    if (!doc) {
      return new AppError('No document found with that ID', 404);
    }

    res.status(200).json({
      status: 'Success',
      result: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return new AppError('No tour found with that ID', 404);
    }

    res.status(200).json({
      status: 'Success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // await Tour.findByIdAndDelete(req.params.id, req.body);
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return new AppError('No document found with that ID', 404);
    }

    res.status(204).json({
      status: 'Success',
      data: null,
    });
  });
