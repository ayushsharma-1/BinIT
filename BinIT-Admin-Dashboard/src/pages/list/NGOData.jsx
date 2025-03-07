import { useEffect, useState } from "react";
import axios from "axios";
import { NGOColumns } from "../../columns/columnData";
import { Datatable } from "../../components/datatable/Datatable";
import "./List.scss";

const CarePlanList = () => {
  const [ngoData, setNgoData] = useState([]); // State to store the fetched NGO data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle error state

  useEffect(() => {
    // Make a GET request to the backend API to fetch NGO data
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/ngo/`) // URL from .env file
      .then((response) => {
        const dataWithIds = response.data.map((item, index) => ({
          id: index, // Add an id field if the data doesn't have one
          ...item, // Keep the rest of the data
        }));
        setNgoData(dataWithIds); // Set the fetched data to the state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error("Error fetching NGO data:", err);
        setError("Failed to fetch NGO data"); // Handle errors
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []); // Empty array means this effect runs only once when the component mounts

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
          <span>NGO Data</span>
        </div>
      </div>
      <hr />
      <div className="recordsbody">
        <Datatable
          db="incidents" // Reference to the Firebase path or database
          columns={NGOColumns} // Columns for the DataTable
          rows={ngoData} // Pass the fetched data to the Datatable component
          className="datatable"
        />
      </div>
    </div>
  );
};

export default CarePlanList;
