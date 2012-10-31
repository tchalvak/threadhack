/* Author: Roy Ronalds, BitLucid, Inc. http://bitlucid.com

*/

// Adding loading spinner into an element.
function addSpinnerTo(container){
	$(container).prepend('<progress max="100"></progress>'); // Add html5 progress element.
}
  
// Add a gallery inside a container, only once.
function addGallery(data, container_id, all_galleries_class){
	var gallery, container_name;
	if(!all_galleries_class){
		all_galleries_class = '.gallery'; // By default, gallery class is gallery.
	}
	$(all_galleries_class).hide(); // Hide all galleries.
  	var $container = $(container_id).show(); // Show just this gallery.
	if(!galleries_loaded[container_id]){ // Gallery not yet loaded.
      	addSpinnerTo($container); // Add progress bar to the container.
		gallery = ich.gallery(galleryData); // Load the template with the data!
      	$container.append(gallery); // Add the gal to the html!
		setTimeout(function(){
	  		$container.find('progress').hide().end(); // Hide the progress bar 			
		}, 2500); // After short delay.
    }
	galleries_loaded[container_id] = 1; // Record that the gallery is now loaded.
	return false;
}

// Guarantee that there is a console to prevent errors while debugging.
if (typeof(console) == 'undefined') { console = { log: function() { } }; }

// Global to store state of whether galleries are loaded.
var galleries_loaded = {
}
var username_encoded = '84361081%40N08';
var galleryData;
// http://www.flickr.com/photos/84361081@N08/sets/72157630952967626/ kids
// http://www.flickr.com/photos/84361081@N08/sets/72157630953059814/ construction
// Paintings: http://www.flickr.com/photos/84361081@N08/sets/72157630952996166/
// stones: http://www.flickr.com/photos/84361081@N08/sets/72157630952932480/
/*
galleryData = {
	signs: {
	  	title: 'Various signs I have created',
	  	desc: 'I painted these various signs for different businesses and organizations.',
	  	set_id: '72157630952898014',
	  	page_base_url: '%2Fphotos%2F'+username_encoded+'%2Fsets%2F72157630952898014%2F',
	},
	construction: {
	  	title: 'Various construction jobs',
	  	desc: 'I do high-quality home renovation, repair, painting, and construction.',
	  	set_id: '72157630953059814',
	  	page_base_url: '%2Fphotos%2F'+username_encoded+'%2Fsets%2F72157630953059814%2F',
	},
	paintings: {
	  	title: 'Various paintings',
	  	desc: 'I painted these various paintings etc etc.',
	  	set_id: '72157630952996166',
	  	page_base_url: '%2Fphotos%2F'+username_encoded+'%2Fsets%2F72157630952996166%2F',
	},
	kids: {
	  	title: 'Various kid paintings',
	  	desc: 'I painted these paintings as reinventions of drawings make by kids, or just children\'s portraits.',
	  	set_id: '72157624613061112',
	  	page_base_url: '%2Fphotos%2F'+username_encoded+'%2Fsets%2F72157630952967626%2F',
	},
	stones: {
	  	title: 'My Stone Painting Series',
	  	desc: 'I began a series of oil paintings based on the soothing textures and shapes of river stones.',
	  	set_id: '72157630952932480',
	  	page_base_url: '%2Fphotos%2F'+username_encoded+'%2Fsets%2F72157630952932480%2F',
	}
};
*/


$(function(){ // ON domload.
	
	var whitelist = ["portfolio","news","aboutus"];
	var sections = $('#portfolio, #news, #aboutus');
	var otherSections = $('#portfolio, #news');
	var hash = window.location.hash;
	var id = false;
	if(hash){ // If a hash was on the url, show that section and hide all others.
		var dirtyId = hash.slice(1); // Hack the pound sign off.
		if($.inArray(dirtyId, whitelist)){
			var id = '#'+dirtyId; // Allocate the whitelisted id to the id variable.
		}
	}
	
	console.log(hash, id);
	
	if(id){
		var $selected = $(id);
		$selected.show(); // Make sure selected is showing.
		sections.not($selected).hide(); // Hide all extra sections.
	} else {
		otherSections.hide(); // Hide all but the default starting section.
	}

	
	// Add click show/hide to the top nav elements.
	$('nav a').click(function(elem){
		var target = $(this).attr('href');
		var $selected = $(target);
		$selected.show();
		sections.not($selected).hide(); // Hide all extra sections.
	});
	
	/*
	// In the intro paragraph, load the gallery of the links clicked.
	$('#intro a, #gallery button').click(function(){
		var $element = $(this);
		var target = $element.attr('href');
		$(target).show(); // Show the gallery.
		var subcat = $element.data('subcat'); // The gallery to load.
		if(subcat){
			// If the subcat exists, show the matching gallery.
			var gal = findGallery(subcat);
			if(gal){
				addGallery(gal, '#'+subcat+'_gallery', '.gallery');
			}
		}
		
	});
	*/
	
	// Quick function to return a gallery object based on a string.
	function findGallery(gname){
		if(galleryData[gname]){
			console.log(galleryData[gname], galleryData);
			console.log(galleryData[gname].set_id);
			return galleryData[gname];
		} else {
			console.log(gname, 'unavailable in gallery set', galleryData);
			return false;
		}
	}
	
	/*
	$('#gallery button').click(function(){
		var subcat = $(this).data('subcat');
		var gal = findGallery(subcat);
		return gal? addGallery(gal, '#'+subcat+'_gallery', '.gallery') : false;
	});
	*/

	// Make the site search operate nicely.
	var form = $('#site-search').show().find('form'); // Show the hidden search area.
	form.submit(function(){
		var searchval = $('[name=search]', form).val();
		var base = $('[name=base]', form);
		var baseval = base.val();
		// Set the search term into the q form input field's value.
		var sum = escape(searchval)+' '+baseval; // Concat the search term
		$('[name=q]', form).val(sum); // Stick that new search term into the hidden field.
	});
	
	
	
	
});



