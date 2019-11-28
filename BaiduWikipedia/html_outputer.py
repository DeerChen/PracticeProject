'''
@Author: Senkita
'''

# coding=utf-8
class HtmlOutputer(object):
    # 数据存储转为列表
    def __init__(self):
        self.datas = []
    def collect_data(self, data):
        if data is None:
            return
        # 丰富资料库
        self.datas.append(data)
    def output_html(self):
        # Windows下用gdk编码打开文件，异常忽略
        with open('output.html', 'w', encoding='gbk', errors='ignore') as f:
            # 主元素
            f.write('<html>')
            # 主体部分
            f.write('<body>')
            # 实例Html表格
            f.write('<table>')
            # 依次写入
            for data in self.datas:
                # 表中的行
                f.write('<tr>')
                # 表中的格
                f.write('<td>%s</td>' % data['title'].encode('UTF-8').decode('UTF-8'))
                f.write('<td>%s</td>' % data['summary'].encode('UTF-8').decode('UTF-8'))
                f.write('<td>%s</td>' % data['url'])
                f.write('</tr>')
            f.write('</table>')
            f.write('</body>')
            f.write('</html>')