// seed.js
const bcrypt = require('bcrypt');
const { sequelize, User, Store } = require('./models');
(async () => {
  await sequelize.sync();
  const adminPwd = await bcrypt.hash('Admin@1234', 10);
  const ownerPwd = await bcrypt.hash('Owner@1234', 10);
  const [admin, owner] = await Promise.all([
    User.findOrCreate({ where: { email: 'admin@example.com' }, defaults: { name: 'System Administrator ExampleNameWithAtLeastTwentyChars', password: adminPwd, address: 'Admin HQ', role: 'admin' } }),
    User.findOrCreate({ where: { email: 'owner@example.com' }, defaults: { name: 'Store Owner ExampleNameWithAtLeastTwentyChars', password: ownerPwd, address: 'Owner Address', role: 'owner' } })
  ]);
  const ownerRow = owner[0];
  await Store.findOrCreate({ where: { name: 'My Test Store' }, defaults: { email: 'store@example.com', address: '123 Market St', ownerId: ownerRow.id } });
  console.log('Seed done');
  process.exit(0);
})();
