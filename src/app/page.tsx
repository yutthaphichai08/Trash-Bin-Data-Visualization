"use client";

import { useEffect, useState } from "react";
import ChartComponent from "./componnets/ChartComponent";
import PaginationControls from "./componnets/Pagination";
import SearchBar from "./componnets/SearchBar";
import SortDropdown from "./componnets/SortDropdown";
import TableComponent from "./componnets/TableComponent";
import MapComponent from "./componnets/MapComponent";


interface TrashBin {
  id: string;
  location: string;
  fillLevel: number;
  lat: number;
  lng: number;
}

export default function Home() {
  const [bins, setBins] = useState<TrashBin[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://66e43805d2405277ed138dea.mockapi.io/trash-bins"
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

  const filteredBins = bins.filter((bin) =>
    bin.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBins = filteredBins.sort((a, b) => {
    if (sortField === "id") {
      const numA = parseFloat(a.id); // Convert to number
      const numB = parseFloat(b.id); // Convert to number
      return sortOrder === "asc" ? numA - numB : numB - numA;
    }
    if (sortField === "fillLevel") {
      return sortOrder === "asc"
        ? a.fillLevel - b.fillLevel
        : b.fillLevel - a.fillLevel;
    }
    return 0;
  });

  const totalItems = sortedBins.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = sortedBins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-3">
      <h1 style={{ textAlign: "center", paddingBottom: "6px" }}>
        TrashBinDashboard
      </h1>

      <ChartComponent data={sortedBins} />
      <div style={{ display: "flex", gap: "4px" }}>
        <SortDropdown
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <TableComponent bins={currentItems} />
      <MapComponent bins={bins} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
