import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { trimValidator } from '../../add-book-page/AddBookCustomVal';
import { CommentsService } from 'src/app/services/comments.service';
import { Comments } from 'src/app/interfaces/Comments';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() currentUserId!: string | undefined | null;
  @Input() hasError!: boolean
  bookId = this.route.snapshot.params["id"];
  constructor(private fb: FormBuilder, private commentService: CommentsService, private route: ActivatedRoute) {

  }
  allCurrentComments: Observable<Comments[]>|undefined|null = this.commentService.getAllComments(this.bookId as string);

  addCommentForm = this.fb.group({
    comment: ["", [Validators.required, trimValidator, Validators.maxLength(400)]],
  })
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  get comment() {
    return this.addCommentForm.get("comment");
  }

  addCommentFunc() {
    this.isSubmitted = true;
    console.log(this.addCommentForm.getRawValue());
    console.log("ALL CURRENT COMMENTS", this.allCurrentComments);
    if (this.addCommentForm.valid) {
      this.isLoading = true;
      let comment = this.addCommentForm.get("comment")?.value as unknown as string;
      let ownerId = this.currentUserId as string;
      let bookId = this.bookId as string;
      this.commentService.addComment(comment, bookId, ownerId).subscribe();
      setTimeout(() => {
        this.allCurrentComments = this.commentService.getAllComments(bookId);
        this.isLoading = false;
        this.addCommentForm.get("comment")?.setValue("");
      }, 500);
    }
  }

  deleteComFunc(commentId:string|undefined) {
    this.isLoading = true;
    this.commentService.deleteComment(commentId as string, this.bookId ).subscribe();
    setTimeout(() => {
      this.allCurrentComments = this.commentService.getAllComments(this.bookId);
      this.isLoading = false;
    }, 500);
  }
  ngOnInit(): void {
  }
}
