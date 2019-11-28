'''
@Author: Senkita
'''

import re
import time
import html_downloader, html_parser, html_outputer
import requests
import os
import csv

class SpiderMain(object):
    def __init__(self):
        self.downloader = html_downloader.HtmlDownloader()
        self.parser = html_parser.HtmlParser()
        self.outputer = html_outputer.HtmlOutputer()
    def craw(self, root_url, num):
        count = 1
        while count <= num:
            try:
                full_url = root_url + '&page=' + str(count)
                print('正在爬取第{}页...'.format(count))
                html_cont = self.downloader.download(full_url)
                new_data = self.parser.parse(full_url, html_cont)
                self.outputer.output_csv(new_data)
            except Exception as e:
                print(e)
                count += 1
    def sorted(self):
        with open('./output.csv', 'r') as f:
            lines = f.readlines()
            for i in range(len(lines)):
                imagelists.append(lines[i])
    def download(self):
        if not os.path.exists('image'):
            os.makedirs('image')
        for imagelink in imagelists:
            global i
            i += 1
                try:
                    pic =requests.get(imagelink)
                except requests.exceptions.ConnectionError as e:
                    print(e)
                    continue
                filename = 'image/' + str(i) +'.jpg'
                print('正在下载第{}张照片...'.format(str(i)))
                with open(filename, 'wb') as fp:
                    fp.write(pic.content)
def main():
    keywords = '+'.join(input('输入想爬取的关键字：').split())
    num = input('输入想爬取的页数：')
    while not re.findall('^[1-9]\d*$', num):
        print('Invalid Value.')
        num = input('输入想爬取的页数：')
    else:
        num = int(num)
        root_url = 'https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&CatId=&SearchText=' + keywords
    obj_spider = SpiderMain()
    obj_spider.craw(root_url, num)
    imagelists = []
    i = 0
    obj_spider.sorted()
    obj_spider.download()
    print('Done!')

if __name__ == '__main__':
    main()