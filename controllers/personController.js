const persons = require('../db/db'); 
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllPerson = catchAsync(async (req, res, next) => {
    if (!Array.isArray(persons)) {
        return next(new AppError('Persons data is not an array', 500));
    }

    res.status(200).json({
        status: 'success',
        results: persons.length,
        data: {
            persons, 
        },
    });
});


exports.getPerson = catchAsync(async (req, res, next) => {
  const person = persons.find((p) => p.id === req.params.id);

  if (!person) {
    return next(new AppError("No person found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      person,
    },
  });
});

exports.createPerson = catchAsync(async (req, res, next) => {
  const newPerson = {
    id: (persons.length + 1).toString(),
    name: req.body.name,
    age: req.body.age,
    hobbies: req.body.hobbies || [],
  };

  persons.push(newPerson);

  res.status(201).json({
    status: "success",
    data: {
      person: newPerson,
    },
  });
});

exports.updatePerson = catchAsync(async (req, res, next) => {
  const person = persons.find((p) => p.id === req.params.id);

  if (!person) {
    return next(new AppError("No person found with that ID", 404));
  }
  person.name = req.body.name || person.name;
  person.age = req.body.age || person.age;
  person.hobbies = req.body.hobbies || person.hobbies;

  res.status(200).json({
    status: "success",
    data: {
      person,
    },
  });
});

exports.deletePerson = catchAsync(async (req, res, next) => {
  const personIndex = persons.findIndex((p) => p.id === req.params.id);

  if (personIndex === -1) {
    return next(new AppError("No person found with that ID", 404));
  }

  persons.splice(personIndex, 1);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
