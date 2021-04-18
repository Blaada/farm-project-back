const httpStatus = require('http-status');
const moment = require('moment');
const { Outgoing } = require('../models');
const ApiError = require('../utils/ApiError');

const createOutgoing = async (body) => {
  const outgoing = await Outgoing.create(body);
  return outgoing;
};

const queryOutgoings = async (filter, options) => {
  const outgoings = await Outgoing.paginate(filter, options);
  return outgoings;
};
const outgoingsCountByMonth = async () => {
  const FIRST_MONTH = 1
  const LAST_MONTH = 12
  const MONTHS_ARRAY = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
  let START_DATE = moment().startOf('year').toDate();
  let END_DATE = moment().endOf('year').toDate();
  console.log('START_DATE',moment().startOf('year'));
  console.log('ENDT_DATE',END_DATE);
  const outgoingsCount = Outgoing.aggregate([
    { 
      $match: { 
          createDate: { $gte: START_DATE, $lte: END_DATE }
      }
    },
    { 
      $group: {
          _id: { "year_month": { $substrCP: [ "$createDate", 0, 7 ] } }, 
          count: { $sum: "$outgoingPrice" }
      } 
    },
    {
        $sort: { "_id.year_month": 1 }
    },
    { 
        $project: { 
            _id: 0, 
            count: 1, 
            month_year: { 
                $concat: [ 
                  { $arrayElemAt: [ MONTHS_ARRAY, { $subtract: [ { $toInt: { $substrCP: [ "$_id.year_month", 5, 2 ] } }, 1 ] } ] },
                  "-", 
                  { $substrCP: [ "$_id.year_month", 0, 4 ] }
                ] 
            }
        } 
    },
    { 
        $group: { 
            _id: null, 
            data: { $push: { k: "$month_year", v: "$count" } }
        } 
    },
    { 
        $addFields: { 
            start_year: { $substrCP: [ START_DATE, 0, 4 ] }, 
            end_year: { $substrCP: [ END_DATE, 0, 4 ] },
            months1: { $range: [ { $toInt: { $substrCP: [ START_DATE, 5, 2 ] } }, { $add: [ LAST_MONTH, 1 ] } ] },
            months2: { $range: [ FIRST_MONTH, { $add: [ { $toInt: { $substrCP: [ END_DATE, 5, 2 ] } }, 1 ] } ] }
        } 
    },
    { 
        $addFields: { 
            template_data: { 
                $concatArrays: [ 
                    { $map: { 
                        input: "$months1", as: "m1",
                        in: {
                            count: 0,
                            month_year: { 
                                $concat: [ { $arrayElemAt: [ MONTHS_ARRAY, { $subtract: [ "$$m1", 1 ] } ] }, "-",  "$start_year" ] 
                            }                                            
                        }
                    } }, 
                    { $map: { 
                        input: "$months2", as: "m2",
                        in: {
                            count: 0,
                            month_year: { 
                                $concat: [ { $arrayElemAt: [ MONTHS_ARRAY, { $subtract: [ "$$m2", 1 ] } ] }, "-",  "$end_year" ] 
                            }                                            
                        }
                    } }
                ] 
          }
        }
    },
    { 
        $addFields: { 
            data: { 
              $map: { 
                  input: "$template_data", as: "t",
                  in: {   
                      k: "$$t.month_year",
                      v: { 
                          $reduce: { 
                              input: "$data", initialValue: 0, 
                              in: {
                                  $cond: [ { $eq: [ "$$t.month_year", "$$this.k"] },
                                                { $add: [ "$$this.v", "$$value" ] },
                                                { $add: [ 0, "$$value" ] }
                                  ]
                              }
                          } 
                      }
                  }
                }
            }
        }
    },
    {
        $project: { 
            data: { $arrayToObject: "$data" }, 
            _id: 0 
        } 
    }
  ])
  return outgoingsCount;
}
const getOutgoingById = async (id) => {
  return Outgoing.findById(id);
};

const updateOutgoingById = async (id, updateBody) => {
  const outgoing = await getOutgoingById(id);
  if (!Outgoing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Outgoing not found');
  }
  Object.assign(outgoing, updateBody);
  await outgoing.save();
  return outgoing;
};

const deleteOutgoingById = async (id) => {
  const outgoing = await getOutgoingById(id);
  if (!outgoing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Outgoing not found');
  }
  await outgoing.remove();
  return outgoing;
};

module.exports = {
  createOutgoing,
  queryOutgoings,
  outgoingsCountByMonth,
  getOutgoingById,
  updateOutgoingById,
  deleteOutgoingById
};
