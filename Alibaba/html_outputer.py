'''
@Author: Senkita
'''

import csv
import os

class HtmlOutputer(object):
    def output_csv(self, datas):
        if not os.path.exists('output.csv'):
            with open('output.csv', 'w') as f:
                for data in datas:
                    if data != '//img.alicdn.com/tfs/TB1S_7kkY5YBuNjSspoXXbeNFXa-700-700.jpg_350x350.jpg':
                        f.write('https:' + data[:-12] + '\n')
                    else:
                        with open('output.csv', 'a') as f:
                            for data in datas:
                                if data != '//img.alicdn.com/tfs/TB1S_7kkY5YBuNjSspoXXbeNFXa-700-700.jpg_350x350.jpg':
                                    f.write('https:' + data[:-12] + '\n')