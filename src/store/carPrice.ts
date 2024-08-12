import { BasicOption } from "@/model/car/Info/BasicOption";
import { CarSpec } from "@/model/car/Info/CarSpec";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CarPriceState {
  defaultPrice: number;
  selectedBrand: string;
  selectedDetailModel: string;
  selectedCarInfo: {
    carYear: string;
    engineInfo: string;
    trimName: string;
  };
  selectedExteriorColor: {
    pk: string;
    name: string;
    codes: string[];
    price: number;
  };
  selectedInteriorColor: {
    pk: string;
    name: string;
    codes: string[];
    price: number;
  };
  selectedOptions: { pk: string; name: string; price: number }[];
  selectedCarSpec: CarSpec;
  selectedCarBasicOption: BasicOption;
  setDefaultPrice: (price: number) => void;
  setSelectedBrand: (brand: string) => void;
  setSelectedDetailModel: (model: string) => void;
  setSelectedCarInfo: (info: {
    carYear: string;
    engineInfo: string;
    trimName: string;
  }) => void;
  setSelectedExteriorColor: (color: {
    pk: string;
    name: string;
    codes: string[];
    price: number;
  }) => void;
  setSelectedInteriorColor: (color: {
    pk: string;
    name: string;
    codes: string[];
    price: number;
  }) => void;
  setSelectedOptions: (
    options: { pk: string; name: string; price: number }[]
  ) => void;
  setSelectedCarSpec: (carSpec: CarSpec) => void;
  setSelectedCarBasicOption: (basicOption: BasicOption) => void;
  reset: () => void;
}

export const useCarPriceStore = create(
  persist<CarPriceState>(
    (set) => ({
      defaultPrice: 0,
      selectedBrand: "",
      selectedDetailModel: "",
      selectedCarInfo: {
        detailModelName: "",
        carYear: "",
        engineInfo: "",
        trimName: "",
      },
      selectedExteriorColor: { pk: "", name: "", codes: [], price: 0 },
      selectedInteriorColor: { pk: "", name: "", codes: [], price: 0 },
      selectedOptions: [],
      selectedCarSpec: {} as CarSpec,
      selectedCarBasicOption: {} as BasicOption,
      setDefaultPrice: (price: number) => set({ defaultPrice: price }),
      setSelectedBrand: (brand: string) => set({ selectedBrand: brand }),
      setSelectedDetailModel: (model: string) =>
        set({ selectedDetailModel: model }),
      setSelectedCarInfo: (info: {
        carYear: string;
        engineInfo: string;
        trimName: string;
      }) => set({ selectedCarInfo: info }),
      setSelectedExteriorColor: (color: {
        pk: string;
        name: string;
        codes: string[];
        price: number;
      }) => set({ selectedExteriorColor: color }),
      setSelectedInteriorColor: (color: {
        pk: string;
        name: string;
        codes: string[];
        price: number;
      }) => set({ selectedInteriorColor: color }),
      setSelectedOptions: (
        options: { pk: string; name: string; price: number }[]
      ) => set({ selectedOptions: options }),
      setSelectedCarSpec: (carSpec: CarSpec) =>
        set({ selectedCarSpec: carSpec }),
      setSelectedCarBasicOption: (basicOption: BasicOption) =>
        set({ selectedCarBasicOption: basicOption }),
      reset() {
        set({
          defaultPrice: 0,
          selectedExteriorColor: { pk: "", name: "", codes: [], price: 0 },
          selectedInteriorColor: { pk: "", name: "", codes: [], price: 0 },
          selectedOptions: [],
          selectedCarSpec: {} as CarSpec,
          selectedCarBasicOption: {} as BasicOption,
        });
      },
    }),
    {
      name: "carPrice",
    }
  )
);
