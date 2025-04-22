import multer from "multer";
import {v4} from "uuid";
import { Express, Request } from "express";
import { FileFilterCallback } from "multer";
const extMap = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};
type DestinationCallback = (error: Error | null, destination: string) => void

const fileFilter = (req:Request, file:Express.Multer.File, cb:DestinationCallback) => {
  cb(null, !!extMap[file.mimetype] as any );
};
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const f = v4() + extMap[file.mimetype];
    cb(null, f);
  },
});
export default multer({fileFilter,storage});