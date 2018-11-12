function Task(name, context, project) {
	this.name = name
	this.context = context
	this.project = project
	this.metadata = {}
}

Task.prototype.due = function() {
	str = this.metadata["due"]
	if(typeof str !== "string")
		return null
	data = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str)
	if(data == null)
		return null
	return new Date(data[1] | 0, data[2] - 1, data[3] | 0)
}

