interface CreateEntryInput {
  text: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  ttl: number;
  date: number; // optional
  submitter: string; // optional
  tags: Array<string>; // optional
}
