import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/")
def index():
    try:
        with open("counter.txt", "r+") as f:
            count = int(f.read())
            count += 1
            f.seek(0)
            f.write(str(count))
    except:
        count = 1
        with open("counter.txt", "w") as f:
            f.write("1")
    return render_template("index.html", visits=count)

@app.route("/ads.txt")
def ads():
    return send_from_directory(".", "ads.txt")

if __name__ == "__main__":
    # Lấy cổng từ biến môi trường
    port = int(os.environ.get("PORT", 8000))  # Cổng mặc định là 8000 nếu không có biến môi trường
    app.run(host="0.0.0.0", port=port)
