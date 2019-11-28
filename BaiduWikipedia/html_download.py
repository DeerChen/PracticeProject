'''
@Author: Senkita
'''

# coding=utf-8
# 导入模块
import urllib.request

class HtmlDownloader(object):
    def download(self, url):
        if url is None:
            return None
        # 请求打开网址
        response = urllib.request.urlopen(url)
        # 判断返回值，200为通
        if response.getcode() != 200:
            return None
        # 返回网址内容
        return response.read()