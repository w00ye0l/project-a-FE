"use client";

import { useContext, useEffect, useState } from "react";
import style from "./carDefaultOption.module.css";
import { Country } from "@/model/car/Country";
import { Brand } from "@/model/car/Brand";
import { getCountryList } from "../_lib/getCountryList";
import { getBrandList } from "../_lib/getBrandList";
import { CarDefaultContext } from "./CarDefaultProvider";
import { Model } from "@/model/car/Model";
import { getModelList } from "../_lib/getModelList";
import { DetailModel } from "@/model/car/DetailModel";
import { getDetailModelList } from "../_lib/getDetailModelList";
import { useSearchParams } from "next/navigation";
import { getBasicOptionDefineList } from "../_lib/getBasicOptionDefineList";
import { BasicOptionDefine } from "@/model/car/BasicOptionDefine";

export default function CarDefaultOption() {
  const {
    countryName,
    setCountryName,
    brandName,
    setBrandName,
    modelName,
    setModelName,
    detailModelName,
    setDetailModelName,
  } = useContext(CarDefaultContext);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [modelList, setModelList] = useState<Model[]>([]);
  const [detailModelList, setDetailModelList] = useState<DetailModel[]>([]);
  const [basicOptionDefineList, setBasicOptionDefineList] = useState<
    BasicOptionDefine[]
  >([]);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const getCountryListData = async () => {
    const result = await getCountryList();

    setCountryList(result.data);
  };

  const getBrandListData = async () => {
    const result = await getBrandList({ countryName });

    setBrandList(result.data);
  };

  const getModelListData = async () => {
    const result = await getModelList({ brandName });

    setModelList(result.data);
  };

  const getDetailModelListData = async () => {
    const result = await getDetailModelList({ modelName });

    setDetailModelList(result.data);
  };

  const getBasicOptionDefineListData = async () => {
    const result = await getBasicOptionDefineList();

    setBasicOptionDefineList(result.data);
  };

  useEffect(() => {
    getCountryListData();
    getBrandListData();
    getModelListData();
    getDetailModelListData();
    getBasicOptionDefineListData();
  }, []);

  useEffect(() => {
    if (countryName) {
      getBrandListData();
    }

    if (brandName) {
      getModelListData();
    }

    if (modelName) {
      getDetailModelListData();
    }
  }, [countryName, brandName, modelName]);

  useEffect(() => {
    setBrandName("");
    setModelName("");
    setDetailModelName("");
  }, [countryName]);

  useEffect(() => {
    setModelName("");
    setDetailModelName("");
  }, [brandName]);

  useEffect(() => {
    setDetailModelName("");
  }, [modelName]);

  return (
    <div className={style.infoSection}>
      <div className={style.codeContainer}>
        <p className={style.codeTitle}>차량 코드</p>
        <input
          type="text"
          className={style.codeInput}
          placeholder="차량 코드를 입력하세요."
        />
      </div>

      {tab !== "country" && (
        <>
          <div className={style.infoContainer}>
            <p className={style.infoTitle}>제조국가</p>
            <select
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              className={style.select}
              name=""
              id=""
            >
              <option value="">전체</option>
              {countryList &&
                countryList.length !== 0 &&
                countryList.map((country) => (
                  <option key={country.countryPk} value={country.countryName}>
                    {country.countryName}
                  </option>
                ))}
            </select>
          </div>
          {tab !== "brand" && (
            <>
              <div className={style.infoContainer}>
                <p className={style.infoTitle}>브랜드</p>
                <select
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className={style.select}
                  name=""
                  id=""
                >
                  <option value="">전체</option>
                  {brandList &&
                    brandList.length !== 0 &&
                    brandList.map((brand) => (
                      <option key={brand.brandPk} value={brand.brandName}>
                        {brand.brandName}
                      </option>
                    ))}
                </select>
              </div>
              {tab !== "model" && (
                <>
                  <div className={style.infoContainer}>
                    <p className={style.infoTitle}>모델</p>
                    <select
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                      className={style.select}
                      name=""
                      id=""
                    >
                      <option value="">전체</option>
                      {modelList &&
                        modelList.length !== 0 &&
                        modelList.map((model) => (
                          <option key={model.modelPk} value={model.modelName}>
                            {model.modelName}
                          </option>
                        ))}
                    </select>
                  </div>

                  {tab !== "detailModel" && (
                    <div className={style.infoContainer}>
                      <p className={style.infoTitle}>세부 모델</p>
                      <select
                        value={detailModelName}
                        onChange={(e) => setDetailModelName(e.target.value)}
                        className={style.select}
                        name=""
                        id=""
                      >
                        <option value="">전체</option>
                        {detailModelList &&
                          detailModelList.length !== 0 &&
                          detailModelList.map((detailModel) => (
                            <option
                              key={detailModel.detailModelPk}
                              value={detailModel.detailModelName}
                            >
                              {detailModel.detailModelName}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
