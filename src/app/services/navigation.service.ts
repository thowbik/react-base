import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable()

export class NavigationService {
  constructor(private router: Router) {

  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  goToResponses() {
    this.router.navigate(['/responses']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
  goTolabel(pageFrom) {
    this.router.navigate(['/label/'+pageFrom]);
  }
  goToCluster() {
    this.router.navigate(['/clusters']);
  }

  goToEmployees() {
    this.router.navigate(['/employees']);
  }
  goToUser() {
    this.router.navigate(['/users']);
  }
  goToUserRole() {
    this.router.navigate(['/userrole']);
  }

  goToRole(id) {
    this.router.navigate(['/role/'+id]);
  }
  goToContact(id,page) {
    this.router.navigate(['/contact/'+id + '/' + page]);
  }
  goToUserDetails(id) {
    this.router.navigate(['/user/' + id]);
  }
  goToduplicateRole(id){
    this.router.navigate(['/duplicaterole/'+id]);
  }
  goToUnderRejected() {
    this.router.navigate(['/rejected']);
  }

  goToUnAuthorized() {
    this.router.navigate(['/unauthorized']);
  }

  goToSessionTimedOut() {
    this.router.navigate(['/sessiontimedout']);
  }

  goToOrganisation() {
    this.router.navigate(['/organisation']);
  }
  goToContacts() {
    this.router.navigate(['/contacts']);
  }
  goToContactGroups() {
    this.router.navigate(['/groups/']);
  }
  goToContactGroupList(id) {
    this.router.navigate(['/contactgrouplist/'+ id]);
  }
  goToWelcome() {
    this.router.navigate(['/welcome']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToSignin() {
    this.router.navigate(['/signin']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
  goToNewaccount() {
    this.router.navigate(['/newaccount']);
  }

  goToNewQuestion(id,pageid,duplicateNo) {
    this.router.navigate(['/newquestion/' +id + '/' + pageid+ '/' +duplicateNo]);
  }
  goToQuestion(labelId) {
    this.router.navigate(['/questions/'+labelId]);
  }
  goToForms(labelId) {
    this.router.navigate(['/forms/'+labelId]);
  }
  goToInsights() {
    this.router.navigate(['/insights']);
  }
  goToFormView() {
    this.router.navigate(['/formview']);
  }
  goToQuestionLabel() {
    this.router.navigate(['/questionlabel']);
  }
  goToShare(roleAction,pageid) {
    this.router.navigate(['/share/' + roleAction + '/' + pageid]);
  }
  goToResponders(formid,pageid) {
    this.router.navigate(['/responders/' + formid + '/' + pageid]);
  }
  isOnLoginScreen():boolean {
    return this.router.url === '/login';
  };
  goToFormOptions(formid, pageid){
    this.router.navigate(['/formoptions/' +formid + '/' + pageid]);
  }
}
