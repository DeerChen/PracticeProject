'''
@Author: Senkita
'''

import pymysql
import pandas as pd
import numpy as np
import folium
from folium.plugins import HeatMap
import webbrowser

config = dict(host='主机名',
              user='用户名',
              passwd='密码',
              cursorclass=pymysql.cursors.DictCursor)
conn = pymysql.Connect(**config)
conn.autocommit(1)
cursor = conn.cursor()
cursor.execute('use data;')
cursor.execute("SET sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';")
sql = 'select count(*) from `201902` group by `start station name` order by count(*)'
cursor.execute(sql)
num_list = []
for i in cursor.fetchall():
    for j in list(i.values()):
        num_list.append(j)
pring(np.percentile(num_list, (25,50,75),interpolation='midpoint'))
top_file = pd.read_csv('top.csv')
bottom_file = pd.read_csv('bottom.csv')
sql_top = ["select distinct `start station latitude`, `start station longitude` from `201902` where `start station name` like '"+str(i)+"'" for i in top_file['name']]
sql_bottom = ['select `start station latitude`,`start station longitude` from (select `start station name`,`start station latitude`,`start station longitude` from `201902` group by `start station name` having count(*)<361 order by count(*)) as new where new.`start station name` like "'+str(i)+'"' for i in bottom_file['name']]
popular_list = []
less_list = []
for m in range(len(sql_top)):
    cursor.execute(sql_top[m])
    coordinate_list = list(cursor.fetchone().values())
    popular_list.append([coordinate_list[0],coordinate_list[1],top_file['sum'][m]])
for n in range(len(sql_bottom)):
    cursor.execute(sql_bottom[n])
    result = cursor.fetchone()
    if result == None:
        continue
    less_list.append(list(result.values()))
cursor.close()
conn.close()
popular_map = folium.Map([40.716667,-74],zoom_start=10,tiles='Stamen Toner')
HeatMap(popular_list,radius=18).add_to(popular_map)
less_map = folium.Map(location=[40.716667,-74],zoom_start=10,tiles='Stamen Terrain')
for i in less_list:
    folium.Marker(location=i,
                  icon=folium.Icon(color='red',icon='info-sign')).add_to(less_map)
popular_map.save('popularmap.html')
less_map.save('lessmap.html')
webbrowser.open('popularmap.html')
webbrowser.open('lessmap.html')