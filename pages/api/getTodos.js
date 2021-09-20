import { table, minifyRecords } from "./utils/Airtable";

export default async (req, res) => {
  try {
    const records = await table.select({}).firstPage();
    const minifiedRecords = minifyRecords(records);
    
    res.status(200).json(minifiedRecords)
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
}
