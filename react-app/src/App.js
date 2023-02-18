import React, { useState, useEffect } from 'react';
import Table from './table';

export default function App() {

  const [playerData, setPlayerData] = useState([]);

  const [nameText, setNameText] = useState("");
  const [ageText, setAgeText] = useState("");
  const [positionText, setPositionText] = useState("");
  const [teamText, setTeamText] = useState("");

  const [sortName, setSortName] = useState(false);
  const [sortPosition, setSortPosition] = useState(false);
  const [sortAge, setSortAge] = useState(false);
  const [sortTeam, setSortTeam] = useState(false);

  useEffect(() => {
    fetch("/players")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayerData(data);
        setNameText("");
        setAgeText("");
        setPositionText("");
        setTeamText("");
      });
  }, []);

  const Handle_Name = event => {
    setNameText(event.target.value);
  }

  const Handle_Age = event => {
    setAgeText(event.target.value);
  }

  const Handle_Position = event => {
    setPositionText(event.target.value);
  }

  const Handle_Team = event => {
    setTeamText(event.target.value);
  }

  function Handle_Sort_Name() {
    let url = "/players?sort_by=name&asc=" 
    if (sortName == false) {
      url = url + "false";
      setSortName(true);
    }
    else {
      url = url + "true";
      setSortName(false);
    }
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayerData(data);
      });
  }

  function Handle_Sort_Position(event) {
    let url = "/players?sort_by=position&asc=" 
    if (sortPosition == false) {
      url = url + "false";
      setSortPosition(true);
    }
    else {
      url = url + "true";
      setSortPosition(false);
    }
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayerData(data);
      });
  }

  function Handle_Sort_Age() {
    let url = "/players?sort_by=age&asc=" 
    if (sortAge == false) {
      url = url + "false";
      setSortAge(true);
    }
    else {
      url = url + "true";
      setSortAge(false);
    }
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayerData(data);
      });
  }

  function Handle_Sort_Team(event) {
    let url = "/players?sort_by=team&asc=" 
    if (sortTeam == false) {
      url = url + "false";
      setSortTeam(true);
    }
    else {
      url = url + "true";
      setSortTeam(false);
    }
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayerData(data);
      });
  }

  function Handle_Submit(event) {
    event.preventDefault();
    let url = "/players?name=" + nameText + "&position=" + positionText + "&age=" + ageText + "&team=" + teamText;
    
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayerData(data);
      });
  }

  return (
    <>
      <br></br>

      <div class="search-box">
      <form onSubmit={Handle_Submit}>
          <label for="search_query">Search by:</label>
          <input type="text" id="search_name" name="name" placeholder="Name" onChange={Handle_Name}></input>
          <input type="text" id="search_age" name="age" placeholder="Age" onChange={Handle_Age}></input>
          <input type="text" id="search_position" name="position" placeholder="Position" onChange={Handle_Position}></input>
          <input type="text" id="search_team" name="team" placeholder="Team" onChange={Handle_Team}></input>
          <button type="submit">Search</button>
        </form>
      </div>

      <br></br>

      <Table data={playerData} sortName={Handle_Sort_Name} sortPosition={Handle_Sort_Position} sortAge={Handle_Sort_Age} sortTeam={Handle_Sort_Team} />
    </>
  );
}
