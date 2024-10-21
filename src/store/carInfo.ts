import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CarInfoState {
  modelInfo: {
    detailModelName: string;
    detailModelMainImage: string;
    detailModelNormalImages: string[];
    detailModelColorImages: string[];
  };
  modelSpec: {
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
  setModelInfo: (model: {
    detailModelName: string;
    detailModelMainImage: string;
    detailModelNormalImages: string[];
    detailModelColorImages: string[];
  }) => void;
  setModelSpec: (spec: {
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
  }) => void;
  reset: () => void;
}

export const useCarInfoStore = create(
  persist<CarInfoState>(
    (set) => ({
      modelInfo: {
        detailModelName: "",
        detailModelMainImage: "",
        detailModelNormalImages: [],
        detailModelColorImages: [],
      },
      modelSpec: {
        carClass: "",
        fuelTypes: [],
        maxDiscountPercent: 0,
        minCarPrice: 0,
        maxCarPrice: 0,
        minEngineDisplacement: 0,
        maxEngineDisplacement: 0,
        minFuelEfficiency: 0,
        maxFuelEfficiency: 0,
        priority: 0,
      },
      setModelInfo: (model: {
        detailModelName: string;
        detailModelMainImage: string;
        detailModelNormalImages: string[];
        detailModelColorImages: string[];
      }) => set({ modelInfo: model }),
      setModelSpec: (spec: {
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
      }) => set({ modelSpec: spec }),
      reset: () =>
        set({
          modelInfo: {
            detailModelName: "",
            detailModelMainImage: "",
            detailModelNormalImages: [],
            detailModelColorImages: [],
          },
          modelSpec: {
            carClass: "",
            fuelTypes: [],
            maxDiscountPercent: 0,
            minCarPrice: 0,
            maxCarPrice: 0,
            minEngineDisplacement: 0,
            maxEngineDisplacement: 0,
            minFuelEfficiency: 0,
            maxFuelEfficiency: 0,
            priority: 0,
          },
        }),
    }),
    {
      name: "carInfo",
    }
  )
);
