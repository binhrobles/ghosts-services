import { TTLOptions } from './enums';

interface CreateEntryInput {
  text: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  ttl: TTLOptions;
  date: number; // optional
  submitter: string; // optional
  tags: Array<string>; // optional
}
