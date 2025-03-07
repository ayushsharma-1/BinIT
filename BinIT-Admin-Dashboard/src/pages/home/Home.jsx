import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <h1>Welcome to Binit Admin Dashboard</h1>
        <p>
          The <strong>Binit Admin Dashboard</strong> provides an intuitive interface to manage reports, NGOs, news subscriptions, and contacts efficiently.  
          Monitor pollution reports, track NGO collaborations, and streamline operations—all in one place.
        </p>
        <div className="dashboard-overview">
          <h2>Dashboard Features:</h2>
          <ul>
            <li>📊 View and manage pollution reports</li>
            <li>🏢 Forward cases to NGOs and government authorities</li>
            <li>📬 Manage news subscriptions and user inquiries</li>
            <li>🔍 Track environmental initiatives and progress</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
