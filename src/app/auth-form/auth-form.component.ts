import { AuthMessageComponent } from './../auth-message/auth-message.component';
import { Component, OnInit, Output, EventEmitter, ContentChild, AfterContentInit, ViewChild, AfterViewInit } from '@angular/core';
import { ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { AuthRememberComponent } from '../auth-remember/auth-remember.component';

import { User } from '../models/user';
@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit, AfterContentInit, AfterViewInit {
  showMessage: boolean;
  @ViewChild(AuthMessageComponent) message: AuthMessageComponent;
  @ViewChildren(AuthMessageComponent) messageChildren: QueryList<AuthMessageComponent>;
  @ContentChild(AuthRememberComponent) remember: AuthRememberComponent;
  @ContentChildren(AuthRememberComponent) rememberChildren: QueryList<AuthRememberComponent>;
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();
  constructor() { }

  ngOnInit() {
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

  // how to get access to the projected content of the
  // <ng-content select='app-auth-remember'></ng-content>
  // 1. import the child component in this case: "app-auth-remember"
  //    where to get the content
  // 2. import ContentChild which is a built-in decorator and also
  //    AfterContentInit an interface Lifecycle hook that is called after a
  //    directive's content has been fully initialized.
  // 3. make a query to the child component using @ContentChild query
  //    after the content is initialized.
  //    @ContentChild allows to query the DOM inside the
  //    <ng-content select='app-auth-remember'></ng-content>
  ngAfterContentInit() {
    if (this.remember) {
      console.log(this.remember);
      this.remember.checked.subscribe((checked: boolean) => {
        this.showMessage = checked;
      });
    }
    // if (this.rememberChildren) {
    //   console.log(this.rememberChildren);
    //   this.rememberChildren.forEach((item) => {
    //     item.checked.subscribe((checked: boolean) => {
    //       this.showMessage = checked;
    //     });
    //   });
    // }

    // this.message.days = 30;
  }

  ngAfterViewInit() {
    // console.log(this.message);
    // can not change the value of the property here considering that
    // the content of the component is not ready to show up yet.
    // This will trigger an error in the console cause by : Expression has changed
    // after it was checked.
    // this.message.days = 30;

    // To avoid this error the value has to be changed
    // in ngAfterContentInit()

    // ** The ViewChildren is only available inside ngAfterViewInit()
    if (this.messageChildren) {
        // this timeout avoids the error of change value before
        // the component content is nitialized.
        setTimeout(() => {
          this.messageChildren.forEach((message) => {
            message.days = 30;
          });
      });
    }
  }
}
