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
    app.run(host="0.0.0.0", port=8000)
