import json
from flask import Flask, render_template_string, request, redirect, url_for, session


def load_resources(path="resources.json"):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


RESOURCES = load_resources()
USERS = {"veteran": "password"}

app = Flask(__name__)
app.secret_key = "change-me"

login_template = """
<!doctype html>
<title>Compass4Vets Login</title>
<h1>Login</h1>
{% if error %}<p style='color:red;'>{{ error }}</p>{% endif %}
<form method='post'>
  <label>Username <input type='text' name='username'></label><br>
  <label>Password <input type='password' name='password'></label><br>
  <input type='submit' value='Login'>
</form>
"""

index_template = """
<!doctype html>
<title>Compass4Vets</title>
<h1>Compass4Vets Resources</h1>
<p>Welcome, {{ user }}! <a href='{{ url_for('logout') }}'>Logout</a></p>
<ul>
{% for cat, data in resources.items() %}
  <li><strong>{{ cat.title() }}</strong>: {{ data.description }}
    <ul>
    {% for link in data.links %}
      <li><a href='{{ link }}'>{{ link }}</a></li>
    {% endfor %}
    </ul>
  </li>
{% endfor %}
</ul>
"""


@app.route('/')
def index():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template_string(index_template, user=session['user'], resources=RESOURCES)


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if USERS.get(username) == password:
            session['user'] = username
            return redirect(url_for('index'))
        else:
            error = 'Invalid credentials'
    return render_template_string(login_template, error=error)


@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
