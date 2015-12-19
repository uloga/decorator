Decorator, new release is moving to [Modulr.css](https://github.com/uloga/modulr.css)
==========
New version soon at: [Decorator.io](http://decorator.io) [VIEW NEW HTML/CSS EXAMPLES](http://new.codable.org)

NOTE:
----

The framework is being rewritten from scratch. A brand new modular and lighter angular.js supported version of framework and a new extensive and responsive documentation is coming soon here on github
***


About:
----
Decorator, an easy to implement and use component based front-end framework for creating web and mobile supported applications. 
Decorator is based on HTML, CSS and Javascript. It includes lot's of ready to use pre-built components. 


<img src="http://decorator.codable.org/img/browsersupport.jpg" width="100%"></a>

How To:
-------

Step one is to include the main decorator.css file into your projects file head section. If you want to use ttf or spire icons you need to include those css files as well and those need to be included right below the main decorator.css file. Next step is to create a theme.css file and include that one below all of the main decorator files, you can now make all your changes in theme.css file.

Responsive Design:
------------------

After you've included the main decorator.css file it's easy to make your layout responsive, all you have to do is add "fluid" class to your layouts body tag. Your layout is now responsive. However, if you want your navbar to act as a responsive menu; then you have to follow few more steps: Step one is to include the jquery into your footer section right above where "body" tag ends. After that's done include dc.menu.js file that comes with decorator js plugins right below jquery. You can now call your navbar selector and add responsive menu to it by adding few more lines of code like in example shown below:

```javascript
<script type='text/javascript'>

$(document).ready(function(){
    $('.navbar').dcMenu();
});
  	
</script>
  	
````
IE8 Known Issues: grid system fix:
-----------
NOTE: this is not the block system... it's a (ul > li) list based grid as in this example: http://codable.org/templates/grids/
***
| Grid System  |  Selector |  jQuery Fix | 
| ------------- |:-------------|:-----|
| 2 Column | .grid2 | ``` $('.grid2 li:nth-child(2n+0)').css({"margin-right": "0"}); ```
| 3 Column | .grid3 | ``` $('.grid3 li:nth-child(3n+0)').css({"margin-right": "0"}); ```
| 4 Column | .grid4 | ``` $('.grid4 li:nth-child(4n+0)').css({"margin-right": "0"}); ```
| 5 Column | .grid5 | ``` $('.grid5 li:nth-child(5n+0)').css({"margin-right": "0"}); ```
| 6 Column | .grid6 | ``` $('.grid6 li:nth-child(6n+0)').css({"margin-right": "0"}); ```

IE8 grid fix code example:
***
```javascript
<script type='text/javascript'>

$(document).ready(function(){
    $('.grid3 li:nth-child(3n+0)').css({"margin-right": "0"});
});
  	
</script>
```


Examples:
----------
Few examples included to get you started. Click on thumbnails to view live demo.

| Screenshot    | Description  | Link       
|:------------- |:-------------|:-----|
| <a class="link" href="http://codable.org/templates/one/" target="_blank"><img src="http://decorator.codable.org/img/examples/one.jpg" width="180"></a>    | One Column Responsive Layout |<a class="grid-title" href="http://codable.org/templates/one/" target="_blank">View Example</a></p> |
| <a class="link" href="http://codable.org/templates/two/" target="_blank"><img src="http://decorator.codable.org/img/examples/two.jpg" width="180"></a>    | Two Column Responsive Layout |<a class="grid-title" href="http://codable.org/templates/two/" target="_blank">View Example</a></p> |
| <a class="link" href="http://codable.org/templates/three/" target="_blank"><img src="http://decorator.codable.org/img/examples/three.jpg" width="180"></a>    | Three Column Responsive Layout |<a class="grid-title" href="http://codable.org/templates/three/" target="_blank">View Example</a></p> |
| <a class="link" href="http://codable.org/templates/grids/" target="_blank"><img src="http://decorator.codable.org/img/examples/grids.jpg" width="180"></a>    | Responsive Grids Layout |<a class="grid-title" href="http://codable.org/templates/grids/" target="_blank">View Example</a></p> |
| <a class="link" href="http://codable.org/templates/admin/" target="_blank"><img src="http://decorator.codable.org/img/examples/admin.jpg" width="180"></a>    | Responsive Admin Layout |<a class="grid-title" href="http://codable.org/templates/admin/" target="_blank">View Example</a></p> |


Freebies:
------
Some freebies included for now, more free templates soon. All of the upcoming templates will be fully angular.js supported

| Screenshot    | Description  | Demo       
|:------------- |:-------------|:-----|
| <a class="link" href="http://portfolio.codable.org/" target="_blank"><img src="http://decorator.codable.org/img/portfolio.png" width="200"></a>    | One Page Responsive Portfolio Template |<a class="grid-title" href="http://portfolio.codable.org/" target="_blank">View Demo</a></p> |
| <a class="link" href="http://start.codable.org/" target="_blank"><img src="http://decorator.codable.org/img/startup.jpg" width="200"></a>    | Responsive 5 page Startup Template |<a class="grid-title" href="http://start.codable.org/" target="_blank">View Demo</a></p> |
| <a class="link" href="http://blog.codable.org/" target="_blank"><img src="http://decorator.codable.org/img/parallex.jpg" width="200"></a>    | 6 Page Responsive Parallax Template |<a class="grid-title" href="http://blog.codable.org/" target="_blank">View Demo</a></p> |



What's Next?
------------
I'm currently rewriting the framework into a lighter cleaner version also working on php css preprocessor.
Please stay tuned by following the project here on github. 


For more info and examples please check out: [Decorator Dox](http://decorator.codable.org) 
