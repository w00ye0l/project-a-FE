"use client";

import { useEffect, useState } from "react";
import style from "../admin.module.css";

interface SelectOption {
  key: string;
  value: string;
  label: string;
}

interface CommonSelectProps<T> {
  title: string;
  fetchData: () => Promise<{ data: T[] }>;
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  getValue: (item: T) => string;
}

export default function CommonSelect<T>({
  title,
  fetchData,
  getKey,
  getLabel,
  getValue,
}: CommonSelectProps<T>) {
  const [options, setOptions] = useState<SelectOption[]>([]);

  const getData = async () => {
    const result = await fetchData();
    const formattedOptions = result.data.map((item) => ({
      key: getKey(item),
      value: getValue(item),
      label: getLabel(item),
    }));
    setOptions(formattedOptions);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.infoContainer}>
      <p className={style.infoTitle}>{title}</p>

      <select className={style.select} name="" id="">
        {options.length !== 0 &&
          options.map((option) => (
            <option key={option.key} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
}
