import { Entry, DBEntry } from '../types.d';
import { TTLOptions } from '../enums';

const getTTLSeconds = (numDays: number) => {
  const today = new Date();
  return Math.floor(today.setDate(today.getDate() + numDays) / 1000);
};

export const mapCreateEntryToItem = (entry: Entry): DBEntry => {
  const createTime = Date.now();
  const ttl = entry.ttl === TTLOptions.NEVER ? null : getTTLSeconds(entry.ttl);

  return {
    ...entry,
    createTime,
    ttl,
  };
};
