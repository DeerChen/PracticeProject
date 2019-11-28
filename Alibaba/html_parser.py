'''
@Author: Senkita
'''

from bs4 import BeautifulSoup
import re
import urllib.parse

class HtmlParser(object):
    def _get_new_data(self, page_url, soup):
        data = []
        links = soup.find_all('div', class_='offer-image-box')
        for link in links:
            current = link.find_all('img')
            try:
                img = current[0]['data-src']
                data.append(img)
            except Exception as e:
                pass
            finally:
                img = current[0]['src']
                data.append(img)
        return data
    def parse(self, page_url, html_count):
        if page_url is None or html_count is None:
            return
        soup = BeautifulSoup(html_count, 'lxml', from_encoding='utf-8')
        new_data = self._get_new_data(page_url, soup)
        return new_data