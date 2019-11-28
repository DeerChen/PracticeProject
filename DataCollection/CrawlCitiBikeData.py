'''
@Author: Senkita
'''

import urllib.request

def generate_list():
    month_list = ['{:0>4d}{:0>2d}'.format(i,j+1) for i in range(2013,2020) for j in range(12)]

    url_list = ['https://s3.amazonaws.com/tripdata/{}-citibike-tripdata.zip'.format(month) for month in month_list[5:48]] + ['https://s3.amazonaws.com/tripdata/{}-citibike-tripdata.csv.zip'.format(month) for month in month_list[48:-10]]

    return month_list, url_list

def main():
    month_list, url_list = generate_list()
    for i in range(len(url_list)):
        urllib.request.urlretrieve(url_list[i],'{}.zip'.format(month_list[5+i]))

if __name__ == '__main__':
    main()