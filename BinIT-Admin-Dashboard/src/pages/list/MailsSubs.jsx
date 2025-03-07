import { useEffect, useState } from "react";
import axios from "axios";
import { MailSubs } from "../../columns/columnData";
import { Datatable } from "../../components/datatable/Datatable";
import "./List.scss";

const List = () => {
  const [subRecords, setSubRecords] = useState([]); // State to hold the fetched subscription data
  const [loading, setLoading] = useState(true); // State to handle the loading state
  const [error, setError] = useState(null); // State to handle errors during data fetching

  useEffect(() => {
    // Fetch subscription records from the backend API
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/subscribe/`) // Use the backend URL from .env file
      .then((response) => {
        console.log(response.data);  // Log the response data
        // const result = response.json();
        const dataWithIds = response.data.subscriptions.map((item, index) => ({
          id: index, // Add an id field if the data doesn't have one
          ...item, // Keep the rest of the data
        }));
        setSubRecords(dataWithIds); // Set the data to the state
        setLoading(false); // Set loading to false when data is successfully fetched
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data"); // Set error state if fetching fails
        setLoading(false); // Set loading to false even if an error occurs
      });
  }, []); // Empty array means this effect runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something goes wrong
  }

  return (
    <div className="records">
      <div className="topbar">
        <div className="recordstext">
          <span>Subscription Records</span>
        </div>
      </div>
      <hr />
      <div className="recordsbody">
        <Datatable
          db="employees" // Reference to the Firebase path or database
          columns={MailSubs} // Pass the columns for the DataTable
          rows={subRecords} // Pass the fetched data as rows to the Datatable
          className="datatable"
        />
      </div>
    </div>
  );
};

export default List;
