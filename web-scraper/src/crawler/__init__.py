import requests
from bs4 import BeautifulSoup


class Content:
    # Common base class for all articles/page
    def __init__(self, url, title, body):
        self.url = url
        self.title = title
        self.body = body

    def printdata(self):
        print('URL: {}'.format(self.url))
        print('TITLE: {}'.format(self.title))

    def toString(self):
        return '''
        Hello, world \
        {URL} \
        {TITLE} \
        '''.format(
            URL=self.url,
            TITLE=self.title,
        ).encode('utf-8').strip()


class Website:
    def __init__(self, name, url, titleTag, bodyTag):
        self.name = name
        self.url = url
        self.titleTag = titleTag
        self.bodyTag = bodyTag


class Crawler:
    def getPage(self, url):
        try:
            req = requests.get(url)
        except requests.exceptions.RequestException:
            return None
        return BeautifulSoup(req.text, 'html.parser')

    def get(self, pageObj, selector):
        selectedElems = pageObj.select(selector)
        if selectedElems is not None and len(selectedElems) > 0:
            return '\n'.join(
                [elem.get_text() for elem in selectedElems]
            )
        return ''

    def parse(self, site, url):
        bs = self.getPage(url)
        if bs is not None:
            title = self.get(bs, site.titleTag)
            body = self.get(bs, site.bodyTag)
            if title != '' and body != '':
                content = Content(url, title, body)
                return content.toString()
