import Nedb from "nedb/browser-version/out/nedb.min";
import { NedbStorage } from "./NedbStorage";

const tracksDb = new Nedb({ filename: 'tracks.nedb', autoload: true });
export const tracksStorage = new NedbStorage(tracksDb)
