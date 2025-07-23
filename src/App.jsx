import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Scorecard from './scorecard.jsx';  

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [week, setWeek] = useState("");

  useEffect(() => {
    if (week) {
      fetch(`http://localhost:3000/scores?week=${week}`)
        .then((res) => res.json())
        .then((data) => {
          setScores(data); // Now a flat array directly
        })
        .catch((err) => {
          console.error("Error fetching scores:", err);
        });
    }
  }, [week]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <label>
        Select Week:{" "}
        <select value={week} onChange={(e) => setWeek(e.target.value)}>
          <option value="">-- Select a week --</option>
          {[...Array(22)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Week {i + 1}
            </option>
          ))}
        </select>
      </label>

      {week && scores.length === 0 && <p>No scores for Week {week}.</p>}

      {week && scores.length > 0 && (
        <table border="1" style={{ marginTop: '10px' }}>
          <thead>
            <tr>
              <th>Team</th>
              <th>Course</th>
              <th>Total Score</th>
              {[...Array(9)].map((_, i) => (
                <th key={i}>Hole {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scores.map((entry, index) => (
              <tr key={index}>
                <td>{entry.team}</td>
                <td>{entry.course}</td>
                <td>{entry.score}</td>
                <td>{entry.hole1}</td>
                <td>{entry.hole2}</td>
                <td>{entry.hole3}</td>
                <td>{entry.hole4}</td>
                <td>{entry.hole5}</td>
                <td>{entry.hole6}</td>
                <td>{entry.hole7}</td>
                <td>{entry.hole8}</td>
                <td>{entry.hole9}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}



const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <img
          src="https://i.ibb.co/twQ7YYMG/bdt-removebg-preview.png"
          alt="Logo"
          style={styles.image}
        />
      </div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Homepage</Link>
        <Link to="/field-day" style={styles.link}>Field Day</Link>
      </div>
    </nav>
  );
};

const Homepage = () => {
  return (
    <>
      <div className="homepage_title">
        <h1>BDT Golf League</h1>
      </div>
      <div className="content">
        <h2>Welcome to the BDT Golf League</h2>
        <div className="scorecard">
          <Scorecard />
        </div>
        <br />
        <Leaderboard />
        <p>
          WEEKLY FORMAT<br />
          Week’s 1-7 (4/15-5/27): Best Ball/Alt Shot/Scramble<br />
          Week’s 8-14 (6/3-7/15): Alt Shot/Scramble/Best Ball<br />
          Week’s 15-22 (7/22-9/9): Scramble/Best Ball/Alt Shot<br />
          Playoffs: 9/16 First Round, 10/07 Championship Match<br />
          League Dues: $120/Golfer, due to Rich (includes League fee and Skins)<br />
          Skin is $65 per week<br />
          Weeks rained out will not be made up, no matches count if canceled<br />
          Drive requirement: use a drive from each player during Scramble/Alt rounds<br />
          Senior Tees age: 62+<br />
        </p>
      </div>
    </>
  );
};
const FieldDay = () => {
  return (
    <div className="content">
      <h1>Welcome to Field Day</h1>
      <h3>Please Fill This Out Whether You Plan To Attend Or Not</h3>
      <form>
        <label>
          First And Last Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Are You Planning to Attend?<br />
          <input type="radio" name="attend" value="yes" /> Yes
          <input type="radio" name="attend" value="no" /> No
        </label>
        <br />
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/field-day" element={<FieldDay />} />
      </Routes>
    </Router>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "white",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    height: "50px",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "black",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default App;
