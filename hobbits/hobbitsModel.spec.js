const db = require('../data/dbConfig');

const Hobbits = require('./hobbitsModel');

describe('the hobbits model', () => {

    describe('insert()', () => {

        afterEach(async () => {
            // cleanup
            await db('hobbits').truncate();
        });
        it('should insert hobbits into the db', async () => {
            // using our model method
            await Hobbits.insert({ name: 'Sam' });
            await Hobbits.insert({ name: 'Frodo' });

            // confirm with knex
            const hobbits = await db('hobbits');

            expect(hobbits).toHaveLength(2);
            expect(hobbits[0].name).toBe('Sam');
        });

        it('should return the new hobbit on insert', async () => {
            const hobbit = await Hobbits.insert({ name: 'Sam' });

            expect(hobbit).toEqual({ id: 1, name: 'Sam' });
        });
    });

    describe('findById()', () => {
        afterEach(async () => {
            // cleanup
            await db('hobbits').truncate();
        });

        it('finds a hobbit by id', async () => {
            // set up
            await db('hobbits').insert([
                { name: 'Sam' },
                { name: 'Frodo' },
            ]);

            const hobbit = await Hobbits.findById(2);

            expect(hobbit.name).toBe('Frodo');
        });

        if('returns undefined on invalid id', async () => {
            const hobbit = await Hobbits.findById(2);

            expect(hobbit).toBeUndefined();
        });
    });
});
