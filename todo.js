var Task = Object.create(null)


var TodoList = function() {
	/* protected */
	this.list = []
}

TodoList.prototype.add = function(task) {
	this.list.push(task)
	return this.list.length
}

TodoList.prototype.get = function(id) {
	return this.list[id - 1]
}

TodoList.prototype.has = function(id) {
	return (id - 1) in this.list
}

TodoList.prototype.set = function(id, task) {
	this.list[id - 1] = task
}

TodoList.prototype.delete = function(id) {
	delete this.list[id - 1]
}

TodoList.prototype.keys = function() {
	var out = []
	for (var i = 0; i < this.list.length; i++) {
		if (i in this.list) {
			out.push(i + 1)
		}
	}
	return out
}

TodoList.prototype.toString = function() {
	return this.list.join("\n")
}

var TodoFile = function() {
	TodoList.call(this)
}
TodoFile.prototype = Object.create(TodoList.prototype)

TodoFile.prototype.pull = function() {
	throw new Error("Pull: Not implemented")
}

TodoFile.prototype.push = function() {
	throw new Error("Push: Not implemented")
}
TodoFile.prototype.filename = null

var LocalTodoFile = function(name) {
	TodoFile.call(this)
	this.filename = name
}
LocalTodoFile.prototype = Object.create(TodoFile.prototype)

LocalTodoFile.prototype.pull = function() {
	this.list = String(localStorage.getItem(this.filename)).split("\n")
	var self = this
	this.list.forEach(function(item, index) {
		if (item.length === 0) {
			delete self.list[index]
		}
	})
}

LocalTodoFile.prototype.push = function() {
	localStorage.setItem(this.filename, this.toString())
}
