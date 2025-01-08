import React, { useState, useEffect } from "react";
import "./App.css";
import Pagination from "./Pagination";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); 
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = projects?.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(projects?.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="app-container">
      <h1>Assignment</h1>
      <table className="projects-table" role="table">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Percentage Funded</th>
            <th scope="col">Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords?.map((project, index) => (
            <tr key={index}>
              <td>{indexOfFirstRecord + index + 1}</td>
              <td>{project["percentage.funded"]}</td>
              <td>${project["amt.pledged"].toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;