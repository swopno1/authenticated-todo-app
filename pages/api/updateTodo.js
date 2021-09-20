import { table, getMinifiedRecord } from "./utils/Airtable";

export default async (req, res) => {
  const { id, fields } = req.body;
  
  try {
    const updatedRecords = await table.update([{ id, fields }]);
    
    res.status(200).json(getMinifiedRecord(updatedRecords[0]))
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
}