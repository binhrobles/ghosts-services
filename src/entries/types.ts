export interface Entry {
  id: string;
  text: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface EntryFeature {
  type: 'Feature';
  properties: {
    id: string;
  };
  geometry: {
    type: 'Point';
    coordinates: number[]; // [lng, lat]
  };
}

export interface EntriesGeoJSON {
  type: string;
  features: EntryFeature[];
}
