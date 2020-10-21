from flask import Flask
from crawler import Crawler, Website

website = Website('Fire Emblem: Three Houses',
                  'https://fireemblem.fandom.com/wiki/Fire_Emblem:_Three_Houses', 'h1', 'div.WikiaArticle')

crawler = Crawler()


def make_server():
    server = Flask(__name__)

    @server.route("/")
    def hello():
        content = crawler.parse(
            website, 'src/test/mock/Fire_Emblem:_Three_Houses.html')
        return content

    return server


if __name__ == "__main__":
    server = make_server()
    server.run(host='0.0.0.0', port=8080)
