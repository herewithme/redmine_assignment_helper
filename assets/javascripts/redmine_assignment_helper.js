$(function(){
	// Append dialog on footer
	$("body").append('<div id="dialog-confirm" style="display:none;" title="Are you sure ?">' 
				+ '<p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>'
				+ 'Create a ticket with no assigned person, not alert person (no email). Your ticket may go to the trap-door. We recommend that you set one!</p>'
				+ '</div>' );

	// Follow form submission
	$( "#issue-form" ).submit(function( event ) {
		event.preventDefault();

		// No assignement ?
		if ( $("#issue_assigned_to_id").val() == '' ) {
			// Open dialog
			$( "#dialog-confirm" ).dialog({
				resizable: false,
				height:210,
				width:350,
				modal: true,
				buttons: {
					"Create ticket": function() {
						//$( this ).dialog( "close" );
						$("#issue-form").submit();
					},
					"Cancel": function() {
						$( this ).dialog( "close" );
					}
				}
			});
		}
	});
});