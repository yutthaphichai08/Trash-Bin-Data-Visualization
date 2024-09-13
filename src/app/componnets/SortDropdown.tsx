import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

interface SortDropdownProps {
  sortField: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string) => void;
}

export default function SortDropdown({
  sortField,
  sortOrder,
  onSort,
}: SortDropdownProps) {
  return (
    <DropdownButton className="mb-3" title="Sort By">
      <Dropdown.Item onClick={() => onSort("id")}>
        Bin ID (
        {sortField === "id"
          ? sortOrder === "asc"
            ? "Ascending"
            : "Descending"
          : "Sort"}
        )
      </Dropdown.Item>
      <Dropdown.Item onClick={() => onSort("fillLevel")}>
        Fill Level (
        {sortField === "fillLevel"
          ? sortOrder === "asc"
            ? "Ascending"
            : "Descending"
          : "Sort"}
        )
      </Dropdown.Item>
    </DropdownButton>
  );
}
