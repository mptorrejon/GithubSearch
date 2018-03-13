import Rx from 'rxjs/Rx';
import './search.scss';

export default class SearchComponent{
	constructor(SearchService){
		console.log("SearchComponent Loaded!");
		this._searchService = SearchService;
	}

	//will check user input to capture <<enter key>>
	isEnter(e, val){
		if(e.keyCode===13)
			this.searchUser(val);
		return;
	}
	
	searchUser(val){
		this._searchService.searchUser(val).then(d=>{
			// console.log(d);
			this._searchService.setUserData(d);
			//lets asssume that promises will resolve, implement reject|error for real cases
			let repoPromise = new Promise( (resolve, reject)=>{
				this._searchService.searchRepo(d.data.repos_url).then(d=>{
					resolve(d);
				})
			});

			let gitsPromise = new Promise( (resolve, reject)=>{
				this._searchService.searchGists(d.data.login).then(d=>{
					resolve(d);
				})
			});
			//resolve both promises when they are complete
			Promise.all([repoPromise, gitsPromise]).then(d=>{
				// console.log(d);
				this._searchService.setUserRepo( d[0] );
				this._searchService.setUserGists( d[1] );
			});
		});

		
	}
}