import bs4
from . import content


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
