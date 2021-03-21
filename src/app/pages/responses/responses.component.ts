import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from "@angular/forms";
import { DynamicFormComponent } from "../layout/components/dynamic-form/dynamic-form.component";
import { FieldConfig } from '../../models/field.interface';


@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss']
})
export class ResponsesComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Username",
      inputType: "text",
      name: "name",
      // validations: [
      //   {
      //     name: "required",
      //     validator: Validators.required,
      //     message: "Name Required"
      //   },
      //   {
      //     name: "pattern",
      //     validator: Validators.pattern("^[a-zA-Z]+$"),
      //     message: "Accept only text"
      //   }
      // ]
    },
    // {
    //   type: "input",
    //   label: "Email Address",
    //   inputType: "email",
    //   name: "email",
    //   validations: [
    //     {
    //       name: "required",
    //       validator: Validators.required,
    //       message: "Email Required"
    //     },
    //     {
    //       name: "pattern",
    //       validator: Validators.pattern(
    //         "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
    //       ),
    //       message: "Invalid email"
    //     }
    //   ]
    // },
    {
      type: "radiobutton",
      label: "Who is Your favorite actor",
      name: "favoriteactor",
      options: ["Vijay","Ajith","Suriya","Dhanush",],
      
    },
    {
      type: "radiobutton",
      label: "Which is Your favorite Food",
      name: "favoritefood",
      options: ["Biriyani","Fried Rice","Sambar Rice","Curd Rice",],
     
    },
    {
      type: "radiobutton",
      label: "Which is Your favorite Color",
      name: "favoritecolor",
      options: ["Red","Blue","Green","Yellow",],
      
    },
    {
      type: "date",
      label: "Date of Birth",
      name: "dob",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Date of Birth Required"
        }
      ]
    },
   
  
    {
      type: "select",
      label: "Country",
      name: "country",
      value: "",
      options: ["India", "UAE", "UK", "US"]
    },
    
    {
      type: 'file',
      name: 'picture',
      label: 'Picture'
    }, 
    {
      type: "checkbox",
      label: "Accept Terms",
      name: "term",
      value: true
    }, 
      {
       type: "button",
       label: "Save"
      }
  ];
  constructor() { }

  ngOnInit() {
   
  }
  submit(value: any) {
  }

}
