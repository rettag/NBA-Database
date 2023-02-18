import React, { useState, useEffect } from 'react';

export default function Table({ data, sortName, sortPosition, sortAge, sortTeam }) {

    let rows = data.map((player) => {
        return (
            <tr>
                <td>{player.player}</td>
                <td>{player.position}</td>
                <td>{player.age}</td>
                <td>{player.team}</td>
            </tr>
        );
      });
    
    return (
      <>
      <table id="player-table">
      <thead>
        <tr>
          <th onClick={sortName}>Name</th>
          <th onClick={sortPosition}>Position</th>
          <th onClick={sortAge}>Age</th>
          <th onClick={sortTeam}>Team</th>
        </tr>
      </thead>
      <tbody id="player-table-body">
        {rows}
      </tbody>
    </table>
      </>
    );
  }