import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl} from '@angular/forms';
import FormJSon from 'src/assets/questionnaire.json';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public form: FormGroup;
  myForm: FormGroup;
  simpleForm = FormJSon;
  questionsTemp = [];
  questionAnswerResponse = [];
 keyMap = new Map([
    [ '1', 'allergies' ],
    [ '2', 'GeneralQuestions' ],
    [ '3', 'Intoxications' ],
    [ '3.1', 'smoke' ],
    [ '3.2', 'alchohol' ],
    ['2.1', 'gender' ],
    [ '2.2', 'dob' ],
    [ '2.3', 'cob' ],
    [ '2.4', 'maritalStatus' ],
]);
 labelMap = new Map([
    [ '1', 'Do you have allergies?' ],
    [ '2', 'General questions' ],
    [ '3', 'Intoxications' ],
    [ '3.1', 'Do you smoke?' ],
    [ '3.2', 'Do you drink alchohol?' ],
    ['2.1', 'What is your gender?' ],
    [ '2.2', 'What is your date of birth?' ],
    [ '2.3', 'What is your country of birth?' ],
    [ '2.4', 'What is your marital status?' ],
]);
 controlMap = new Map([
    [ '1', 'checkbox' ],
    [ '2', 'label' ],
    [ '3', 'label' ],
    [ '3.1', 'checkbox' ],
    [ '3.2', 'checkbox' ],
    ['2.1', 'radio' ],
    [ '2.2', 'datepicker' ],
    [ '2.3', 'textbox' ],
    [ '2.4', 'radio1' ],
]);
 optionsMap = new Map([
    [ '1', ''],
    [ '2', ''],
    [ '3', ''],
    [ '3.1', ''],
    [ '3.2', ''],
    ['2.1', 'feamle,male' ],
    [ '2.2', '' ],
    [ '2.3', '' ],
    [ '2.4', 'married,unmarried' ],
]);
  constructor(
    private fb: FormBuilder
  ) { 
    console.log(this.simpleForm); 
    this.myForm=this.fb.group({});
    this.createControls(this.simpleForm);
  
    this.form = new FormGroup({
      allergies: new FormControl(true, [Validators.required]),
      smoke: new FormControl(false, [Validators.required, Validators.email]),
      alchohol: new FormControl(true, [Validators.required]),
      gender: new FormControl('female', [Validators.required]),
      cob: new FormControl('', [Validators.required]),
      maritalStatus: new FormControl('', [Validators.required, Validators.max(5)]),
      dob: new FormControl('', [Validators.requiredTrue]),
  });
  }
  getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
  }
  

  createControls(controls: any){
    let count = 0;
    for(let control of controls.item){
        this.questionsTemp.push(
          {
            key: this.keyMap.get(control.linkId),
            label:control.text,
            type: this.controlMap.get(control.linkId),
            options: this.optionsMap.get(control.linkId),
            required: true,
            order: 1
          }
        )
        if(control.item && control.item.length > 0) {
        control.item.map(res=> {
          this.questionsTemp.push(
            {
              key: this.keyMap.get(res.linkId),
              label:res.text,
              type: this.controlMap.get(res.linkId),
              options: this.optionsMap.get(res.linkId).split(','),

              required: true,
              order: 1
            }
          )
        })
         
        }
      }
    console.log('myForm',this.questionsTemp);
} 
  
  
  ngOnInit(): void {
  }

  getOptionValues(value) {
    console.log('value',value);

    if(value != '') {
      var nameArr = value.split(',');
      console.log(nameArr);
      return nameArr; 
    }
    return null; 
  }


public save(): void {
  let item = [];
  console.log('formvalie', this.form)
  for (const [key, value] of Object.entries(this.form.value)) {
  
    item.push(
      {
        linkedId: this.getByValue(this.keyMap,key),
        text: this.labelMap.get(this.getByValue(this.keyMap,key)),
        answer:value,
      }
    
  )
  }
  this.questionAnswerResponse.push()
  console.log('item',item)
}
}