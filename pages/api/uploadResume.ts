import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({ multiples: false });
  console.log(req.headers);

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to upload file" });
      return;
    }

    // @ts-ignore
    const oldPath = files.resume.path;
    // @ts-ignore
    const newPath = `./public/uploads/${files.resume.name}`;

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to move file" });
        return;
      }

      res.status(200).json({ success: true });
    });
  });
}
