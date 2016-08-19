import requests
import urllib

def read_file(name_file):
    with open(name_file, 'r') as files:
        for url_img in files:
            getimg(url_img.replace('\n', ''))


def getimg(url):
    url_img = urllib.parse.unquote(url)
    get_img = requests.get(url_img)
    out_img = open(url_img.split('/')[-1], "wb")
    out_img.write(get_img.content)
    out_img.close()

read_file('test.txt');
