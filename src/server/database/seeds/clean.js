require('./connect')();
const { mongoose } = require('../../database')
const User = require('../../database/models/User');

const exampleUsers = [
    {
        email: 'lucanathan@live.com',
        username: 'Luc',
        role: 'admin',
        password: 'hello55',
        dateOfBirth: '10/23/1995',
        profile: {
            gender: 'male',
            gendersInterestedIn: ['female'],
            geolocation: [50.441357, 6.658307],
            distanceInterestedIn: 100
        }
    },
]

const runSeed = async () => {
    try {
        const deleteResult = await User.remove({});
        const created = await User.create(exampleUsers);
        console.log('deleted', deleteResult.n + ' users');
        console.log('created', created.length + ' users');
        mongoose.connection.close();
    } catch (e) {
        console.log(e);
        mongoose.connection.close();
    }
}

runSeed();