/* Author: Roy Ronalds, BitLucid, Inc. http://bitlucid.com

*/

// Guarantee that there is a console to prevent errors while debugging.
if (typeof(console) == 'undefined') { console = { log: function() { } }; }


$(function(){ // ON domload.
	
	var whitelist = ["portfolio","news","aboutus","pricing"];
	var sections = $('#portfolio, #news, #aboutus, #pricing');
	var otherSections = $('#portfolio, #news, #pricing'); // Everything except aboutus starting default.
	var hash = window.location.hash;
	var id = false;
	if(null !== hash){ // If a hash was on the url, show that section and hide all others.
		var dirtyId = hash.slice(1); // Hack the pound sign off.
		if($.inArray(dirtyId, whitelist) !== null){
			id = '#'+dirtyId; // Allocate the whitelisted id to the outer id variable.
		}
	}
	
	console.log('Current hash and id are', hash, id);
	
	if(!id){
		otherSections.hide(); // Hide all but the default starting section.
	} else {
		var $selected = $(id);
		$selected.show(); // Make sure selected is showing.
		sections.not($selected).hide(); // Hide all extra sections.
	}

	
	// Add click show/hide to the top nav elements.
	$('nav a').click(function(elem){
		var target = $(this).attr('href');
		var $selected = $(target);
		$selected.show();
		sections.not($selected).hide(); // Hide all extra sections.
	});
	

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
	
	// Add class hooks to tables
	/* For zebra striping */
    $("table tr:nth-child(odd)").addClass("odd-row");
	/* For cell text alignment */
	$("table td:first-child, table th:first-child").addClass("first");
	/* For removing the last border */
	$("table td:last-child, table th:last-child").addClass("last");
	
	
}); // End of domload.



