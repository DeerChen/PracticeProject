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


@app.route('/api/headerList.json', methods=['GET'])
def apiHeaderList():
    return jsonify({
        'data': [
            '吃饭', '睡觉', '打豆豆',
            '吃饭', '睡觉', '打豆豆',
            '吃饭', '睡觉', '打豆豆',
            '吃饭', '睡觉', '打豆豆'
        ]
    })


@app.route('/api/home.json', methods=['GET'])
def apiHome():
    return jsonify({
        "data": {
            "topicList": [
                {
                    "id": 1,
                    "title": "社会热点",
                    "imgUrl": " //pic.abcyun.co/image/5ea7dd7bd41bf.jpg"
                },
                {
                    "id": 2,
                    "title": "娱乐八卦",
                    "imgUrl": " //pic.abcyun.co/image/5ea7dd7bd41bf.jpg"
                },
                {
                    "id": 3,
                    "title": "母婴教育",
                    "imgUrl": " //pic.abcyun.co/image/5ea7dd7bd41bf.jpg"
                }
            ],
            "articleList": [
                {
                    "id": 1,
                    "title": "测试标题",
                    "imgUrl": " //pic.abcyun.co/image/5ea7dd7bd41bf.jpg",
                    "paragraph": "测试段落"
                },
                {
                    "id": 2,
                    "title": "测试标题",
                    "imgUrl": " //pic.abcyun.co/image/5ea7dd7bd41bf.jpg",
                    "paragraph": "测试段落"
                },
                {
                    "id": 3,
                    "title": "测试标题",
                    "imgUrl": " //pic.abcyun.co/image/5ea7dd7bd41bf.jpg",
                    "paragraph": "测试段落"
                }
            ],
            "recommendList": [
                {
                    "id": 1,
                    "imgUrl": " //pic.abcyun.co/image/5ea7dd7bd41bf.jpg"
                },
                {
                    "id": 2,
                    "imgUrl": " //pic.abcyun.co/image/5ea7dd7bd41bf.jpg"
                },
                {
                    "id": 3,
                    "imgUrl": " //pic.abcyun.co/image/5ea7dd7bd41bf.jpg"
                },
                {
                    "id": 4,
                    "imgUrl": " //pic.abcyun.co/image/5ea7dd7bd41bf.jpg"
                },
                {
                    "id": 5,
                    "imgUrl": " //pic.abcyun.co/image/5ea7dd7bd41bf.jpg"
                }
            ]
        }
    })


@app.route('/api/homeList.json', methods=['GET'])
def apiHomeList():
    return jsonify({
        "data": [
            {
                "id": 1,
                "title": "测试标题",
                "imgUrl": " //pic.abcyun.co/image/5ea7dd7bd41bf.jpg",
                "paragraph": "测试段落"
            },
            {
                "id": 2,
                "title": "测试标题",
                "imgUrl": " //pic.abcyun.co/image/5ea7dd7bd41bf.jpg",
                "paragraph": "测试段落"
            },
            {
                "id": 3,
                "title": "测试标题",
                "imgUrl": " //pic.abcyun.co/image/5ea7dd7bd41bf.jpg",
                "paragraph": "测试段落"
            }
        ]
    })


@app.route('/api/detail.json', methods=['GET'])
def apiDetail():
    return jsonify({
        'data': {
            "title": "测试标题",
            "content": "<img src='//pic.abcyun.co/image/5ea7dd7bd41bf.jpg' alt='' /><p>测试段落</p><p>测试段落</p>"
        }
    })


if __name__ == "__main__":
    app.run(
        host='0.0.0.0'
    )
