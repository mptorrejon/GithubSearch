import template from './search.template.html';
import SearchComponent from './search.component';
import SearchService from './search.service';

let Search = angular.module('Search', [])
	.component(
		"searchSection", {
			template:template,
			selector: 'searchSection',
			controller: SearchComponent
		}
	)
	.service('SearchService', SearchService)
	.name;

export default Search;
