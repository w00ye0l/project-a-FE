"use client";

import { createContext, useState } from "react";

export const CarDefaultContext = createContext({
  // 제조국가 이름
  countryName: "",
  setCountryName: (value: string) => {},

  // 브랜드 이름
  brandName: "",
  setBrandName: (value: string) => {},

  // 모델 이름
  modelName: "",
  setModelName: (value: string) => {},

  // 세부 모델 이름
  detailModelName: "",
  setDetailModelName: (value: string) => {},
});

export default function CarDefaultProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [countryName, setCountryName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [detailModelName, setDetailModelName] = useState("");

  return (
    <CarDefaultContext.Provider
      value={{
        countryName,
        setCountryName,
        brandName,
        setBrandName,
        modelName,
        setModelName,
        detailModelName,
        setDetailModelName,
      }}
    >
      {children}
    </CarDefaultContext.Provider>
  );
}
