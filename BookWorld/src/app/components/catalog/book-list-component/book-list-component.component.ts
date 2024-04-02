import { Component, Input } from '@angular/core';
import { Books } from 'src/app/interfaces/Books';

@Component({
  selector: 'app-book-list-component',
  templateUrl: './book-list-component.component.html',
  styleUrls: ['./book-list-component.component.css']
})
export class BookListComponentComponent {
  @Input() book!: Books;
}
