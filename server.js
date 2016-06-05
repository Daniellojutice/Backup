
var express = require('express');
var app = express();
var request  = require("request");
var cheerio = require("cheerio");
var url = require("url");
var hbs = require('hbs');
var bodyParser =require('body-parser');

//var superagent = require('superagent');
//var fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));


app.set('view engine','html');
app.engine('html',hbs.__express);

app.post('/search',function(req,res,next){

	request({
	  
	url: "http://www.dictionary.com/browse/"+req.body.dic+"?s=ts",
	  method: "GET"
	}, function(error,reponse,sres) {
	  if(error || !sres) 
	  	{ return; }
	  
	  var $ = cheerio.load(sres);

	  var wrong1 = $(".closest-result");


	  if (wrong1[0]) {
	  	var value = "The spelling is wrong!!!";
	  	var word_list = $(".new-words-list").find("li").children();
	  	var word_list_count = $(".new-words-list").find("li").children().length;

	  	var word_sugg = $(".suggestions").find("a").children();
	  	var word_sugg_count = $(".suggestions").find("a").children().length;
	  	var spell_list = new Array();

	  	if (word_list.length > 0) {
	  		for (var i = 0; i < word_list_count; i++) {
	  			spell_list[i] = word_list[i].lastChild.nodeValue;
	  		}
	  	}

	  	if (word_sugg.length > 0) {
	  		for (var i = 0; i < word_sugg_count; i++) {
	  			spell_list[i] = word_sugg[i].lastChild.nodeValue;
	  		}
	  	}

	  }else{
	  	var value = "The spelling is correct^^ "
	  }

	  
	 res.render('search',{link:value, final_list:spell_list});
	 
});
		
	

});

function weatherRequest(urlToCall,callback) {

	request({

	url: urlToCall,
	method: "GET"
	}, function(error,reponse,body) {

		if (error || !body) {
			console.log("Error or no Body");
			return;
		}

		if (reponse.statusCode == 200) {
			var $ = cheerio.load(body);
			
			var result = url.parse("http://www.smg.gov.mo/smg/c_index.htm");

			var info = $('img[name="SLIDESIMG"]').attr('src');

			var link = url.resolve(result.pathname, info);
			var final_link = result.hostname+link;

			return callback(final_link);
		}

	});
}

function stockindexRequest(urlToCall,callback) {
	request({

	url: urlToCall,
	method: "GET"
	}, function(error,reponse,body) {

		if (error || !body) {
			console.log("Error or no Body");
			return;
		}

		if (reponse.statusCode == 200) {
			var $ = cheerio.load(body);

			var info = $('#ref_7354851_l').text();

			return callback(info);
		}

	});

}

function pictureRequest(urlToCall,callback) {

	request({

	url: urlToCall,
	method: "GET"
	}, function(error,reponse,body) {

		if (error || !body) {
			console.log("Error or no Body");
			return;
		}

		if (reponse.statusCode == 200) {
			var $ = cheerio.load(body);
			var pic = $('#imgView').attr('src');

			return callback(pic);
		}

	});
}

app.get('/index', function(req,res){
	var maxNum = 789470;  
	var minNum = 789270;

	var random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;    
	var urlpic = "http://www.tooopen.com/view/"+random+".html";
	var url = "http://www.smg.gov.mo/smg/c_index.htm";
	var urlindex = "https://www.google.com.hk/finance";
	
	weatherRequest(url,function(link){
		pictureRequest(urlpic,function(piclink){
			stockindexRequest(urlindex,function(indexlink){
				res.render('show',{href:link,pichref:piclink,stockindex:indexlink});	
			})
		})

	});
	
	
});


app.get('/',function(req,res){

	res.send("Home Page");
	res.end();
});



app.listen(8080,'127.0.0.1',function(){
    console.log('HTTP伺服器在 http://127.0.0.1:8080/ 上運行');

});

