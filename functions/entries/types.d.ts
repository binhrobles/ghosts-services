import { TTLOptions } from './enums';

interface CreateEntryInput {
  text: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  ttl: TTLOptions;
  date: string; // optional
  submitter: string; // optional
  tags: Array<string>; // optional
}
