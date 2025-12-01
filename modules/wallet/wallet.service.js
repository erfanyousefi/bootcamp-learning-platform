const createHttpError = require("http-errors");
const sequelize = require("../../config/database");
const Transaction = require("../../models/transactions");
const Wallet = require("../../models/wallet");

async function deposit(userId, amount) {
  if (amount <= 10000) {
    throw createHttpError(
      400,
      "min amount should bigger than or equals 10,000"
    );
  }
  const t = await sequelize.transaction();
  try {
    let wallet = await Wallet.findOne({where: {userId}}, {transaction: t});
    if (!wallet) {
      wallet = await Wallet.create({userId, balance: 0}, {transaction: t});
    }
    wallet.balance = Number(wallet.balance) + amount;
    wallet.save({transaction: t});
    await Transaction.create(
      {
        walletId: wallet.dataValues.id,
        amount,
        type: "deposit",
        status: "success",
        description: "deposit amount to user waller",
      },
      {transaction: t}
    );
    await t.commit();
    return {
      message: "deposit done successfully",
    };
  } catch (error) {
    await t.rollback();
    throw createHttpError(500, error?.message);
  }
}
async function withdrawal(userId, amount) {
  if (amount <= 2000) {
    throw createHttpError(400, "min amount should bigger than or equals 2,000");
  }
  const t = await sequelize.transaction();
  try {
    let wallet = await Wallet.findOne({where: {userId}}, {transaction: t});
    if (!wallet) {
      throw createHttpError(400, "user wallet is empty");
    }
    if (amount > wallet.dataValues.balance) {
      throw createHttpError(
        400,
        "withdrawal amount should less or equals than wallet balance"
      );
    }
    wallet.balance = Number(wallet.balance) - amount;
    wallet.save({transaction: t});
    await Transaction.create(
      {
        walletId: wallet.dataValues.id,
        amount,
        type: "withdraw",
        status: "success",
        description: "withdraw amount on user waller",
      },
      {transaction: t}
    );
    await t.commit();
    return {
      message: "withdraw done successfully",
    };
  } catch (error) {
    await t.rollback();
    throw createHttpError(500, error?.message);
  }
}

module.exports = {
  deposit,
  withdrawal,
};
