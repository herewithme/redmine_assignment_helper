class RedmineAssignmentHelperHookListener < Redmine::Hook::ViewListener
	render_on :view_layouts_base_html_head, :partial => "redmine_assignment_helper/redmine_assignment_helper_partial"
end