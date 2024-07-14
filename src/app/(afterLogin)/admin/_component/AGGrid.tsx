"use client";

import { AgGridReact } from "ag-grid-react";
import {
  CellValueChangedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellEditorParams,
  ICellRendererParams,
} from "ag-grid-community";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import style from "./agGrid.module.css";
import cx from "classnames";

// Row Data Interface: Defines the structure of the data to be displayed.
interface IRow {
  country: string;
  make: string;
  model: string;
  price: number;
  electric: string | null; // "Y" | "N" | null;
  color: string;
}

// Common Radio Button Group component
const RadioButtonGroup = ({
  value,
  name,
  onChange,
}: {
  value: string | null;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className={style.radioButtonGroup}>
    <label
      className={cx(style.radioButton, value === "N" ? style.selected : "")}
    >
      <input
        type="radio"
        name={name}
        value="N"
        checked={value === "N"}
        onChange={onChange}
        readOnly={!onChange}
      />
      X
    </label>
    <label
      className={cx(style.radioButton, value === "Y" ? style.selected : "")}
    >
      <input
        type="radio"
        name={name}
        value="Y"
        checked={value === "Y"}
        onChange={onChange}
        readOnly={!onChange}
      />
      O
    </label>
    <label
      className={cx(style.radioButton, value === null ? style.selected : "")}
    >
      <input
        type="radio"
        name={name}
        value=""
        checked={value === null}
        onChange={onChange}
        readOnly={!onChange}
      />
      선택
    </label>
  </div>
);

// Custom cell renderer for radio buttons
const RadioButtonCellRenderer = (params: ICellRendererParams) => {
  useEffect(() => {
    params.api.refreshCells({ rowNodes: [params.node] });
  }, [params.api, params.node, params.value]);

  return (
    <RadioButtonGroup
      value={params.value}
      name={`electric-${params.node.id}`}
    />
  );
};

// Custom cell editor for radio buttons
const RadioButtonCellEditor = forwardRef((params: ICellEditorParams, ref) => {
  const [value, setValue] = useState<string | null>(params.value);

  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === "" ? null : event.target.value;
    setValue(newValue);
    params.node.setDataValue(params.column.getColId(), newValue);
    params.stopEditing();
  };

  return (
    <RadioButtonGroup value={value} name="electric" onChange={handleChange} />
  );
});

// 디스플레이 이름 추가
RadioButtonCellRenderer.displayName = "RadioButtonCellRenderer";
RadioButtonCellEditor.displayName = "RadioButtonCellEditor";

export default function AGGrid() {
  // const gridRef = useRef<AgGridReact<IRow[]>>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<IRow[]>([
    {
      country: "미국",
      make: "Tesla",
      model: "Model Y",
      price: 64950,
      electric: "Y",
      color: "Red",
    },
    {
      country: "미국",
      make: "Ford",
      model: "F-Series",
      price: 33850,
      electric: "N",
      color: "Blue",
    },
    {
      country: "일본",
      make: "Toyota",
      model: "Corolla",
      price: 29600,
      electric: null,
      color: "Green",
    },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      field: "country",
      headerName: "국가",
      editable: true,
      width: 120,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    {
      field: "make",
      headerName: "브랜드",
      editable: true,
      width: 120,
    },
    { field: "model", headerName: "모델", editable: true },
    { field: "price", headerName: "가격", editable: true, width: 140 },
    {
      field: "electric",
      headerName: "전기여부",
      cellRenderer: RadioButtonCellRenderer,
      cellEditor: RadioButtonCellEditor,
      editable: true,
      width: 120,
      valueGetter: (params) => params.data.electric,
      valueSetter: (params) => {
        const newValue = params.newValue === "" ? null : params.newValue;
        const updatedData = params.data;
        updatedData.electric = newValue;
        setRowData((prevData) =>
          prevData.map((row) =>
            row === params.data ? { ...row, electric: newValue } : row
          )
        );
        return true;
      },
    },
    { field: "color", headerName: "색상", editable: true, width: 100 },
  ]);

  // Default Column Definitions: Defines the default column settings.
  const defaultColDef: ColDef = useMemo(() => {
    return {
      resizable: true,
      sortable: true,
      filter: true,
    };
  }, []);

  // Grid Ready Event: Called when the grid is ready.
  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  // Get Row Data: Logs the row data to the console.
  const getRowData = () => {
    const rowData: IRow[] = [];

    gridApi?.forEachNode((node) => rowData.push(node.data));
    console.log({ rowData });

    return rowData;
  };

  // Add Row Data: Adds a new row to the grid.
  const addRowData = () => {
    const newRowData: IRow = {
      country: "",
      make: "",
      model: "",
      price: 0,
      electric: "",
      color: "",
    };

    setRowData((prevRowData) => [...prevRowData, newRowData]);

    gridApi?.applyTransaction({
      add: [newRowData],
    });
  };

  const deleteRowData = () => {
    const selectedNodes = gridApi?.getSelectedNodes();

    if (selectedNodes) {
      selectedNodes.forEach((node) => {
        gridApi?.applyTransaction({ remove: [node.data] });
      });
    }
  };

  // Cell Value Changed Event: Called when a cell value is changed.
  const onCellValueChanged = (event: CellValueChangedEvent) => {
    // console.log(event);
    console.log("Cell value changed", event.oldValue, event.newValue);
  };

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: "100%", width: "100%" }}
    >
      <button onClick={getRowData}>데이터 확인</button>
      <button onClick={addRowData}>데이터 추가</button>
      <button onClick={deleteRowData}>데이터 삭제</button>

      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowSelection={"multiple"}
        onGridReady={onGridReady}
        onCellValueChanged={onCellValueChanged}
      />
    </div>
  );
}
