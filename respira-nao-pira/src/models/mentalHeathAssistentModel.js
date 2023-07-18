 const mongoose = require('mongoose');

 const mentalHealthAssistentSchema = new mongoose.Schema({
     name: {
         type: String
     },
     email: {
         type: String
     },
     password: {
         type: String
     }
 }, {
     versionKey: false
 })

 const mentalHealthAssistent = mongoose.model("mentalHealthAssistent", mentalHealthAssistentSchema);

 module.exports = mentalHealthAssistent;