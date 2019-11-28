'''
@Author: Senkita
'''

import os
import zipfile

def main(file_dir):
    for filename in os.listdir():
        if zipfile.is_zipfile(filename):
            if os.path.exists(file_dir) == False:
                os.mkdir(file_dir)
            file = zipfile.ZipFile(filename)
            file.extractall(path=file_dir)
            file.close()
            os.remove(filename)
    for filename in os.listdir(file_dir):
        if filename[-4:] == '.csv':
            os.rename(os.path.join(file_dir,filename),os.path.join(file_dir,'{}-{}.csv'.format(filename[:4],filename[4:6])))

if __name__ == '__main__':
    file_dir = os.path.join(os.getcwd(), 'data/')
    main(file_dir)