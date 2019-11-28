'''
@Author: Senkita
'''

from datetime import datetime, timedelta
from fake_useragent import UserAgent
import urllib.request
import json
import pandas as pd
import csv
import time
import os

def generate_url_list(time_interval):
    date_list = []
    startdate = datetime(2013,11,1)
    date_list.append('{:0>4d}{:0>2d}{:0>2d}'.format(startdate.year,startdate.month,startdate.day))
    enddate = datetime(2019,2,28)
    while (enddate - startdate).days > 0:
        startdate = startdate + timedelta(days=time_interval)
        if (enddate - startdate).days > 0:
            date_list.append('{:0>4d}{:0>2d}{:0>2d}'.format(startdate.year,startdate.month,startdate.day))
        else:
            lastdate = datetime(int(date_list[-1][:4]),int(date_list[-1][4:6]),int(date_list[-1][6:]))
            time_difference = (enddate-lastdate).days
    url_list = []
    for i in date_list[:-1]:
        url_list.append('https://dsx.weather.com/wxd/v2/PastObsAvg/en_US/{}/{}/USNY0996:1:US?api=7bb1c920-7027-4289-9c96-ae5e263980bc'.format(i,time_interval))
    url_list.append('https://dsx.weather.com/wxd/v2/PastObsAvg/en_US/{}/{}/USNY0996:1:US?api=7bb1c920-7027-4289-9c96-ae5e263980bc'.format(date_list[-1],int(time_difference)+1))
    return url_list
def setup():
    ua = UserAgent(verify_ssl=False).random
    opener = urllib.request.build_opener()
    opener.addheaders = [('User-Agent',ua)]
    urllib.request.install_opener(opener)
def get_page(url):
    web_page = urllib.request.urlopen(url)
    return web_page.read().decode('utf-8',errors='ignore')
def parse_json(html):
    json_page = json.loads(html)
    highC_list = [json_page[i]['Temperatures']['highC'] for i in range(len(json_page))]
    lowC_list = [json_page[j]['Temperatures']['lowC'] for j in range(len(json_page))]
    date_list = [json_page[k]['Temperatures']['highTmISO'][:10] for k in range(len(json_page))]
    return highC_list, lowC_list, date_list
def save_to_csv(highC_list,lowC_list,date_list,i):
    file_dir = os.path.join(os.getcwd(),'weather/')
    table = pd.DataFrame({'highC':highC_list,'lowC':lowC_list},index=date_list)
    table.to_csv(os.path.join(file_dir,'{:0>2d}.csv'.format(i),encoding='utf-8'))
def main(url,i):
    setup()
    html = get_page(url)
    highC_list, lowC_list, date_list = parse_json(html)
    save_to_csv(highC_list,lowC_list,date_list,i)
if __name__ == "__main__":
    if os.path.exists('weather') == False:
        os.mkdir('weather')
    url_list = generate_url_list(35)
    i = 0
    for url in url_list:
        main(url,i+1)
        print('阶段{}/{}完成！'.format(i+1,len(url_list)))
        time.sleep(30)
        i += 1