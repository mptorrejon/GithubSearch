import angular from 'angular';
import Body from '../components/body/body';
import Search from '../components/search/search.module';
import './app.scss';
//because app should only contain the skelon of the application I will omit a template.html file
let App = angular.module('MyApp',[ Body, Search])
	.component('app', {
		template: `
			<div class="main-container">
				<search-section></search-section>
				<body-section></body-section>
			</div>
		`,
		controller: class AppCtrl{
			constructor(){
				console.log("AppCtrl loaded");
			}
		}
	}).name;

export default App;