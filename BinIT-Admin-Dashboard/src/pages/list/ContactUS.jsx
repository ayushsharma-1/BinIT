import { useEffect, useState } from "react";
import axios from "axios";
import { ContactUsColumns } from "../../columns/columnData";
import { Datatable } from "../../components/datatable/Datatable";
import "./List.scss";

const CarePlanList = () => {
  const [contactUsData, setContactUsData] = useState([]); // Store the fetched data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    // Make a GET request to the backend API to fetch the Contact Us reports data
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/contact/`) // Use the URL defined in the .env file
      .then((response) => {
        const dataWithIds = response.data.map((item, index) => ({
          id: index, // Add an id field if the data doesn't have one
          ...item, // Keep the rest of the data
        }));
        setContactUsData(dataWithIds); // Set the fetched data into state
        setLoading(false); // Data fetched, set loading to false
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data"); // Handle error
        setLoading(false); // Set loading to false even if an error occurs
      });
  }, []); // Empty dependency array to run this effect once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Display loading text while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error if data fetching fails
  }

  return (
    <div className="records">
      <div className="topbar">
        <div className="recordstext">
          <span>Contact Us Reports</span>
        </div>
      </div>
      <hr />
      <div className="recordsbody">
        <Datatable
          db="careplans" // Pass the Firebase path or DB name
          columns={ContactUsColumns} // Pass the columns configuration for the DataTable
          rows={contactUsData} // Pass the fetched data to Datatable as rows
          className="datatable"
        />
      </div>
    </div>
  );
};

export default CarePlanList;
