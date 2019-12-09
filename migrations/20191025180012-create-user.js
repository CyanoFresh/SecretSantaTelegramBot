module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Users', {
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
        code: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        first_name: {
          type: Sequelize.STRING(50),
        },
        last_name: {
          type: Sequelize.STRING(50),
        },
        username: {
          type: Sequelize.STRING(50),
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
      await queryInterface.addIndex('Users', ['chat_id'], { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeIndex('Users', ['chat_id'], { transaction });
      await queryInterface.dropTable('Users');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
