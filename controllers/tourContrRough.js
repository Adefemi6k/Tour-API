exports.getAllTours = async (req, res) => {
    try {
      // console.log(req.query);
  
      // BUILD QUERY
      // 1A) FILTERING
      const queryObj = { ...req.query };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queryObj[el]);
  
      // 1B) Advanced filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      let query = Tour.find(JSON.parse(queryStr));
  
      // 2)SORTING
      if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
      } else {
        query = query.sort('-createdAt');
      }
  
      // 3) FIELDS LIMITING
      if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
      } else {
        query = query.select('__v');
      }
  
      // 4) PAGINATION
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 100;
      const skip = (page - 1) * limit;
  
      query = query.skip(skip).limit(limit);
  
      if (req.query.page) {
        const numTours = await Tour.countDocuments();
        if (skip >= numTours) throw new Error('This page does not exist');
      }
  
      // EXECUTE QUERY
      const tours = await query;
  
      // const query = Tour.find()
      //   .where('duration')
      //   .equals(5)
      //   .where('difficulty')
      //   .equals('easy');
  
      // SEND RESPONSE
      res.status(200).json({
        status: 'Success',
        results: tours.length,
        data: { tours },
      });
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        message: 'Could not get all tours',
      });
    }
  };