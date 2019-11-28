'''
@Author: Senkita
'''

import pandas as pd
from sqlalchemy import create_engine
from datetime import datetime
from sqlalchemy.types import NVARCHAR, Float, Integer
import sqlalchemy
import os

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
    engine = create_engine('mysql+pymysql://用户名:密码@主机名:3306/data')
    return engine.connect()
def main():
    filename = os.path.join(os.getcwd(),'weather/weather.csv')
    df = pd.read_csv(filename,parse_dates=['date'])
    conn = create_connection()
    dtypedict = map_types(df)
    df.to_sql(name='weather',
              con=conn,
              if_exists='replace',
              index=False,
              dtype=dtypedict)
    os.remove(filename)
if __name__ == '__main__':
    main()