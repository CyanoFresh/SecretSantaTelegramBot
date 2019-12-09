module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chat_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hash: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }).then(() => queryInterface.addIndex('Groups', ['chat_id'], {
      indicesType: 'UNIQUE',
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeIndex('Groups', ['chat_id'])
      .then(() => queryInterface.dropTable('Groups'));
  },
};
