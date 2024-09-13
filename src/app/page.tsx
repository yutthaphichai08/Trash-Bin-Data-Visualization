"use client";

import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TrashBin {
  id: string;
  location: string;
  fillLevel: number;
}

export default function Home() {
  const [bins, setBins] = useState<TrashBin[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // สำหรับการค้นหา
  const [sortField, setSortField] = useState<string>(""); // สำหรับการเรียงลำดับ
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // จำนวนรายการต่อหน้า

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://66e3e267d2405277ed122ca4.mockapi.io/trash-bins"
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: TrashBin[] = await res.json();
      setBins(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ฟังก์ชันการกรอง
  const filteredBins = bins.filter((bin) =>
    bin.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ฟังก์ชันการเรียงลำดับ
  const sortedBins = filteredBins.sort((a, b) => {
    if (sortField === "id") {
      return sortOrder === "asc"
        ? a.id.localeCompare(b.id)
        : b.id.localeCompare(a.id);
    }
    if (sortField === "fillLevel") {
      return sortOrder === "asc"
        ? a.fillLevel - b.fillLevel
        : b.fillLevel - a.fillLevel;
    }
    return 0;
  });

  // Pagination calculations
  const totalItems = sortedBins.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = sortedBins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      // สลับระหว่าง "asc" และ "desc" ถ้าเลือกฟิลด์เดิม
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // ตั้งค่าเป็นฟิลด์ใหม่และเรียงลำดับเป็น "asc"
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Pagination controls
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      {/* แผนภูมิ */}
      <div className="my-4">
        <h3>Trash Bin Fill Levels</h3>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={sortedBins}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="location" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="fillLevel">
              {sortedBins.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fillLevel > 80000 ? "#ff0000" : "#8884d8"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
      </div>

      <h2 className="my-4">Trash Bins List</h2>

      {/* ค้นหาสำหรับกรอง */}
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* ปุ่มดรอปดาวน์สำหรับเรียงลำดับ */}
      <DropdownButton className="mb-3" title="Sort By">
        <Dropdown.Item onClick={() => handleSort("id")}>
          Bin ID (
          {sortField === "id"
            ? sortOrder === "asc"
              ? "Ascending"
              : "Descending"
            : "Sort"}
          )
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort("fillLevel")}>
          Fill Level (
          {sortField === "fillLevel"
            ? sortOrder === "asc"
              ? "Ascending"
              : "Descending"
            : "Sort"}
          )
        </Dropdown.Item>
      </DropdownButton>

      {/* ตารางข้อมูลถังขยะ */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Location</th>
            <th>Fill Level</th>
            <th>Bin ID</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((bin) => (
            <tr
              key={bin.id}
              className={bin.fillLevel >= 80000 ? "table-danger" : ""}
            >
              <td>{bin.location}</td>
              <td>{bin.fillLevel}%</td>
              <td>{bin.id}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="d-flex justify-content-center my-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
}
