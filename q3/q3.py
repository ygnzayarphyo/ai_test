import io
from bs4 import BeautifulSoup
import cherrypy

output="<h1>Scraping with Python</h1>"
class HelloWorld(object):
    @cherrypy.expose
    def index(self):
        return output

f = io.open("resources/webpage.htm", mode="r", encoding="utf-8")
rawHtml=f.read()

soup = BeautifulSoup(rawHtml, 'lxml')
tag=soup.section

for tag in soup.find_all():
    if ("topics transition clearfix" in str(tag)) and tag.name=='a':
        soup = BeautifulSoup(str(tag), 'lxml')
        for innerTag in soup.find_all():
            if innerTag.name=="img" and ("icon" not in str(innerTag)):
                array=soup.text.split(" ", 1)
                output+= ("<p>date: "+array[0]+"</p>")
                output+= ("<p>"+array[1]+"</p>")
                output+= (str(innerTag).replace("./webpage_files/", "http://www.lumine.ne.jp/pict/").replace(">"," width=50px, height=50px /></br>"))
                output+=("------")

cherrypy.quickstart(HelloWorld())
