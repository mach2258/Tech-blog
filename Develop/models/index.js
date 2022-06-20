const Location = require('./Location');
const Traveller = require('./Traveller');
const Trips = require('./Trips');

Traveller.belongsToMany(Location, {
    through: Trips,
    onDelete: 'CASCADE',
});

Location.belongsToMany(Traveller, {
    through: Trips,
    onDelete: 'CASCADE'
});


module.exports = { Location, Traveller, Trips };