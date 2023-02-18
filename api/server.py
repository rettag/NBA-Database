from flask import Flask, request, jsonify,  render_template, send_from_directory
import sqlite3
#import database

app = Flask(__name__)

def default():
    db = sqlite3.connect('players.db')

    query = db.execute("SELECT * FROM players")
    rows = query.fetchall()

    player_data = []
    for row in rows:
        player_dict = {
            'player': row[0],
            'position': row[1],
            'age': row[2],
            'team': row[3],
        }
        player_data.append(player_dict)

    return jsonify(player_data)


def sort(sort_by, is_asc):
    db = sqlite3.connect('players.db')

    if is_asc == "true":
        sort_order = "ASC"
    else:
        sort_order = "DESC"

    query_string = "SELECT * FROM players ORDER BY {} {}".format(sort_by, sort_order)
    query = db.execute(query_string)

    player_data = []
    while True:
        row = query.fetchone()
        if row is None:
            break
        player = { 'player': row[0], 'position': row[1], 'age': row[2], 'team': row[3] }
        player_data.append(player)
    return jsonify(player_data)


def search(name, position, age, team):
    search_name = " AND name='{}' ".format(name)
    search_position = " AND position='{}' ".format(position)
    search_age = " AND age='{}' ".format(age)
    search_team = " AND team='{}' ".format(team)

    if name == "":
        search_name = ""
    if position == "" or position == "undefined":
        search_position = ""
    if age == "":
        search_age = ""
    if team == "":
        search_team = ""
    
    db = sqlite3.connect('players.db')

    query = db.execute("SELECT * FROM players WHERE 1=1" + search_name + search_position + search_age + search_team)

    player_data = []
    while True:
        row = query.fetchone()
        if row is None:
            break
        player = { 'player': row[0], 'position': row[1], 'age': row[2], 'team': row[3] }
        player_data.append(player)

    print(jsonify(player_data))
    return jsonify(player_data)


@app.route('/players', methods=['GET'])
def get_players():
    sort_by = request.args.get('sort_by')
    is_asc = request.args.get('asc')
    name = request.args.get('name')
    position = request.args.get('position')
    age = request.args.get('age')
    team = request.args.get('team')
    
    if sort_by is not None:
        return sort(sort_by, is_asc)

    elif name is not None:
        return search(name, position, age, team)
    else:
        return default()

if __name__ == '__main__':
    #database.populate_db()
    app.run(debug=True)


