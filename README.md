Videogular Subtitle Plugin
==========================

**Subtitle plugin for videogular HTML5 video player**

You could see videogular project here: http://www.videogular.com

**Documentation**

To use this plugin inject this module to you angular project and add subtitle object on config var.

```
'use strict';
angular.module('myApp',
  [
    "com.2fdevs.videogular",
		"com.2fdevs.videogular.plugins.controls",
		"com.2fdevs.videogular.plugins.overlayplay",
		"com.2fdevs.videogular.plugins.buffering",
		"com.2fdevs.videogular.plugins.poster",
		"videogular.plugins.texttrack"
	]
)
.controller('MainCtrl', function ($scope, $sce) {
  $scope.config = {
    sources: [
      {src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
      {src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
      {src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
    ],
    theme: {
      url: "styles/themes/default/videogular.css"
    },
    plugins: {
			poster: {
				url: "assets/images/videogular.png"
			},
		  subtitle: [{
        kind: "captions",
			  src: $sce.trustAsResourceUrl("assets/subs/pale-blue-dot.vtt"),
			  srclang: "en",
			  label: "English"
      }]
    }
  };
});
```

Then add `<track>` tag inside video tag and add `<vg-text>` directive inside `<vg-controls>`

```
<videogular vg-theme="config.theme">
    <vg-video vg-src="config.sources">
        <track></track> <!-- add html5 text track tag -->
    </vg-video>
    <vg-controls vg-autohide="config.autoHide" style="height: 50px;">
        <vg-play-pause-button></vg-play-pause-button>
        <vg-timeDisplay>{{ API.currentTime | date:'mm:ss' }}</vg-timeDisplay>
        <vg-scrubBar>
            <vg-scrubbarcurrenttime></vg-scrubbarcurrenttime>
        </vg-scrubBar>
        <vg-timeDisplay>{{ API.totalTime | date:'mm:ss' }}</vg-timeDisplay>
        <vg-volume>
            <vg-mutebutton></vg-mutebutton>
            <vg-volumebar></vg-volumebar>
        </vg-volume>
        <vg-text vg-text-src="config.plugins.subtitle"></vg-text> <!-- vg-text directive with subtile config var -->
        <vg-fullscreenButton></vg-fullscreenButton>
    </vg-controls>
</videogular>
```

Another thing you might add css style for subtitle controls

**License**

MIT License
