"use client";

import { createContext, useEffect, useState } from "react";

export const NavContext = createContext({
  mainTab: "carDefault",
  setMainTab: (value: "carDefault" | "carAddition") => {},
  subTab: "",
  setSubTab: (tab: string) => {},
});

export default function NavProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mainTab, setMainTab] = useState("carDefault");
  const [subTab, setSubTab] = useState("");

  useEffect(() => {
    // mainTab이 변경될 때 subTab의 기본값 설정
    switch (mainTab) {
      case "carDefault":
        setSubTab("country");
        break;
      case "carAddition":
        setSubTab("carSpec");
        break;
      default:
        setSubTab("defaultSubTab");
        break;
    }
  }, [mainTab]);

  return (
    <NavContext.Provider value={{ mainTab, setMainTab, subTab, setSubTab }}>
      {children}
    </NavContext.Provider>
  );
}
