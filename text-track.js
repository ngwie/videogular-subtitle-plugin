/**
 * Text track plugin for Videogular v0.4.0 http://videogular.com
 * Farhan Anggawie https://github.com/farhan-repo
 * License: MIT
 */
"use strict";
angular.module("videogular.texttrack", [])
	.directive("vgText", [function() {
		return {
			require: "^videogular",
			restrict: "E",
			scope: {
				textTracks: "=vgTextSrc"
			},
			template: 
				'<span class="glyphicon glyphicon-subtitles"></span>' + // Still using Glyphicons Bootstrap icon
				'<ul ng-show="selectorVisibility">' +
					'<li ng-repeat="track in textTracks" ng-click="changeCaption(track)">{{track.label}}</li>' +
					'<li ng-click="changeCaption()">Off</li>' +
				'</ul>',
			controller: ["$scope", function($scope) {
				var activeTrack;

				$scope.changeCaption = function(track) {
					var tag = $scope.trackTag[0];

					if (track) {
						if (!activeTrack || track != activeTrack) {
							activeTrack = track;
							tag.src = "";
							tag.src = activeTrack.src;
							tag.kind = activeTrack.kind;
							tag.srclang = activeTrack.srclang;
							tag.label = activeTrack.label;
						}
						if (tag.track.mode != "showing")
							tag.track.mode = "showing";
					} else {
						tag.track.mode = "hidden";
					}
				}
			}],
			link: function(scope, elem, attr, API) {
				scope.trackTag = angular.element(API.videoElement).find("track");

				function onMouseOverCaptions() {
					scope.selectorVisibility = true;
					scope.$apply();
				}

				function onMouseLeaveCaptions() {
					scope.selectorVisibility = false;
					scope.$apply();
				}

				function onCaptionSourceChange(newValue, oldValue) {
					if (!oldValue || newValue != oldValue) {
						elem.css("display", (newValue ? "table-cell" : "none"));
						scope.changeCaption();
					}
				}

				elem.bind("mouseover", onMouseOverCaptions);
				elem.bind("mouseleave", onMouseLeaveCaptions);
				scope.$watch("textTracks", onCaptionSourceChange);
			}
		}
	}]);