import Rx from 'rxjs/Rx';

const baseUrl = "https://api.github.com";

class SearchService{
	constructor($http){
		this._http = $http;
		this.uri = "/users/";
		this.userData = [];
		this.repoData = [];
		this.gistData = [];

		this.userData$ = new Rx.ReplaySubject();
		this.repoData$ = new Rx.ReplaySubject();
		this.gistData$ = new Rx.ReplaySubject();
		this.newSearch$ = new Rx.BehaviorSubject(false);
	}
	/*
		@setter will trigger next to pass on data and set current data so it can be accessed
		without making another http call. It can also be done using SubjectBehavior using getValue API.
		@getter will return data set by setter
	*/

	searchUser(myval){
		this.newSearch$.next(true);
		return this._http.get(baseUrl+this.uri+myval);
	}

	searchRepo(myurl){
		return this._http.get(myurl);
	}

	searchGists(mylogin){
		let url = "https://api.github.com/users/"+mylogin+"/gists";
		return this._http.get(url);
	}

	setUserData(mydata){
		this.userData = mydata;
		this.userData$.next(mydata);
	}
	//if using BehaviorSubject we can use getValue and get the latest value emitted
	//will remove setter and getters
	getUserData(){
		return this.userData;
	}
	setUserRepo(mydata){
		this.repoData$.next(mydata);
	}
	getUserRepo(){
		return this.repoData;
	}

	setUserGists(mydata){
		this.gistData$.next(mydata);
	}
	getUserGists(){
		return this.gistData;
	}
}

export default SearchService;