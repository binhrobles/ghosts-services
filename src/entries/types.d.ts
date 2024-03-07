interface Entry {
  id: string;
  text: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface DBEntry extends Entry {
  createTime: number;
}

interface EntryFeature {
  type: 'Feature';
  properties: {
    id: string;
  };
  geometry: {
    type: 'Point';
    coordinates: number[]; // [lng, lat]
  };
}

interface EntriesGeoJSON {
  type: string;
  features: EntryFeature[];
}
