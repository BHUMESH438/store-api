const product = require('../models/product');

//manual approach
const getallProductStatic = async (req, res) => {
  const products = await product.find({}).sort('name').select('name company rating');
  res.status(200).json({ products, nbHits: products.length });
};

//automated approach
const getallProduct = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query; //getting sort outof query
  const queryObj = {};
  //#1query params-simple if company and feature as if feature shoudnt be ""
  if (featured) {
    queryObj.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  //#2search of names/strings
  if (name) {
    console.log('>>>>>>', name);
    queryObj.name = { $regex: name, $options: 'i' };
  }
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '<': '$lt',
      '<=': '$lte',
      '=': '$eq'
    };
    const regex = /\b(>|<|>=|<=|=)\b/g;
    let filters = numericFilters.replace(regex, match => `-${operatorMap[match]}-`);
    const options = ['price', 'rating']; //both property use number value and this options is the where we store the num prop/val
    filters = filters.split(',').forEach(items => {
      const [field, operator, value] = items.split('-');
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) }; //-------------------we can give the queryobject proprety by either.nothation or by[] array destructring
      }
    });
    console.log('>>>>>>>>>>>>>>>>>>', numericFilters);
    console.log('>>>>>>>>>>>>>>filters>>>>', queryObj);
  }
  //#3storing product find/filterd product in a variable-
  let result = product.find(queryObj);

  //#4sort
  if (sort) {
    console.log('>>>>>>>>>>>>>>>>>>', sort);
    const sortList = sort.split(',').join(' '); //in querr sort value given , and without '' we should split that and ''
    console.log('>>>>>>>>>>>>>>>>>>', sortList);
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }
  //#5selecting
  if (fields) {
    const fieldList = fields.split(',').join(' ');
    result.select(fieldList);
  }
  //#6-the value from the query params is always a string if need type convert it
  //pagination
  const page = Number(req.query.page) || 1; //1;3 //in which page we are
  const limit = Number(req.query.limit) || 10; //'';10 // sets the limit of the current/basic page
  const skip = (page - 1) * limit; //0=23;20//skips the skip(n) amount of document
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};
module.exports = { getallProductStatic, getallProduct };
