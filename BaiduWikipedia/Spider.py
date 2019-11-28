'''
@Author: Senkita
'''

# coding=utf-8
# 导入模块
import url_manager, html_downloader, html_parser, html_outputer
import urllib.parse

class SpiderMain(object):
    # 构造模块联系
    def __init__(self):
        self.urls = url_manager.UrlManager()
        self.downloader = html_downloader.HtmlDownloader()
        self.parser = html_parser.HtmlParser()
        self.outputer = html_outputer.HtmlOutputer()
    # 爬取
    def craw(self, root_url):
        # 计数初始值
        count = 1
        # 添加新url进网址库
        self.urls.add_new_url(root_url)
        # 判断当存在新url
        while self.urls.has_new_url():
        # 尝试
            try:
                # 获取新url
                new_url = self.urls.get_new_url()
                new_url_keywords = urllib.parse.unquote(new_url[29:])
                # 输出正在爬取第几个网址
                print('craw {}: {}'.format(count, 'https://baike.baidu.com/item/' + new_url_keywords))
                # 下载网站内容
                html_cont = self.downloader.download(new_url)
                # 进行网站解析
                new_urls, new_data = self.parser.parse(new_url, html_cont)
                # url进网址库
                self.urls.add_new_urls(new_urls)
                # 价值数据进资料库
                self.outputer.collect_data(new_data)
            # 异常处理
            except Exception as e:
                print(e)
            # 计数限额
            if count == 1000:
                # 退出循环
                break
            # 计数加一
            count += 1
        # 输出数据
        self.outputer.output_html()
# 程序入口
if __name__ == '__main__':
    # 关键字切片并用加号连接
    keywords = ''.join(input('输入想爬取的关键字：').split())
    # 关键字编码切片
    keyword = urllib.parse.urlencode({'keyword': keywords})[8:]
    # 组合网址
    root_url = 'https://baike.baidu.com/item/' + keyword
    # 实例化
    obj_spider = SpiderMain()
    # 运行方法
    obj_spider.craw(root_url)