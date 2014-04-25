$(function() {
	// Append dialog on footer
	$("body").append('<div id="rah-dialog" style="display:none;" title="Are you sure ?"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 40px 0;"></span><span id="dynamic-text"></span></p></div>');

	// Hook form new issue submission
	$(".new_issue input[name='commit'], .new_issue input[name='continue']").click(function(event) {
		// Get form related
		var the_issue_form = $(event.target).closest("form");

		// No assignement for any user ?
		if ($("#issue_assigned_to_id").val() == '') {
			// Kill event
			event.preventDefault();

			// Set right text for dialog
			$('#dynamic-text').text( redmine_ah.no_assignement );

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
			$("#issue_watcher_user_ids_" + $("#issue_assigned_to_id").val()).find('input').prop('checked', true);

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
			$('#dynamic-text').text( redmine_ah.same_assignement );

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

			// Get form action URL
			$.get($('#watchers a').attr('href'), function(data) {
				ajax_form_url = $('#new-watcher-form').attr('action');
				$('#ajax-modal').dialog('close');
			});

			// Add new watcher
			if (typeof ajax_form_url != 'undefined') {
				$.ajax({
					type: "POST",
					url: ajax_form_url,
					dataType: 'script',
					data: {
						utf8: "✓",
						authenticity_token: jQuery('meta[name=csrf-token]').attr('content'),
						'watcher[user_ids][]': $("#issue_assigned_to_id").val()
					}
				});
			}

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