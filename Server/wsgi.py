# gunicorn will run this file to run the server

from Server import app

if __name__ == "__main__":
    app.run()
