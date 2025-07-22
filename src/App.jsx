import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Leaderboard() {
  const [score, setScore] = useState([]);
  const [week, setWeek] = useState("");

  useEffect(() => {
    if (week !== "") {
      fetch(`http://localhost:3000/scores?week=${week}`)
        .then(res => res.json())
        .then(data => setScore(data))
        .catch(err => console.error('Error fetching scores:', err));
    }
  }, [week]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <label>
        Select Week:
        <select value={week} onChange={(e) => setWeek(e.target.value)}>
          <option value="">-- Select a week --</option>
<option value="1">Week 1</option>
<option value="2">Week 2</option>
<option value="3">Week 3</option>
<option value="4">Week 4</option>
<option value="5">Week 5</option>
<option value="6">Week 6</option>
<option value="7">Week 7</option>
<option value="8">Week 8</option>
<option value="9">Week 9</option>
<option value="10">Week 10</option>
<option value="11">Week 11</option>
<option value="12">Week 12</option>
<option value="13">Week 13</option>
<option value="14">Week 14</option>
<option value="15">Week 15</option>
<option value="16">Week 16</option>
<option value="17">Week 17</option>
<option value="18">Week 18</option>
<option value="19">Week 19</option>
<option value="20">Week 20</option>
<option value="21">Week 21</option>
<option value="22">Week 22</option>
          {/* Add more weeks as needed */}
        </select>
      </label>

      {week && score.length === 0 && <p>No scores for this week.</p>}

      {week && score.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              <th>Player</th>
              <th>Course</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {score.map((score, index) => (
              <tr key={index}>
                <td>{score.name}</td>
                <td>{score.course}</td>
                <td>{score.score}</td>
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
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [score, setScore] = useState("");
  const [week, setWeek] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('score submitted')
  fetch('http://localhost:3000/scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      course,
      score: Number(score),
      week: Number(week),
    }),
  })
    .then(res => res.json())
    .then(data => {
      alert('Score submitted!');
      setName('');
      setCourse('');
      setScore('');
      setWeek('');
    })
    .catch(err => console.error('Error submitting score:', err));
};


  return (
    <>
      <div className="homepage_title">
        <h1>BDT Golf League</h1>
      </div>
      <div className="content">
        <h2>Welcome to the BDT Golf League</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First And Last Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
<label>
  Course: <br />
  <select value={course} onChange={(e) => setCourse(e.target.value)} required>
    <option value="">-- Select a course --</option>
    <option value="North">North</option>
    <option value="South">South</option>
    <option value="West">West</option>
  </select><br />
</label>
          <label>
            Score:
            <input type="number" value={score} onChange={(e) => setScore(e.target.value)} required />
          </label>
          <label>
            Week Number:
            <input type="number" value={week} onChange={(e) => setWeek(e.target.value)} required />
          </label>
          <br />
          <button className="submit-button" type="submit">Submit</button>
        </form>
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
      {/* <h3>Please Fill This Out Whether You Plan To Attend Or Not</h3>
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
      </form> */ }
      <h2> Coming Soon!</h2>
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
