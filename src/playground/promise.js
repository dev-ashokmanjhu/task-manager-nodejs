const User = require("../models/user");
require("../db/mongoose");
// User.findByIdAndDelete("6423c64c920fdd0b983aa2f1")
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments();
//   })
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

const findbyidanddelete = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments();
  return count;
};

findbyidanddelete("6423e25ef4c862143425cee3", 18)
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
