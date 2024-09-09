export interface ModelInfo {
  brandName: string;
  detailModelName: string;
  detailModelMainImage: string;
  detailModelNormalImages: string[];
  detailModelColorImages: string[];
  detailModelSpec: {
    minCarPrice: number;
    minEngineDisplacement: number;
    maxEngineDisplacement: number;
    minFuelEfficiency: number;
    maxFuelEfficiency: number;
    fuelTypes: string[];
    carClass: string;
  };
}
