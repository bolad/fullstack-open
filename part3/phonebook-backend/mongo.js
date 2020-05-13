const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://bolad:${password}@cluster0-il93b.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const contactSchemna = new mongoose.Schema({
    name: String,
    number: String
});

const Contact = mongoose.model('Contact', contactSchemna);

if (process.argv.length > 3 && name !== '' && number !== '') {
    const person = new Contact({
        name: name,
        number: number
    });

    person.save().then(response => {
        console.log(`${person.name} is saved to the database`);
        mongoose.connection.close();
    });
} else {
    Contact.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        });
        mongoose.connection.close();
    });
}