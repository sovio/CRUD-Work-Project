import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'CRUD';

  TownList = ['Town1', 'Town2', 'Town3', 'Town4', 'Town5']
  TagList = ['Tag1', 'Tag2', 'Tag3', 'Tag4']
  TagString = `${this.TagList[this.getRandomInt(0,this.TagList.length)]}, ${this.TagList[this.getRandomInt(0,this.TagList.length)]}`
  formValues = localStorage.getItem("formValues") !== null ? JSON.parse(localStorage.getItem("formValues") || "") : []

  FormValid = new FormGroup({
    campaignname:new FormControl('',[Validators.required]),
    bidamount:new FormControl('', [Validators.required]),
    campaignfund:new FormControl('', [Validators.required]),
    radius:new FormControl('', [Validators.required])
    })


  constructor() { }

  loginUser(){
    console.warn(this.FormValid.value)
  }

  get campaigNname() {
    return this.FormValid.get('campaignname');
  }

  get bidAmount() {
    return this.FormValid.get('bidamount');
  }

  get campaignFund() {
    return this.FormValid.get('campaignfund');
  }

  get radiusBox() {
    return this.FormValid.get('radius');
  }

  ngOnInit(): void {}

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  getFormValues(obj: any){
    for (let x in obj){
      if (x === 'tags') obj[x] = obj[x].value === '' ? obj[x].placeholder.split(', ') : obj[x].value.split(', ')
      if (x === 'townButton' ) obj[x] = obj[x] === ''  ? true : obj[x]
    }
    obj['index'] = this.formValues.length
    this.formValues.unshift(obj)
    localStorage.setItem('formValues', JSON.stringify(this.formValues));
  }

  setButtonName(obj: any){
    obj.y.value = obj.x
  }

  removeCardElement(obj: any){
    this.formValues.forEach( (value: any) => {
      if (obj.index === value.index){
        this.formValues.splice(this.formValues.indexOf(obj),1)
        localStorage.setItem('formValues', JSON.stringify(this.formValues));
      }
    }); 
  }

  changePrice(obj: any){
    this.formValues.forEach( (value: any) => {
      if (obj.card.index === value.index) {
        this.formValues[this.formValues.indexOf(obj.card)].campaignFoud -= obj.price
        localStorage.setItem('formValues', JSON.stringify(this.formValues));
      }
    });
  }
    
}
