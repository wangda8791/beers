export interface Beer {
  id: string;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  volume: {
    value: number;
    unit: string;
  };
  method: {
    mash_temp: Array<{
      temp: {
        value: number;
        unit: string;
      };
      duration: number;
    }>;
    fermentation: {
      temp: {
        value: number;
        unit: string;
      };
      duration: number;
    };
    twist: string;
  };
  ingredients: {
    malt: Array<{
      name: string;
      amount: {
        value: number;
        unit: string;
      };
    }>;
    hops: Array<{
      name: string;
      amount: {
        value: number;
        unit: string;
      };
      add: string;
      attribute: string;
    }>;
    yeast: string;
  };
  food_paring: Array<string>;
  brewers_tips: string;
  contributed_by: string;
}

export interface IGetBeerPayload {
  page: number;
  perPage: number;
  searchkey?: string;
}
