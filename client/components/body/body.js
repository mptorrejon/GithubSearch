import angular from 'angular';
import template from './body.template.html';
import SearchService from '../search/search.service';
import './body.scss';

let Body = angular.module('Body', []).
component("bodySection", {
	template,
	selector: 'bodySection',
	controller: class bodyCtrl{
		constructor($scope, $http, SearchService){
			this._searchService = SearchService;
			this._http = $http;
			//initializes binding variable needed for view
			this.result = [];
			this.repos = [];
			this.gitsStatus = "";
			this.gists = [];
			this.login = "";
			//subscribes to all observable needed to get data and display
			this._searchService.userData$.subscribe(d=>{
				this.login = d.data.login;
				this.result = d;
				$scope.$applyAsync();
			});
			this._searchService.repoData$.subscribe(d=>{
				this.repos = d.data;
				$scope.$applyAsync();
			});
			this._searchService.gistData$.subscribe(d=>{
				this.gists = d.data;
				$scope.$applyAsync();
				if(d){
					this.gitsStatus = (d.data.length==0)? "Empty...":'';
				}
			});
			this._searchService.newSearch$.subscribe(d=>{
				// console.log(d);
				this.isKeyPressed = d;
			});
		}
		//gets a url as parameter and open a new tab with such content
		openNewTab(url){
			let win = window.open( url, '_blank');
			win.focus();
		}
	}
})
.name;

export default Body;