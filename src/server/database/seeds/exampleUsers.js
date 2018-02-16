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
    {
        email: 'lea@test.com',
        username: 'Lea',
        password: 'example',
        dateOfBirth: '02/08/1995',
        profile: {
            gender: 'female',
            gendersInterestedIn: ['male'],
            geolocation: [50.941357, 6.958307],
            distanceInterestedIn: 100
        }
    },
    {
        email: 'sara@test.com',
        username: 'Sara',
        password: 'example',
        dateOfBirth: '07/06/1996',
        profile: {
            gender: 'female',
            gendersInterestedIn: ['male'],
            geolocation: [50.9454357, 6.954307],
            distanceInterestedIn: 40
        }
    },
    {
        email: 'linus@test.com',
        username: 'Linus',
        password: 'example',
        dateOfBirth: '01/18/1995',
        profile: {
            gender: 'male',
            gendersInterestedIn: ['female'],
            geolocation: [51.1454357, 5.454307],
            distanceInterestedIn: 200
        }
    }
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