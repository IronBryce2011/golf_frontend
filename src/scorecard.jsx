import React, { useState } from 'react';

const Scorecard = () => {
  const [week, setWeek] = useState(1);
  const [course, setCourse] = useState('North');
  const [players, setPlayers] = useState([
    { name: '', scores: Array(9).fill('') },
    { name: '', scores: Array(9).fill('') }
  ]);

  const handleNameChange = (index, value) => {
    const updated = [...players];
    updated[index].name = value;
    setPlayers(updated);
  };

  const handleScoreChange = (playerIndex, holeIndex, value) => {
    const updated = [...players];
    updated[playerIndex].scores[holeIndex] = value;
    setPlayers(updated);
  };
  const handleSubmit = (e) => {
  e.preventDefault();
  console.log({
    week,
    course,
    players
  });
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
            <th>Name</th>
            {[...Array(9)].map((_, i) => (
              <th key={i}>Hole {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player, playerIndex) => (
            <tr key={playerIndex}>
              <td>
                <input
                  type="text"
                  value={player.name}
                  onChange={e => handleNameChange(playerIndex, e.target.value)}
                />
              </td>
              {player.scores.map((score, holeIndex) => (
                <td key={holeIndex}>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={score}
                    onChange={e =>
                      handleScoreChange(playerIndex, holeIndex, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
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
