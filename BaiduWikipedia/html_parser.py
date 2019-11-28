'''
@Author: Senkita
'''

# coding=utf-8
# 导入模块
from bs4 import BeautifulSoup
import re
import urllib.parse

class HtmlParser(object):
    def _get_new_urls(self, page_url, soup):
        # 去重规范新网址库
        new_urls = set()
        # 对解析出来的网站内容进行正则匹配a标签
        links = soup.find_all('a', href=re.compile(r'/item'))
        for link in links:
            # 截取href标签
            new_url = link['href']
            # 根据原网址规律组合出新完整网址
            new_full_url = urllib.parse.urljoin(page_url, new_url)
            # 添加入新网址库
            new_urls.add(new_full_url)
            # 返回新网址库
            return new_urls
    def _get_new_data(self, page_url, soup):
        # 以字典形式存储价值数据
        res_data = {}
        # 正则匹配抬头
        title_node = soup.find('dd', class_='lemmaWgt-lemmaTitle-title').find('h1')
        res_data['title'] = title_node.get_text()
        # 查找内容
        summary_node = soup.find('div', class_='lemma-summary')
        res_data['summary'] = summary_node.get_text()
        # 存储url
        res_data['url'] = page_url
        # 返回价值数据字典
        return res_data
    def parse(self, page_url, html_count):
        # 如网址或网站内容为空，不操作
        if page_url is None or html_count is None:
            return
        # 对网站内容使用lxml解析器，编码形式采用utf-8
        soup = BeautifulSoup(html_count, 'lxml', from_encoding='utf-8')
        new_urls = self._get_new_urls(page_url, soup)
        new_data = self._get_new_data(page_url, soup)
        # 返回新url和价值数据
        return new_urls, new_data