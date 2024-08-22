export interface ModelInfo {
  brandName: string;
  modelList: [
    {
      modelName: string;
      detailModelList: [
        {
          detailModelName: string;
          detailModelSpec: {
            minCarPrice: number;
            minEngineDisplacement: number;
            maxEngineDisplacement: number;
            minFuelEfficiency: number;
            maxFuelEfficiency: number;
            fuelTypes: string[];
            carClass: string;
          };
          detailModelMainImage: string;
          detailModelNormalImages: string[];
        }
      ];
    }
  ];
}
