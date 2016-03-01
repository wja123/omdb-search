$(document).ready(init);

var queryString;
var searchData={};
var searchAllDate={};
var inpStr="";
var year="";
var search="";
var category="";
var imdbLink="http://www.imdb.com/title/";

function init(){
	queryString="http://www.omdbapi.com/?";
	$(".movie-search").click(searchHandler);
	$(".search-all").click(searchAllHandler);
	$(".title-input").on("input",titleInpHandler);
	$(".year-input").on("input",yearInpHandler);
	$(".category-input").on("input",catInpHandler);
	$("#notfound").hide();
	$(".widget-row").hide();
}


function titleInpHandler(){
	inpStr=$(".title-input").val().toLowerCase();

}

function yearInpHandler(){
	year=$(".year-input").val().toString.toLowerCase();

}

function catInpHandler(){
	if($(".category-input").val().toLowerCase() !=="category (optional)"){
		category=$(".category-input").val().toLowerCase();
		console.log(category);
	}else{
		category="";
	}

}


function searchHandler(){
	event.preventDefault();
	console.log("click");

	var searchString=queryString +"t="+inpStr+"&y="+year+"&type="+category;
	$.ajax({
		method:"GET",
		url: searchString,
		success:function(data){

			console.log(data);
			if(data.Response === "False"){
				$("#movie-display-template").hide();
				$("#notfound").show();
			}
			else{
				$("#notfound").hide();
				$("#movie-display-template").show();
				searchData=data;
				searchUpdate(searchData);
			}

		}
	});
}

function searchAllHandler(){
	event.preventDefault();
	event.preventDefault();
	console.log("click");
	inpStr = $(".title-input").val();
	var searchString = queryString+"s="+inpStr;
	$.ajax({
		method:"GET",
		url: searchString,
		success:function(data){

			if(data.Response === 'False'){
				console.log(data.Response);
				$(".widget-row").hide();
				$("#notfound").show();
				$("#movie-display-template").hide();
			}
			else{
				// $("#notfound").css("display","none");
				$(".widget-row").show();
				$("#notfound").hide();
				$("#movie-display-template").hide();
				searchData=data;
				console.log(searchData.Response);
				searchUpdateAll(searchData.Search);
			}
		}	
	});
}

function searchUpdate(inpData){
	$(".widget-row").hide();
	$("#movie-display-template").show();
	$(".poster-image").attr("src",inpData.Poster);
	$(".imdb-link").attr("href",imdbLink+inpData.imdbID+"/");
	$(".movie-title").text(inpData.Title);
	$(".movie-year").text(inpData.Year);
	$(".movie-rated").text(inpData.Rated);
	$(".movie-rating").text(inpData.imdbRating);
	$(".movie-actors").text(inpData.Actors);
	$(".movie-plot").text(inpData.Plot);
}

function searchUpdateAll(inpData){
	$(".widget-row").show();
	$("#movie-display-template").hide();
	var $widgRow = $(".widget-row");
	$widgRow.show();
	for(var i = 0; i <inpData.length; i++){
		console.log(inpData[i]);
		var $widgItem = $("#widget-template").clone();
		$widgItem.remove("id");
		$widgItem.attr("id","add-widget");
		
		$widgItem.find(".widget-title").text(inpData[i].Title);
		$widgItem.find(".widget-category").text(inpData[i].Type);
		$widgItem.find(".widget-id").text(inpData[i].imdbID);
		$widgItem.find(".widget-year").text(inpData[i].Year);
		$widgItem.find(".widget-poster").attr("src",inpData[i].Poster);

		$(".widget-row").append($widgItem);

	}
	$(".widget-row").show();
	$("#widget-template").hide();

}