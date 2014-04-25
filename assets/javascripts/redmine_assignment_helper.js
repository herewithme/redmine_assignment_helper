$(function() {
	// Append dialog on footer
	$("body").append('<div id="rah-dialog" style="display:none;" title="Are you sure ?"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 40px 0;"></span><span id="dynamic-text"></span></p></div>');

	// Save assigned user when select change
	var new_assigned_id = 0;
	$('#issue_assigned_to_id').on('change', function() {
		new_assigned_id = this.value;
	});

	// Hook form new issue submission
	$(".new_issue input[name='commit'], .new_issue input[name='continue']").click(function(event) {
		// Get form related
		var the_issue_form = $(event.target).closest("form");

		// No assignement for any user ?
		if ($("#issue_assigned_to_id").val() == '') {
			// Kill event
			event.preventDefault();

			// Set right text for dialog
			$('#dynamic-text').text('Create a ticket with no assigned person, not alert person (no email). Your ticket may go to the trap-door. We recommend that you set one!');

			// Open dialog
			$("#rah-dialog").dialog({
				resizable: false,
				height: 210,
				width: 350,
				modal: true,
				buttons: {
					"Create ticket": function() {
						the_issue_form.submit();
					},
					"Cancel": function() {
						$(this).dialog("close");
					}
				}
			});
		} else {
			// Kill event
			event.preventDefault();

			// Add assigned user as watcher
			$("#issue_watcher_user_ids_" + new_assigned_id).find('input').prop('checked', true);

			// Exec form
			the_issue_form.submit();
		}
	});

	// Get original value of assigned ID
	var original_assigned_id = $(".edit_issue #issue_assigned_to_id").val();

	// Hook form update issue submission
	$(".edit_issue input[name='commit'], .edit_issue input[name='continue']").click(function(event) {
		// Get form related
		var the_issue_form = $(event.target).closest("form");

		// No assignement for any user ?
		if ($("#issue_assigned_to_id").val() == original_assigned_id) {
			// Kill event
			event.preventDefault();

			// Set right text for dialog
			$('#dynamic-text').text('You are about to update a ticket without reassign to another person. This means that only observers of the ticket will be notified. If there is no observer, no one shall be notified.');

			// Open dialog
			$("#rah-dialog").dialog({
				resizable: false,
				height: 210,
				width: 350,
				modal: true,
				buttons: {
					"Update ticket": function() {
						the_issue_form.submit();
					},
					"Cancel": function() {
						$(this).dialog("close");
					}
				}
			});
		} else {
			// Kill event
			event.preventDefault();

			// Add assigned user as watcher
			var checkbox_parent = $("#users_for_watcher");
			checkbox_parent.find('input[value=' + new_assigned_id + ']').prop('checked', true);

			// Exec form
			the_issue_form.submit();
		}
	});
});

/*
 // Hook form submission for new issue (form event)
 $(".edit_issue").submit(function( event ) {
 var assigned_to_id = $("#issue_assigned_to_id").val();
 $("#issue_watcher_user_ids_" + assigned_to_id).find('input').prop('checked', true);
 });
 
 // Hook form submission for update issue (form event)
 $(".new_issue").submit(function( event ) {
 var assigned_to_id = $("#issue_assigned_to_id").val();
 var checkbox_parent = $("#users_for_watcher");
 checkbox_parent.find('input[value=' + assigned_to_id + ']').prop('checked', true);
 });
 
 // Hook form new issue submission (buttons)
 $(".new_issue input[name='commit'], .new_issue input[name='continue']").click(function (event) {
 var assigned_to_id = $("#issue_assigned_to_id").val();
 $("#issue_watcher_user_ids_" + assigned_to_id).find('input').prop('checked', true);
 });
 
 // Hook form update issue submission (buttons)
 $(".edit_issue input[name='commit'], .edit_issue input[name='continue']").click(function (event) {
 var assigned_to_id = $("#issue_assigned_to_id").val();
 var checkbox_parent = $("#users_for_watcher");
 checkbox_parent.find('input[value=' + assigned_to_id + ']').prop('checked', true);
 });
 */