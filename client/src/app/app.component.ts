import { Component, OnInit } from '@angular/core';
import { NoteService} from './note.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  noteList: any;
  newNote: any;

  constructor(private _noteService: NoteService,){
    this.noteList = [];
    this.newNote = {text: ''};
  }
  ngOnInit(){
    this.getNotes()
  }
  getNotes() {
    this._noteService.getNotes().subscribe(data=>{
      this.noteList = data['data'];
    })
  }
  onSubmit(){
    this._noteService.addNote(this.newNote).subscribe(data => {
      this.newNote = {text: ''};
      this.getNotes();
    });
  }
}

