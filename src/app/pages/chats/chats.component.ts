import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { TabComponent, SelectEventArgs } from '@syncfusion/ej2-angular-navigations';
import { enableRipple, createElement } from '@syncfusion/ej2-base';
import { Tooltip } from '@syncfusion/ej2-popups';
import { FormBuilder, FormGroup, Validators,FormControl,AbstractControl} from '@angular/forms';
@Component({
    selector     : 'chats-dashboard',
    templateUrl  : './chats.component.html',
    styleUrls    : ['./chats.component.scss']
})
export class ChatsComponent implements OnInit
{ 
    @ViewChild('element') tabInstance: TabComponent;
    public tabpopup: boolean = false;
    //public usernext: boolean = false;
    //public userprev: boolean = false;
    //public headerText: Object = [{ 'text': 'John Doe' },{ 'text': 'Vimal Rajan' },{ 'text': 'Rashida Aslam' },{ 'text': 'Add New' }];
    public totalItems: number;
    tabForm: FormGroup;
    //public title: any;
    //public content: any;
    
    public headerText: Object = [{ 'text': 'John Doe' },{ 'text': 'Vimal Rajan' },{ 'text': 'Rashida Aslam' },{ 'text': 'Add New' }];
    public animation: object = { previous: { effect: 'SlideLeftIn', duration: 1000, easing: 'ease' }, next: { effect: 'SlideRightIn', duration: 1000, easing: 'ease' } };
    constructor(private formBuilder: FormBuilder)
    {
      
    }
    
    ngOnInit(): void
    {
        this.tabForm = this.formBuilder.group({
    
            title : ['', Validators.required],
            //roledescription:['', Validators.required],
            content:['', Validators.required]
 
         }); 
    }

    
   

    public tabCreated(): void {
        let tooltip: Tooltip = new Tooltip({
            content: 'Add Tab1'
        });
        tooltip.appendTo('.e-ileft.e-icon');

       document.getElementById('e-item_3').onclick = (e : Event) => {
            this.tabpopup = true;
            
        };
        //let proxy : any = this; 
       /* document.getElementById('btn-add').onclick = (e : Event) => {
           
            let title: string = proxy.document.getElementById('tab-title').value;
            let content: string = proxy.document.getElementById('tab-content').value;
            let item: Object =  { header: { text: title }, content: createElement('pre', { innerHTML: content.replace(/\n/g, '<br>\n') }).outerHTML };

            this.totalItems = document.querySelectorAll('#element .e-toolbar-item').length;
            this.tabInstance.addTab([item], this.totalItems-1);
        }; */
    }

   
  

    public tabSelected(args: SelectEventArgs): void {
       
        if (args.selectedIndex === document.querySelectorAll('#element .e-toolbar-item').length -1) {
            //proxy.document.getElementById('tab-title').value = '';
            //proxy.document.getElementById('tab-content').value = '';
            let title: string = '';
            let content: string = '';
        }
    }

    addtab()
    {
        
       
        //let proxy : any = this; 
        let title: string = this.tabForm.value.title;
        let content: string = this.tabForm.value.content;
        let item: Object =  { header: { text: title }, content: createElement('pre', { innerHTML: content.replace(/\n/g, '<br>\n') }).outerHTML };

        this.totalItems = document.querySelectorAll('#element .e-toolbar-item').length;
        this.tabInstance.addTab([item], this.totalItems-1);
        this.resetForm(this.tabForm);
        
    }

    resetForm(formGroup: FormGroup) {
        let control: AbstractControl = null;
        formGroup.reset();
        //formGroup.markAsUntouched();
        Object.keys(formGroup.controls).forEach((name) => {
          control = formGroup.controls[name];
          control.setErrors(null);
        });
      }

}


