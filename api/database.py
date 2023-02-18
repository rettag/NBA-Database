import sqlite3
from bs4 import BeautifulSoup
import requests

def populate_db():
    # Connect to the database
    conn = sqlite3.connect('players.db')
    cursor = conn.cursor()

    cursor.execute("DROP TABLE players")
    # Create the players table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS players (
            name text,
            position text,
            age integer,
            team text
        )
    ''')

    # Scrape the data from the website
    url = 'https://www.basketball-reference.com/leagues/NBA_2023_totals.html'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the table containing the player data
    table = soup.find('table', {'id': 'totals_stats'})

    # Loop through each row in the table (excluding the header row)
    prev_name = ""
    for row in table.find_all('tr')[1:]:
        if len(row.find_all('th')) > 1:
            continue


        cols = row.find_all('td')

        name = cols[0].text
        pos = cols[1].text
        age = int(cols[2].text)
        team = cols[3].text
        
        if (name == prev_name):
            continue

        prev_name = name

        print(name, pos, age, team)

        # Insert the data into the database
        cursor.execute('INSERT INTO players (name, position, age, team) VALUES (?, ?, ?, ?)', (name, pos, age, team))

    # Commit the changes and close the connection
    conn.commit()
    conn.close()