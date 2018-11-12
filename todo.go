package main

import (
	"time"
	"github.com/gopherjs/gopherjs/js"
)

type Task struct {
	Name string
	Context string
	Project string
	Metadata map[string]string
}

const DateFormat = "2006-01-02"

func (t* Task) Due() *time.Time {
	str, ok := t.Metadata["Due"]
	if ok {
		date, err := time.Parse(DateFormat, str)
		if err == nil {
			return &date
		}
	}
	return nil
}

func NewTask (name string) *js.Object {
	return js.MakeWrapper(&Task{Name:name})
}

func main() {
	js.Global.Set("Todo", map[string]interface{} {
		"Task": map[string]interface{}{
			"new": NewTask,
		},
	})
}