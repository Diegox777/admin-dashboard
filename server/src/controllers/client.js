import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import getCountryIso3 from 'country-iso-2-to-3';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('productStats');
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'user' }).select('-password');
    await new Promise(resolve => setTimeout(resolve, 10000));
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });    
  }
}

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, size = 20, sort = null, search = '' } = req.query;

    const sortFormatted = getSort(sort);

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, 'i')}},
        { userId: { $regex: new RegExp(search, 'i')}}        
      ]
    })
    .sort(sortFormatted)
    .skip(page * size)
    .limit(size);

    const total = await Transaction.countDocuments({
      $or: [
        { cost: { $regex: new RegExp(search, 'i')}},
        { userId: { $regex: new RegExp(search, 'i')}}        
      ]
    });

    res.status(200).json({
      transactions,
      total
    });    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
      return { id: country, value: count }
    });
    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getSort = sort => {
  if (sort === null) {
    return {};
  }
  const sortParsed = JSON.parse(sort);
  const sortFormatted = {
    [sortParsed.field]: sortParsed.sort === 'asc' ? 1 : -1
  }
  return sortFormatted;
}
