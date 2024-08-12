"use client";

import style from "./agGrid.module.css";
import cx from "classnames";
import { AgGridReact } from "ag-grid-react";
import {
  CellValueChangedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
} from "ag-grid-community";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { getCountryList } from "../_lib/getCountryList";
import { getBrandList } from "../_lib/getBrandList";
import { getModelList } from "../_lib/getModelList";
import { getDetailModelList } from "../_lib/getDetailModelList";
import { getCarInfoList } from "../_lib/getCarInfoList";
import { CarDefaultContext } from "./CarDefaultProvider";
import { getBasicOptionDefineList } from "../_lib/getBasicOptionDefineList";
import { getCarBasicOptionList } from "../_lib/getCarBasicOptionList";
import { getCarColorOptionList } from "../_lib/getCarColorOptionList";
import { getCarChoiceOptionList } from "../_lib/getCarChoiceOptionList";
import { getCarSpecList } from "../_lib/getCarSpecList";

export default function AGGrid({ data }: { data: any }) {
  const { countryName, brandName, modelName } = useContext(CarDefaultContext);
  // 그리드 API
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  // 그리드용 데이터
  const [rowData, setRowData] = useState<any[]>([]);

  // 그리드 기본 설정
  const defaultColDef: ColDef = useMemo(() => {
    return {
      resizable: true,
      sortable: true,
      filter: true,
    };
  }, []);

  // 그리드가 준비되면 호출
  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  // [DB] 데이터 생성 및 수정
  const postUploadRowData = async (url: string, rowData: any[]) => {
    console.log({ rowData });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/car${url}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rowData),
      }
    );

    const result = await response.json();

    console.log({ result });
  };

  // [DB] 데이터 삭제
  const deleteUploadRowData = async (
    url: string,
    pk: string,
    rowData: any[]
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/car${url}/${pk}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rowData),
      }
    );

    const result = await response.json();

    console.log({ result });
  };

  // [DB] 업로드
  const getRowData = () => {
    const addRowData: any[] = [];
    const updateRowData: any[] = [];
    const deleteRowData: any[] = [];
    let url = "";
    let pk = "";

    if (data.tab === "country") {
      url = "/country";
      pk = "countryPk";
    } else if (data.tab === "brand") {
      url = "/brand";
      pk = "brandPk";
    } else if (data.tab === "model") {
      url = "/model";
      pk = "modelPk";
    } else if (data.tab === "detailModel") {
      url = "/detail-model";
      pk = "detailModelPk";
    } else if (data.tab === "basicOption") {
      url = "/basic-option-define";
      pk = "basicOptionDefinePk";
    } else if (data.tab === "carInfo") {
      url = "";
      pk = "carPk";
    } else if (data.tab === "carSpec") {
      url = "/spec";
      pk = "carSpecPk";
    } else if (data.tab === "carBasicOption") {
      url = "/basic-option";
      pk = "basicOptionPk";
    } else if (data.tab === "carChoiceOption") {
      url = "/choice-option";
      pk = "choiceOptionPk";
    } else if (data.tab === "carColorOption") {
      url = "/color-option";
      pk = "colorOptionPk";
    }

    gridApi?.forEachNode((node) => {
      const filteredData = Object.fromEntries(
        Object.entries(node.data).filter(([key]) => key !== "flag")
      );

      // flag를 제외한 node.data를 넣어줘야 함
      if (node.data.flag === "추가") {
        addRowData.push(filteredData);
      } else if (node.data.flag === "수정") {
        // flag를 제외한 node.data를 넣어줘야 함
        updateRowData.push(filteredData);
      } else if (node.data.flag === "삭제") {
        deleteRowData.push(filteredData);
      }
    });

    if (addRowData.length + updateRowData.length + deleteRowData.length !== 0) {
      const dbUploadConfirm = confirm(
        `추가 ${addRowData.length} 건\n수정 ${updateRowData.length} 건\n삭제 ${deleteRowData.length} 건\n업로드 하시겠습니까?`
      );

      if (dbUploadConfirm) {
        console.log({ addRowData, updateRowData, deleteRowData });

        for (const row of addRowData) {
          postUploadRowData(url, row);
        }

        for (const row of updateRowData) {
          postUploadRowData(url, row);
        }

        for (const row of deleteRowData) {
          const pkValue = row[pk];
          deleteUploadRowData(url, pkValue, row);
        }

        location.reload();
      }
    }
  };

  // [GRID] flag에 '추가'를 넣은 행 데이터 추가
  const addRowData = () => {
    const newRowData: any = { ...data.IRow, flag: "추가" };

    setRowData((prevRowData) => [...prevRowData, newRowData]);

    // DOM 업데이트 후 스크롤 원위치
    setTimeout(() => {
      const rowCount = gridApi?.getDisplayedRowCount();
      if (rowCount !== undefined) {
        gridApi?.ensureIndexVisible(rowCount - 1, "bottom");
      }
    }, 100);
  };

  // [GRID] 선택된 행 삭제
  const deleteRowData = () => {
    const selectedNodes = gridApi?.getSelectedNodes();
    const deletedNodeIndexes = selectedNodes?.map((node) => node.rowIndex);

    // flag를 '삭제'로 변경
    setRowData((prevRowData) => {
      return prevRowData.map((row) => {
        if (selectedNodes?.find((node) => node.data === row)) {
          return { ...row, flag: "삭제" };
        }
        return row;
      });
    });

    // DOM 업데이트 후 스크롤 원위치
    setTimeout(() => {
      if (deletedNodeIndexes && deletedNodeIndexes.length > 0) {
        gridApi?.ensureIndexVisible(deletedNodeIndexes[0]!, "middle");
      }
    }, 100);
  };

  // [GRID] 셀 데이터가 변경될 경우
  const onCellValueChanged = (event: CellValueChangedEvent) => {
    // flag를 '수정'으로 변경
    setRowData((prevRowData) => {
      return prevRowData.map((row) => {
        if (row === event.data && row.flag !== "추가") {
          return { ...row, flag: "수정" };
        }
        return row;
      });
    });

    // DOM 업데이트 후 스크롤 원위치
    setTimeout(() => {
      gridApi?.ensureIndexVisible(event.rowIndex!, "middle");
    }, 100);
  };

  // 탭에 따른 데이터 호출
  const fetchData = async () => {
    let result;

    switch (data.tab) {
      // 기본 옵션 관리
      case "country":
        result = await getCountryList();
        break;
      case "brand":
        result = await getBrandList({ countryName: "" });
        break;
      case "model":
        result = await getModelList({ brandName: "" });
        break;
      case "detailModel":
        result = await getDetailModelList({ modelName: "" });
        break;
      case "basicOption":
        result = await getBasicOptionDefineList();
        break;

      // 차량 데이터 관리
      case "carInfo":
        result = await getCarInfoList();
        break;
      case "carBasicOption":
        result = await getCarBasicOptionList();
        break;
      case "carSpec":
        result = await getCarSpecList({ carPk: "" });
        break;
      case "carChoiceOption":
        result = await getCarChoiceOptionList({ carPk: "" });
        break;
      case "carColorOption":
        result = await getCarColorOptionList({ carPk: "" });
        break;
      default:
        result = { data: [] };
    }
    setRowData(result.data);
  };

  // 탭이 변경될 때 데이터 갱신
  useEffect(() => {
    fetchData();
  }, [data.tab]);

  // 제조국이 변경될 때 브랜드 리스트 갱신
  useEffect(() => {
    if (data.tab === "brand") {
      const fetchBrandList = async () => {
        const result = await getBrandList({ countryName });
        setRowData(result.data);
      };
      fetchBrandList();
    }
  }, [countryName]);

  // 브랜드가 변경될 때 모델 리스트 갱신
  useEffect(() => {
    if (data.tab === "model") {
      const fetchModelList = async () => {
        const result = await getModelList({ brandName });
        setRowData(result.data);
      };
      fetchModelList();
    }
  }, [brandName]);

  // 모델이 변경될 때 디테일 모델 리스트 갱신
  useEffect(() => {
    if (data.tab === "detailModel") {
      const fetchDetailModelList = async () => {
        const result = await getDetailModelList({ modelName });
        setRowData(result.data);
      };
      fetchDetailModelList();
    }
  }, [modelName]);

  return (
    <div
      className={cx("ag-theme-quartz", style.grid)}
      style={{ height: "100%", width: "100%" }}
    >
      <div className={style.gridHeader}>
        <div className={style.gridButtonContainer}>
          <button className={style.button} onClick={deleteRowData}>
            데이터 삭제
          </button>
          <button className={style.button} onClick={addRowData}>
            데이터 추가
          </button>
          <button
            onClick={getRowData}
            className={cx(style.button, style.dbUpload)}
          >
            DB 업로드
          </button>
        </div>
      </div>

      <AgGridReact
        rowData={rowData}
        columnDefs={data.colData}
        defaultColDef={defaultColDef}
        rowSelection={"multiple"}
        onGridReady={onGridReady}
        onCellValueChanged={onCellValueChanged}
      />
    </div>
  );
}
