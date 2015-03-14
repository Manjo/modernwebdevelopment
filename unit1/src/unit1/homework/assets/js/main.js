
/* TO DO
 * 2) Create template for carousel (slider) to make it's content dynamic
 * and for example change this content according "search" results
 * */

 jQuery(function ($) {

    function showItems(template, dataUrl, parentContainer, headingContainer ) {

        //Compile the HTML from the template
        var compiledTemplate = Handlebars.compile (template);

        //load data json and create new list
        $.getJSON(dataUrl, function(data) {

            //set current heading
            if (data.heading) headingContainer.text(data.heading);

            // vanish previous content, i.e set content '', empty string
            // and append compiled template
            parentContainer.html('').append(compiledTemplate(data.items));

        }).fail(function (jqXHR, textStatus) {
                //error message
                var message = "Error occurred: ";
                message += 'Status code: ' + jqXHR.status;
                if (textStatus === 'parsererror') {
                    //bad  formatted json
                    message += " Requested JSON parse was failed.";
                } else if (textStatus === 'abort') {
                    //network problem
                    message += " Ajax request was aborted.";
                }
                // alert div styled by Bootstrap's CSS classes
                var errorAlert =
                '<div class="alert alert-warning alert-dismissable col-xs-12">' +
                 message +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                '</div>';

                // add DIV with error mesage after "app-heading" HTML element
                //$('#app-heading').after(errorAlert);
        });
    }

    var appHeadingContainer = $('#app-heading');
    var listContainer = $("ul#items-list");
    
    //function for getting 
    function getTemplateAjax(path, callback) {
        var source;
        var template;

        $.ajax({ 
            url: path,
            success: function(data) {
               callback(data);
            }
            //TODO:Should probably do something on failure
        });
    }
    // show featured products list on-load
    function initCarousel(template){
        showItems(template,"assets/data/carousel.json", $("div#featured-product-carousel"), appHeadingContainer);
    }

    function initFeaturedProducts(template){
        showItems(template,"assets/data/featured-products.json", listContainer, appHeadingContainer);
    }

    function initSearchResults(template){
        showItems(template,"assets/data/search-results.json", listContainer, appHeadingContainer);
    }


    //These templates should be stored somewhere instead of loading over and over
    getTemplateAjax("assets/templates/featuredProducts.handlebars", initFeaturedProducts);
    getTemplateAjax("assets/templates/carousel.handlebars", initCarousel);

    // action on Submit button click event
    $('#get-data-btn').on("click", function() {
        //hide the featured product carousel with a sliding motion
       $('#featured-product-carousel').slideUp('slow', function(){
           getTemplateAjax("assets/templates/searchResults.handlebars", initSearchResults);           
           //showItems($("#search-results-template"),"assets/data/search-results.json", listContainer, appHeadingContainer);
       });
       $('#searchResults').slideDown('slow');
       //prevent button from submitting forms
       return false;
    });

    $('#homeLink').on("click", function() {
        //hide the featured product carousel with a sliding motion
        $('#searchResults').slideUp('slow');
        $('#featured-product-carousel').slideDown('slow', function () {
            getTemplateAjax("assets/templates/featuredProducts.handlebars", initFeaturedProducts);
        });
    });


    //Slider has no functionality currently but boy does it look cool
     $(function () {
        $('#slider').slider({
            range: true,
            min: 0,
            max: 2000,
            values: [500, 1500],
            slide: function (event, ui) {
                $("#minAmount").val("$" + ui.values[0]);
                $("#maxAmount").val("$" + ui.values[1]);
            }
        });

        $("#minAmount").val("$" + $("#slider").slider("values", 0));
        $("#maxAmount").val("$" + $("#slider").slider("values", 1));
    })


});
