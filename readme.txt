Message From 
		D-B32523-1 LO IOK FAI
		D-B32600-2 CHEONG HONG KIN

-----------------------
For running the website
-----------------------

1. You need to install Node.js, you may want to see  https://nodejs.org/en/ 

2. You can open the Node.js command prompt and cd to the directory of the file.
	e.g " cd Desktop\mediaproject "

3. You can try to type " node server.js " in command prompt.

4. If the step 3 can show " HTTP伺服器在 http://127.0.0.1:8080/ 上運行 "
	then you can open your browser and go to localhost:8080/index 
	(Please make sure the port 8080 did not be occupied)


5. Otherwise, If step 3 did not success, then you need to install Node.js modules
	
	You can follow like this,

	In your Node.js command prompt type below(line by line),
	
	npm install express 

	npm install request

	npm install cheerio

	npm install hbs

	npm install body-parser

6. Then you can redo step 3.

	