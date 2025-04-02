from flask import Flask, render_template, request, redirect, url_for
import sqlite3
import bleach

app = Flask(__name__)

# Function to initialize the database table if it doesn't exist
def init_db():
    conn = sqlite3.connect('insights.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS insights (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Initialize the database on startup
init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/content/<page>')
def load_content(page):
    valid_pages = ['about', 'projects', 'experience', 'certifications', 'resume', 'insights']
    if page not in valid_pages:
        return "Page not found", 404
    if page == 'insights':
        # Query the database for insights
        conn = sqlite3.connect('insights.db')
        c = conn.cursor()
        insights_list = c.execute('SELECT message FROM insights ORDER BY id DESC').fetchall()
        conn.close()
        return render_template(f'content/{page}.html', insights=insights_list)
    return render_template(f'content/{page}.html')

@app.route('/submit_insight', methods=['POST'])
def submit_insight():
    # Get the insight text from the form
    insight = request.form.get('insight')
    # Sanitize the input using bleach
    sanitized_insight = bleach.clean(insight)
    # Insert the sanitized insight into the database using parameterized queries
    conn = sqlite3.connect('insights.db')
    c = conn.cursor()
    c.execute('INSERT INTO insights (message) VALUES (?)', (sanitized_insight,))
    conn.commit()
    conn.close()
    return redirect(url_for('load_content', page='insights'))

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Using a different port if needed