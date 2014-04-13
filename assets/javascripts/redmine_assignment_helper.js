$(function () {
    // Append dialog on footer
    $("body").append('<div id="rah-dialog" style="display:none;" title="Are you sure ?"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 40px 0;"></span><span id="dynamic-text"></span></p></div>');

    // Hook form new issue submission
    $(".new_issue input[name='commit'], .new_issue input[name='continue']").click(function (event) {
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
                    "Create ticket": function () {
                        the_issue_form.submit();
                    },
                    "Cancel": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
    });

    // Get original value of assigned ID
    var original_assigned_id = $(".edit_issue #issue_assigned_to_id").val();

    // Hook form update issue submission
    $(".edit_issue input[name='commit'], .edit_issue input[name='continue']").click(function (event) {
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
                    "Update ticket": function () {
                        the_issue_form.submit();
                    },
                    "Cancel": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
    });
});