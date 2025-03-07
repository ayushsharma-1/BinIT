
import { useEffect, useState } from "react";
import axios from "axios";
import { ReportColumns } from "../../columns/columnData";
import { Datatable } from "../../components/datatable/Datatable";
import "./List.scss";

const List = () => {
  const [reports, setReports] = useState([]); // State to store the reports data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle error state

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/reports/`)
      .then((response) => {
        const dataWithIds = response.data.map((item, index) => ({
          id: index, // Add an id field if the data doesn't have one
          ...item, // Keep the rest of the data
        }));
        setReports(dataWithIds); // Set the modified data with ids
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reports:", err);
        setError("Failed to fetch reports");
        setLoading(false);
      });
  }, []);
  
 
  if (loading) {
    return <div>Loading...</div>; // Show loading text while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something goes wrong
  }

  return (
    <div className="records">
      <div className="topbar">
        <div className="recordstext">
          <span>Reports</span>
        </div>
      </div>
      <hr />
      <div className="recordsbody">
        <Datatable
          db="participants"
          columns={ReportColumns}
          rows={reports} // Pass the fetched data to the Datatable component
          className="datatable"
        />
      </div>
    </div>
  );
};

export default List;


