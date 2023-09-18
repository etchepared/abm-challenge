const { Router } = require("express");
const { Movement, Type } = require("../db");
const axios = require("axios");
const router = Router();
const { Sequalize, Op } = require("sequelize");

router.get("/allMovements", async (req, res, next) => {
  try {
    const movements = await Movement.findAll({
      order: [["date", "DESC"]],
    });
    return res.status(200).json(movements);
  } catch (error) {
    next(error);
  }
});

router.get("/tenMovements", async (req, res, next) => {
  try {
    const movements = await Movement.findAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    return res.status(200).json(movements);
  } catch (error) {
    next(error);
  }
});

router.get("/balance", async (req, res, next) => {
  try {
    const incomes = await Movement.findAll({
      where: {
        type: "income",
      },
    });

    const incomesValue = 0;
    const incomesSum = incomes
      .map((i) => i.amount)
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        incomesValue
      );

    const expenses = await Movement.findAll({
      where: {
        type: "expense",
      },
    });

    const expensesValue = 0;
    const expensesSum = expenses
      .map((i) => i.amount)
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        expensesValue
      );

    const balanceSum = incomesSum - expensesSum;

    res.status(200).json(balanceSum);
  } catch (error) {
    next(error);
  }
});

router.post("/movements/create", async (req, res, next) => {
  try {
    const { concept, amount, date, type } = req.body;

    const createMovement = await Movement.create({
      concept,
      amount,
      date,
      type,
    });

    return res.status(201).send("Movimiento creado.");
  } catch (error) {
    res.status(400).send("No se pudo crear el movimiento.");
  }
});

router.put("/movements/edit", async (req, res, next) => {
  try {
    //const id = req.params.id;
    const { concept, amount, date, id } = req.body;

    await Movement.update(
      { concept, amount, date },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send("Movimiento actualizado.");
  } catch (error) {
    res.status(400).send("No se pudo actualizar el movimiento.");
  }
});

router.delete("/movements/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Movement.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Movimiento eliminado.");
  } catch (error) {
    res.status(400).send("No se pudo eliminar el movimiento.");
  }
});

module.exports = router;
