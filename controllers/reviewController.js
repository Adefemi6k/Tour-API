const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

// Create Review. This immediate function is also for create review
exports.setTourUserIds = (req, res, next) => {
  // Allow Nested Routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createReview = factory.createOne(Review);

// exports.createReview = catchAsync(async (req, res, next) => {
//   // Allow Nested Routes
//   if (!req.body.tour) req.body.tour = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id;

//   const newReview = await Review.create(req.body);

//   res.status(201).json({
//     status: 'Success',
//     data: {
//       newReview,
//     },
//   });
// });

exports.getAllReviews = factory.getAll(Review);

// exports.getAllReviews = catchAsync(async (req, res, next) => {
//   let filter = {};
//   if (req.params.tourId) filter = { tour: req.params.tourId };

//   const reviews = await Review.find(filter);

//   res.status(200).json({
//     status: 'Success',
//     results: reviews.length,
//     data: {
//       reviews,
//     },
//   });
// });

exports.getReview = factory.getOne(Review);

// exports.getReview = catchAsync(async (req, res, next) => {
//   const review = await Review.findOne();

//   res.status(200).json({
//     status: 'Success',
//     data: {
//       review,
//     },
//   });
// });

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);
