module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    chat_id: DataTypes.BIGINT,
    code: DataTypes.INTEGER,
    first_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50),
    username: DataTypes.STRING(50),
  }, {
    updatedAt: false,
  });
  User.associate = function(models) {

  };
  return User;
};
