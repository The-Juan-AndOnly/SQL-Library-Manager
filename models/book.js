'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      title: {
        type: DataTypes.STRING,
        validate: { notEmpty: { msg: 'Title is Required' } }
      },
      author: {
        type: DataTypes.STRING,
        validate: { notEmpty: { msg: 'Author is Required' } }
      },
      genre: { type: DataTypes.STRING },
      year: {
        type: DataTypes.INTEGER,
        validate: { isInt: { msg: 'Year should be an Integer' } }
      }
    },
    {}
  );
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
