const mongoose = require('mongoose');

const db = process.env.DATABASE;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(() => {
    console.log(`connection successful`);
})
.catch((err) => console.log(`no connection`));