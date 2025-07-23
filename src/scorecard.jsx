import React, { useState } from 'react';

const Scorecard = () => {
  const [week, setWeek] = useState(1);
  const [course, setCourse] = useState('North');
  const [team, setTeam] = useState('');
  const [scores, setScores] = useState(Array(9).fill(''));

  const handleScoreChange = (holeIndex, value) => {
    const updated = [...scores];
    updated[holeIndex] = value;
    setScores(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      week,
      course,
      team,
      scores: scores.map(s => Number(s)),
    };

    try {
      const res = await fetch("http://localhost:3000/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to submit scorecard");

      await res.json();
      alert("Scorecard submitted!");

      // Reset form
      setTeam('');
      setScores(Array(9).fill(''));
      setWeek(1);
      setCourse('North');
    } catch (err) {
      console.error("Error submitting scorecard:", err);
      alert("There was an error submitting the scorecard.");
    }
  };

  return (
    <div className="scorecard">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Week: </label>
          <select value={week} onChange={e => setWeek(Number(e.target.value))}>
            {Array.from({ length: 22 }, (_, i) => (
              <option key={i + 1} value={i + 1}>Week {i + 1}</option>
            ))}
          </select>

          <label style={{ marginLeft: '1rem' }}>Course: </label>
          <select value={course} onChange={e => setCourse(e.target.value)}>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="West">West</option>
          </select>
        </div>

        <table style={{ marginTop: '1rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Team</th>
              {[...Array(9)].map((_, i) => (
                <th key={i}>Hole {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={team}
                  onChange={e => setTeam(e.target.value)}
                  required
                />
              </td>
              {scores.map((score, holeIndex) => (
                <td key={holeIndex}>
                  <input
                    type="number"
                    min="-6"
                    max="20"
                    value={score}
                    onChange={e =>
                      handleScoreChange(holeIndex, e.target.value)
                    }
                    required
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <button type="submit" style={{ marginTop: '1rem' }}>
          Submit Scorecard
        </button>
      </form>
    </div>
  );
};

export default Scorecard;
