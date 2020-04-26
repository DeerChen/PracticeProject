from flask import Flask
from flask import render_template
from flask import jsonify

app = Flask(
    __name__,
    template_folder='./backend/templates',
    static_folder='./backend/static',
    static_url_path='/backend/static'
)
app.debug = True


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api', methods=['GET'])
def api():
    return jsonify({
        'data': ['吃饭', '睡觉', '打豆豆']
    })


if __name__ == "__main__":
    app.run(
        host='0.0.0.0'
    )
