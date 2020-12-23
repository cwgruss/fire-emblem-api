import requests
from bs4 import BeautifulSoup
import re


class Content:
    # Common base class for all articles/page
    def __init__(self, bs, url, title, body, links):
        self.url = url
        self.title = title
        self.body = body
        for link in links:
            if link.attrs['href'] == '#Characters':
                characterDivs = bs.find_all(id='Characters')
                for characterWrapper in characterDivs:
                    characterLink = characterWrapper.find_all(
                        'a')
                    print(characterLink[0].attrs['href'])

        self.links = links

    def printdata(self):
        print('URL: {}'.format(self.url))
        print('TITLE: {}'.format(self.title))

    def toString(self):
        return '''
        <p>URL: {URL} \n</p>
        <h1>TITLE: {TITLE} \n</h1>
        <p> BODY: {BODY}</p>
        '''.format(
            URL=self.url,
            TITLE=self.title,
            BODY=self.links
        ).encode('utf-8').strip()


class Website:
    def __init__(self, name, url, titleTag, bodyTag):
        self.name = name
        self.url = url
        self.titleTag = titleTag
        self.bodyTag = bodyTag


class Crawler:
    pages = set()

    def getPage(self, url):
        try:
            # req = requests.get(url).text
            req = open(url)
            return BeautifulSoup(req, 'html.parser')
        except requests.exceptions.RequestException:
            return None

    def get(self, pageObj, selector):
        selectedElems = pageObj.select(selector)
        if selectedElems is not None and len(selectedElems) > 0:
            return '\n'.join(
                [elem.get_text() for elem in selectedElems]
            )
        return ''

    def getTopLevelLinks(self, pageObj):
        for link in pageObj.findAll('a'):
            if 'href' in link.attrs:
                if link.attrs['href'] not in self.pages:
                    newPage = link
                    self.pages.add(newPage)
        return self.pages

    def parse(self, site, url):
        bs = self.getPage(url)
        if bs is not None:
            title = self.get(bs, site.titleTag)
            body = self.get(bs, site.bodyTag)
            tableOfContents = bs.find('div', id='toc')
            links = self.getTopLevelLinks(tableOfContents)

            if title != '' and body != '':
                content = Content(bs, url, title, body, links)
                return content.toString()
