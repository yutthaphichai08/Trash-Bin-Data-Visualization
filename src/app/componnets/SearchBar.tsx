import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search by location"
        value={value}
        onChange={onChange}
      />
    </InputGroup>
  );
}
