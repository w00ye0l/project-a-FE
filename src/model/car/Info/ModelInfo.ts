export interface ModelInfo {
  brandName: string;
  detailModelPk: string;
  detailModelName: string;
  detailModelMainImage: string;
  detailModelNormalImages: string[];
  detailModelColorImages: string[];
  detailModelSpec: {
    carClass: string;
    fuelTypes: string[];
    maxDiscountPercent: number;
    minCarPrice: number;
    maxCarPrice: number;
    minEngineDisplacement: number;
    maxEngineDisplacement: number;
    minFuelEfficiency: number;
    maxFuelEfficiency: number;
    priority: number;
  };
}
