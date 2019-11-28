'''
@Author: Senkita
'''

import pandas as pd
from sqlalchemy import create_engine
from datetime import datetime
from sqlalchemy.types import NVARCHAR, Float, Integer
import pymysql
import sqlalchemy
import os

def resave(file_dir,year,month):
    titles = ['tripduration',
              'starttime',
              'stoptime',
              'start station id',
              'start station name',
              'start station latitude',
              'start station longitude',
              'end station id',
              'end station name',
              'end station latitude',
              'end station longitude',
              'bikeid',
              'usertype',
              'birth year',
              'gender']
    old_file = pd.read_csv(os.path.join(file_dir,'{:0>4d}-{:0>2d}.csv'.format(year,month)),
                           encoding='gbk',
                           names=titles,
                           parse_dates=['starttime','stoptime','birth year'],
                           low_memory=False)
    if os.path.exists(os.path.join(file_dir,'{:0>4d}{:0>2d}.csv'.format(year,month))):
        os.remove(os.path.join(file_dir,'{:0>4d}{:0>2d}.csv'.format(year,month)))
    old_file[1:].to_csv(os.path.join(file_dir,'{:0>4d}{:0>2d}.csv'.format(year,month)))
    os.remove(os.path.join(file_dir,'{:0>4d}-{:0>2d}.csv'.format(year,month)))
    new_file = pd.read_csv(os.path.join(file_dir,'{:0>4d}{:0>2d}.csv'.format(year,month)),
                           encoding='gbk',
                           parse_dates=['starttime','stoptime','birth year'],
                           low_memory=False)
    new_file.drop(columns='Unnamed: 0',inplace=True)
    return new_file
def map_types(df):
    dtypedict = {}
    for i,j in zip(df.columns,df.dtypes):
        if 'object' in str(j):
            dtypedict.update({i:NVARCHAR(length=255)})
        if 'float' in str(j):
            dtypedict.update({i:Float(precision=2,asdecimal=True)})
        if 'int' in str(j):
            dtypedict.update({i:Integer})
    return dtypedict
def create_connection():
    config = dict(host='主机名',
                  user='用户名',
                  passwd='密码',
                  cursorclass=pymysql.cursors.DictCursor)
    conn = pymysql.Connect(**config)
    conn.autocommit(1)
    cursor = conn.cursor()
    cursor.execute('create database if not exists data')
    cursor.close()
    conn.close()
    engine = create_engine('mysql+pymysql://用户名:密码@主机名:3306/data')
    return engine.connect()
def main(year,month):
    file_dir = os.path.join(os.getcwd(),'data/')
    df = resave(file_dir,year,month)
    conn = create_connection()
    dtypedict = map_types(df)
    df.to_sql(name='{:0>4d}{:0>2d}'.format(year,month),
              con=conn,
              if_exists='replace',
              index=False,
              dtype=dtypedict)
    os.remove(os.path.join(file_dir,'{:0>4d}{:0>2d}.csv'.format(year,month)))
if __name__ == '__main__':
    for year in range(2013,2020):
        if year == 2013:
            for month in range(6,13):
                main(year,month)
        elif year == 2019:
            for month in range(2):
                main(year,month)
        else:
            for month in range(1,13):
                main(year,month)