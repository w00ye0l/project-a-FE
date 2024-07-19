"use client";

import { ICellEditorParams, ICellRendererParams } from "ag-grid-community";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import RadioButtonGroup from "./RadioButtonGroup";

// Custom cell renderer for radio buttons
export const RadioButtonCellRenderer = (params: ICellRendererParams) => {
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
export const RadioButtonCellEditor = forwardRef(
  (params: ICellEditorParams, ref) => {
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
  }
);

// 디스플레이 이름 추가
RadioButtonCellRenderer.displayName = "RadioButtonCellRenderer";
RadioButtonCellEditor.displayName = "RadioButtonCellEditor";
