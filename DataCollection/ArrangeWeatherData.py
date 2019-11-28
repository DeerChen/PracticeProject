'''
@Author: Senkita
'''

import pandas as pd
import os

def main(file_dir):
    if os.path.exists(os.path.join(file_dir,'weather.csv')):
        os.remove(os.path.join(file_dir,'weather.csv'))
    if os.path.exists(file_dir):
        file_list = sorted(os.listdir(file_dir))
        for file in file_list:
            if file == '01.csv':
                first_table = pd.read_csv(os.path.join(file_dir,file),header=None)[1:]
                first_table.to_csv(os.path.join(file_dir,'weather.csv'),mode='a',index=False,header=['date','highC','lowC'])
            if file[-4:] == '.csv' and file != '01.csv':
                table = pd.read_csv(os.path.join(file_dir,file),header=None)[1:]
                table.to_csv(os.path.join(file_dir,'weather.csv'),mode='a',index=False,header=False)

if __name__ == '__main__':
    file_dir = os.path.join(os.getcwd(),'weather/')
    main(file_dir)