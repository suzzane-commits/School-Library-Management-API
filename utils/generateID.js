const Counter = require ('../models/Counter');
const generateID = async( name,prefix) => {
    const counter = await Counter.findOneAndUpdate(
        {name: name},
        {$inc:{value:1} },
         {
            upsert: true,
            returnDocument: "after"
        }
    );
    const number = String(counter.value).padStart(3,'0');
    return `${prefix}${number}`;
};
module.exports = generateID;