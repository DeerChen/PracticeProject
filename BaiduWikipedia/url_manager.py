'''
@Author: Senkita
'''

# coding=utf-8
class UrlManager(object):
    # url库去重整理
    def __init__(self):
        self.new_urls = set()
        self.old_urls = set()
    def add_new_url(self, url):
        # 如果url为空
        if url is None:
            # 不操作
            return
        # 判断url是否不在网址库中
        if url not in self.new_urls and url not in self.old_urls:
            self.new_urls.add(url)
    # 批量添加url
    def add_new_urls(self, urls):
        if urls is None or len(urls) == 0:
            return
        for url in urls:
            # 调用类自身方法
            self.add_new_url(url)
    # 作为主程序运行的条件，判断是否存在新url
    def has_new_url(self):
        return len(self.new_urls) != 0
    def get_new_url(self):
        # 从新网址库中取出最后一个url，并删除
        new_url = self.new_urls.pop()
        # 添加进旧网址库
        self.old_urls.add(new_url)
        # 输出url
        return new_url