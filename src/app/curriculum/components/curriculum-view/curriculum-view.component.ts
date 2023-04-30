import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {jsPDF} from 'jspdf';
import { first } from 'rxjs';
import autoTable from 'jspdf-autotable';
// import { elements } from 'chart.js';

export interface subjects{
  firstSem :subject[];
  secondSem: subject[];
}

export interface subject {
      courseCode:string;
      descriptiveTitle:string;
      lecUnits:string;
      labUnits:string;
      totalUnits:string;
      hoursPerWeek:string;
      preReq:string;
      coReq:string;
      // semester:string;
      // yearLevel:string;
}


export interface comments{
      username?:string;
      header:string;
      feedback:string;
}

@Component({
  selector: 'app-curriculum-view',
  templateUrl: './curriculum-view.component.html',
  styleUrls: ['./curriculum-view.component.css']
})

export class CurriculumViewComponent implements OnInit{
  expansionTitle='';
  panelOpenState = false;
  del = 'Delete';
  view = 'View Syllabus';
  edit='Edit';
  includeSubjectText='Add Subject';
  cancelAddSubject='Cancel';
  uploadSyllabus='Upload Syllabus';
  yearLevel='';
  editForm: any;

  assignYearX(x:number){
    if(x==0){
      this.yearLevel='First';
    }
    else if(x==1){
      this.yearLevel='Second';
    }
    else if(x==2){
      this.yearLevel='Third';
    }
    else if(x==3){
      this.yearLevel='Fourth';
    }

    return this.yearLevel;
  }

  preReqs(yearLevel: number, sem:string){
    const subjects:any = []
    // return []

    if(yearLevel == 0 && sem === 'firstSem')
      return []
    
    const pre = this.subject.slice(0, yearLevel)  
    pre.forEach(year => {
      year.firstSem.forEach(subj => {
        subjects.push(subj)
      })
      year.secondSem.forEach(subj => {
        subjects.push(subj)
      })
    })

    if(sem === 'secondSem')
    this.subject[yearLevel].firstSem.forEach(
      subj => subjects.push(subj)
    )
    
    return subjects
  }

  changeYearlvl(index: number){

    if(index==0){
      this.expansionTitle='First Year';
    }
    if(index==1){
      this.expansionTitle='Second Year';
    }
  }
  
  comment: comments[]=[
    {'username':'Mang ben', 
    'header':'IT 309',
    'feedback':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {'username':'Ryan Nolasco', 
    'header':'IT 308',
    'feedback':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {'username':'Kyla Delfin', 
    'header':'IT 307',
    'feedback':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },

  ]
  isAddFormShow:any = []
  isForms:any = []
  isEditFormShow:any = []
  one = 0
  clickAddSubject(yearLevel: number, sem: string){
    this.isAddFormShow[yearLevel][sem === "firstSem" ? 0 : 1] = true
  }

  removeAddForm(yearLevel: number, sem: string){
    this.isAddFormShow[yearLevel][sem === "firstSem" ? 0 : 1] = false
  }

  ngOnInit(): void {
    this.subject.forEach(i => {
      this.isEditFormShow.push({firstSem: false, sencondSem:false})
      this.isAddFormShow.push([false, false])
      this.isForms.push({
        firstSem: {  
          courseCode: '',
          descriptiveTitle: '',
          lecUnits: '',
          labUnits: '',
          totalUnits: '',
          hoursPerWeek: '',
          preReq: '',
          coReq: '',
        }
        ,sencondSem:{
          courseCode: '',
          descriptiveTitle: '',
          lecUnits: '',
          labUnits: '',
          totalUnits: '',
          hoursPerWeek: '',
          preReq: '',
          coReq: '',
        }
      })
    })
    console.log(this.isAddFormShow);
    
    
  }
    subject :subjects[] = [
    {
    firstSem:[
      {
        courseCode: 'IT 102',
        descriptiveTitle: 'Introduction to Computing',
        lecUnits: '3',
        labUnits: '1',
        totalUnits: '4',
        hoursPerWeek: '4',
        preReq: 'NONE',
        coReq: 'NONE',     },
      {
        courseCode: 'IT 103',
        descriptiveTitle: 'Computer Programming 1',
        lecUnits: '3',
        labUnits: '0',
        totalUnits: '3',
        hoursPerWeek: '3',
        preReq: 'NONE',
        coReq: 'NONE',     },
      {
        courseCode: 'IT 104',
        descriptiveTitle: 'Hardware System and Servicing',
        lecUnits: '3',
        labUnits: '0',
        totalUnits: '3',
        hoursPerWeek: '3',
        preReq: 'NONE',
        coReq: 'NONE',     },
        {
          courseCode: 'RPH 101',
          descriptiveTitle: 'Readings in the Philippine History',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',     },
          {
            courseCode: 'AAP 101',
            descriptiveTitle: 'Art Appreciation',
            lecUnits: '3',
            labUnits: '0',
            totalUnits: '3',
            hoursPerWeek: '3',
            preReq: 'NONE',
            coReq: 'NONE',     },
            {
              courseCode: 'STS 101',
              descriptiveTitle: 'Science, Technology and Society',
              lecUnits: '3',
              labUnits: '0',
              totalUnits: '3',
              hoursPerWeek: '3',
              preReq: 'NONE',
              coReq: 'NONE',     },
              {
                courseCode: 'ARP 101',
                descriptiveTitle: 'Araling Pilipino',
                lecUnits: '3',
                labUnits: '0',
                totalUnits: '3',
                hoursPerWeek: '3',
                preReq: 'NONE',
                coReq: 'NONE',     },
                {
                  courseCode: 'PE 10',
                  descriptiveTitle: 'Physical Education 1',
                  lecUnits: '3',
                  labUnits: '0',
                  totalUnits: '3',
                  hoursPerWeek: '3',
                  preReq: 'NONE',
                  coReq: 'NONE',     },
                  {
                    courseCode: 'NSTP 10',
                    descriptiveTitle: 'National Service Training Program 1',
                    lecUnits: '3',
                    labUnits: '0',
                    totalUnits: '3',
                    hoursPerWeek: '3',
                    preReq: 'NONE',
                    coReq: 'NONE',     },
    ],
    secondSem:[
      {
        courseCode: 'IT 105',
        descriptiveTitle: 'Computer Programming 2',
        lecUnits: '3',
        labUnits: '1',
        totalUnits: '4',
        hoursPerWeek: '4',
        preReq: 'CSC101',
        coReq: 'NONE',     },
      {
        courseCode: 'IT 106',
        descriptiveTitle: 'Networking 1',
        lecUnits: '3',
        labUnits: '0',
        totalUnits: '3',
        hoursPerWeek: '3',
        preReq: 'NONE',
        coReq: 'NONE',     },{
          courseCode: 'IT 107',
          descriptiveTitle: 'Discrete Structures for IT',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',     },
          {
            courseCode: 'PCM 101',
            descriptiveTitle: 'Purposive Communication',
            lecUnits: '3',
            labUnits: '0',
            totalUnits: '3',
            hoursPerWeek: '3',
            preReq: 'NONE',
            coReq: 'NONE',     },
            {
              courseCode: 'MMW 101',
              descriptiveTitle: 'Mathematics in the Modern World',
              lecUnits: '3',
              labUnits: '0',
              totalUnits: '3',
              hoursPerWeek: '3',
              preReq: 'NONE',
              coReq: 'NONE',     },
              {
                courseCode: 'UTS 101',
                descriptiveTitle: 'Understanding the Self',
                lecUnits: '3',
                labUnits: '0',
                totalUnits: '3',
                hoursPerWeek: '3',
                preReq: 'NONE',
                coReq: 'NONE',     },
                {
                  courseCode: 'PAL 101',
                  descriptiveTitle: 'Panitikan at Lipunan',
                  lecUnits: '3',
                  labUnits: '0',
                  totalUnits: '3',
                  hoursPerWeek: '3',
                  preReq: 'NONE',
                  coReq: 'NONE',     },
                  {
                    courseCode: 'PE 11',
                    descriptiveTitle: 'Physical Education 2',
                    lecUnits: '3',
                    labUnits: '0',
                    totalUnits: '3',
                    hoursPerWeek: '3',
                    preReq: 'NONE',
                    coReq: 'NONE',     },
                    {
                      courseCode: 'NSTP 11',
                      descriptiveTitle: 'National Service Training Program 2',
                      lecUnits: '3',
                      labUnits: '0',
                      totalUnits: '3',
                      hoursPerWeek: '3',
                      preReq: 'NONE',
                      coReq: 'NONE',     },
                        
    ],
    },
    {
      firstSem:[
        {
          courseCode: 'IT 201',
          descriptiveTitle: 'Data Structures and Algorithms',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',     },
          {
            courseCode: 'IT 202',
            descriptiveTitle: 'Information Management',
            lecUnits: '3',
            labUnits: '0',
            totalUnits: '3',
            hoursPerWeek: '3',
            preReq: 'NONE',
            coReq: 'NONE',     },
            {
              courseCode: 'IT 203',
              descriptiveTitle: 'Object-Oriented Programming 1',
              lecUnits: '3',
              labUnits: '0',
              totalUnits: '3',
              hoursPerWeek: '3',
              preReq: 'NONE',
              coReq: 'NONE',     },
              {
                courseCode: 'IT 204',
                descriptiveTitle: 'Integrative Programming and Technologies 1',
                lecUnits: '3',
                labUnits: '0',
                totalUnits: '3',
                hoursPerWeek: '3',
                preReq: 'NONE',
                coReq: 'NONE',     },
                {
                  courseCode: 'IT 205',
                  descriptiveTitle: 'Human Computer Interface',
                  lecUnits: '3',
                  labUnits: '0',
                  totalUnits: '3',
                  hoursPerWeek: '3',
                  preReq: 'NONE',
                  coReq: 'NONE',     },
                  {
                    courseCode: 'ETH 101',
                    descriptiveTitle: 'Ethics',
                    lecUnits: '3',
                    labUnits: '0',
                    totalUnits: '3',
                    hoursPerWeek: '3',
                    preReq: 'NONE',
                    coReq: 'NONE',     },
                    {
                      courseCode: 'PE 12',
                      descriptiveTitle: 'Physical Education 3',
                      lecUnits: '3',
                      labUnits: '0',
                      totalUnits: '3',
                      hoursPerWeek: '3',
                      preReq: 'NONE',
                      coReq: 'NONE',     },
                      {
                        courseCode: 'AAH 101d',
                        descriptiveTitle: 'Reading Visual Art',
                        lecUnits: '3',
                        labUnits: '0',
                        totalUnits: '3',
                        hoursPerWeek: '3',
                        preReq: 'NONE',
                        coReq: 'NONE',     },
      ],
      secondSem:[
        {
          courseCode: 'IT 206',
          descriptiveTitle: 'Advanced Database Systems',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',     },
          {
            courseCode: 'IT 207',
            descriptiveTitle: 'Object-Oriented Programming 2',
            lecUnits: '3',
            labUnits: '0',
            totalUnits: '3',
            hoursPerWeek: '3',
            preReq: 'NONE',
            coReq: 'NONE',     },
            {
              courseCode: 'IT 208',
              descriptiveTitle: 'Platform Technologies',
              lecUnits: '3',
              labUnits: '0',
              totalUnits: '3',
              hoursPerWeek: '3',
              preReq: 'NONE',
              coReq: 'NONE',     },
              {
                courseCode: 'IT 209',
                descriptiveTitle: 'Interactive Systems and Technologies',
                lecUnits: '3',
                labUnits: '0',
                totalUnits: '3',
                hoursPerWeek: '3',
                preReq: 'NONE',
                coReq: 'NONE',     },
                {
                  courseCode: 'IT 210',
                  descriptiveTitle: 'Networking 2',
                  lecUnits: '3',
                  labUnits: '0',
                  totalUnits: '3',
                  hoursPerWeek: '3',
                  preReq: 'NONE',
                  coReq: 'NONE',     },
                  {
                    courseCode: 'TCW 101',
                    descriptiveTitle: 'The Contemporary World',
                    lecUnits: '3',
                    labUnits: '0',
                    totalUnits: '3',
                    hoursPerWeek: '3',
                    preReq: 'NONE',
                    coReq: 'NONE',     },
                    {
                      courseCode: 'PE 13',
                      descriptiveTitle: 'Physical Education 4',
                      lecUnits: '3',
                      labUnits: '0',
                      totalUnits: '3',
                      hoursPerWeek: '3',
                      preReq: 'NONE',
                      coReq: 'NONE',     },
                      {
                        courseCode: 'MST 101d',
                        descriptiveTitle: 'Living in the IT Era',
                        lecUnits: '3',
                        labUnits: '0',
                        totalUnits: '3',
                        hoursPerWeek: '3',
                        preReq: 'NONE',
                        coReq: 'NONE',     
                      },
      ]
    },

    {
      firstSem: [
        {
          courseCode: 'IT 301',
          descriptiveTitle: 'Application Development and Emerging Technologies',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'IT 302',
          descriptiveTitle: 'Social and Professional Issues',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'IT 303',
          descriptiveTitle: 'System Analysis and Design',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'IT 304',
          descriptiveTitle: 'Web Systems and Technologies 1',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'IT 305',
          descriptiveTitle: 'Quantitative Methods',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'IT 306',
          descriptiveTitle: 'Elective 1',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'IT 307',
          descriptiveTitle: 'Elective 2',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'FL301',
          descriptiveTitle: 'Foreign Language 1',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
      ],
      secondSem: [
        {
          courseCode: '	IT 308',
          descriptiveTitle: 'Information Assurance and Security',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'IT 309',
          descriptiveTitle: 'Systems Integration and Architecture 1',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'IT 310',
          descriptiveTitle: 'Web Systems and Technologies 2',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'CAP 301',
          descriptiveTitle: 'Capstone Project and Research 1',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'IT 311',
          descriptiveTitle: 'Elective 3',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'IT 312',
          descriptiveTitle: 'Elective 4',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'FL302',
          descriptiveTitle: 'Foreign Language 2',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'RLW 101',
          descriptiveTitle: '	Life and Works of Rizal',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'NONE',
          coReq: 'NONE',
        },
      ],
    },


    {
      firstSem:[
        {
          courseCode: 'IT 401',
          descriptiveTitle: 'System Administration and Maintenance',
          lecUnits: '3',
          labUnits: '1',
          totalUnits: '4',
          hoursPerWeek: '4',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'IT 402',
          descriptiveTitle: 'System Integration and Architecture 2',
          lecUnits: '3',
          labUnits: '1',
          totalUnits: '4',
          hoursPerWeek: '4',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'IT 403',
          descriptiveTitle: 'Elective 5',
          lecUnits: '3',
          labUnits: '1',
          totalUnits: '4',
          hoursPerWeek: '4',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'CAP 401',
          descriptiveTitle: 'Capstone Project and Research 2',
          lecUnits: '3',
          labUnits: '1',
          totalUnits: '4',
          hoursPerWeek: '4',
          preReq: 'NONE',
          coReq: 'NONE',
        },
        {
          courseCode: 'SSP 101c',
          descriptiveTitle: 'Gender and Society',
          lecUnits: '3',
          labUnits: '1',
          totalUnits: '4',
          hoursPerWeek: '4',
          preReq: 'NONE',
          coReq: 'NONE',
        },
      ],
      secondSem:[
        {
          courseCode: 'IT 404',
          descriptiveTitle: 'Internship',
          lecUnits: '3',
          labUnits: '1',
          totalUnits: '4',
          hoursPerWeek: '4',
          preReq: 'CHEM101',
          coReq: 'NONE',
        }
      ],
    },



];

columns = ['COURSE CODE', 'DESCRIPTIVE TITLE', 'LEC UNITS', 'LAB UNITS', 'TOTAL UNITS', 'HOURS PER WEEK', 'PRE-REQ', 'CO-REQ'];

selectedCourse:any = {
  courseCode: '',
  descriptiveTitle: '',
  lecUnits: '',
  labUnits: '',
  totalUnits: '',
  hoursPerWeek: '',
  preReq: '',
  coReq: '',
}

cancelEditSub(yearLevel:number, sem:string){
  this.isEditFormShow[yearLevel][sem] = false
}
selectCourse(course: any, yearLevel:number, index: number, sem:string) {
  this.selectedSubjIndex = index
  this.isForms[yearLevel][sem] = {...course}
  console.log(this.isForms);
  this.isEditFormShow[yearLevel][sem] = true
}


addSubject(form: NgForm, yearLevel:number, sem:string){
  if(!NgForm || form.value.preReq || form.value.coReq){
  if(sem === 'firstSem'){
    this.subject[yearLevel]['firstSem'].push(form.value)
    form.reset();
    this.removeAddForm(yearLevel, sem);
  }
  else{
    this.subject[yearLevel]['secondSem'].push(form.value)
    form.reset();
    this.removeAddForm(yearLevel, sem);
  }
  }
  
}



selectedSubjIndex = 0;
editCourse(form: NgForm, yearLevel:number, sem:string){
  this.subject[yearLevel][sem === 'firstSem' ? 'firstSem' : 'secondSem'][this.selectedSubjIndex] = 
  {...this.subject[yearLevel][sem === 'firstSem' ? 'firstSem' : 'secondSem'][this.selectedSubjIndex], ...form.value}
  this.isEditFormShow[yearLevel][sem] = false
}


deleteCourse(yearLevel:number, index:number, sem:string){
  if(sem === 'firstSem')
    this.subject[yearLevel]['firstSem'].splice(index, 1)
  else
    this.subject[yearLevel]['secondSem'].splice(index, 1)
}



  //add comment
  addComment(form: NgForm): void{
    const newComment = {
      username: form.value.username,
      header: form.value.header,
      feedback: form.value.feedback,
    };
    if(newComment.username || newComment.header && newComment.feedback){
        this.comment.push(newComment);
        form.reset();
       }
  }
  

public convertToPDF(){
    let pdf = new jsPDF('p','mm','a4');

    function addHeader() {
    var bulsuLogoSrc = 'assets/bulsu.png';
    var cictLogoSrc = 'assets/logo-cict.png';
    pdf.addImage(bulsuLogoSrc, 'PNG', 30, 3, 25, 25);
    pdf.addImage(cictLogoSrc, 'PNG', 155, 3, 25, 25);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.text('Republic of the Philippines',105,15,{align: 'center'});
    pdf.text('Bulacan State University',105,20,{align: 'center'});
    pdf.setFont("helvetica", "normal");
    pdf.text('City Of Malolos Bulacan',105,25,{align: 'center'});
    pdf.text('Tel/Fax (044) 791-0153',105,30,{align: 'center'});
    pdf.setFont("helvetica", "bold");
    pdf.text('College of Information and Communications Technology',105,35,{align: 'center'});
    pdf.line(20,38,190,38)
    pdf.setFont("times new roman", "bold");
    pdf.text('BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY',105,50,{align: 'center'});
    pdf.setFont("times new roman", "normal");
    pdf.text('(Based on CMO No. 25 s 2015)',105,55,{align: 'center'});
    }


let tableMargin = 65;
const firstYear = this.subject[0];
const firstYearFirstSem = firstYear.firstSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle+'        ',
  "Lec Units": subject.lecUnits.toString()+'   ',
  "Lab Units": subject.lecUnits.toString()+'   ',
  "Total Units": subject.totalUnits.toString()+'   ',
  "Hours Per Week": subject.hoursPerWeek.toString()+'   ',
  "Pre Req": subject.preReq+'   ',
  "Co Req": subject.coReq+'   ',
}));
let infofirstYear: string[][] = [];
firstYearFirstSem.forEach((element,index,array)=>{
  infofirstYear.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});


const firstYearsecondSem = firstYear.secondSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle+'        ',
  "Lec Units": subject.lecUnits.toString()+'   ',
  "Lab Units": subject.lecUnits.toString()+'   ',
  "Total Units": subject.totalUnits.toString()+'   ',
  "Hours Per Week": subject.hoursPerWeek.toString()+'   ',
  "Pre Req": subject.preReq+'   ',
  "Co Req": subject.coReq+'   ',
}));
let infofirstYearSecondSem: string[][] = [];
firstYearsecondSem.forEach((element,index,array)=>{
  infofirstYearSecondSem.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});

const secondYear = this.subject[1];
const secondYearFirstSem = secondYear.firstSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle+'        ',
  "Lec Units": subject.lecUnits.toString()+'   ',
  "Lab Units": subject.lecUnits.toString()+'   ',
  "Total Units": subject.totalUnits.toString()+'   ',
  "Hours Per Week": subject.hoursPerWeek.toString()+'   ',
  "Pre Req": subject.preReq+'   ',
  "Co Req": subject.coReq+'   ',
}));
let infoSecondYear: string[][] = [];
secondYearFirstSem.forEach((element,index,array)=>{
  infoSecondYear.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});

const secondYearSecondSem = secondYear.secondSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle+'        ',
  "Lec Units": subject.lecUnits.toString()+'   ',
  "Lab Units": subject.lecUnits.toString()+'   ',
  "Total Units": subject.totalUnits.toString()+'   ',
  "Hours Per Week": subject.hoursPerWeek.toString()+'   ',
  "Pre Req": subject.preReq+'   ',
  "Co Req": subject.coReq+'   ',
}));
let infoSecondYearSecondSem: string[][] = [];
secondYearSecondSem.forEach((element,index,array)=>{
  infoSecondYearSecondSem.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});

const thirdYear = this.subject[2];
const thirdYearFirstSem = thirdYear.firstSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle+'        ',
  "Lec Units": subject.lecUnits.toString()+'   ',
  "Lab Units": subject.lecUnits.toString()+'   ',
  "Total Units": subject.totalUnits.toString()+'   ',
  "Hours Per Week": subject.hoursPerWeek.toString()+'   ',
  "Pre Req": subject.preReq+'   ',
  "Co Req": subject.coReq+'   ',
}));
let infoThirdYear: string[][] = [];
thirdYearFirstSem.forEach((element,index,array)=>{
  infoThirdYear.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});

const thirdYearSecondSem = thirdYear.secondSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle+'        ',
  "Lec Units": subject.lecUnits.toString()+'   ',
  "Lab Units": subject.lecUnits.toString()+'   ',
  "Total Units": subject.totalUnits.toString()+'   ',
  "Hours Per Week": subject.hoursPerWeek.toString()+'   ',
  "Pre Req": subject.preReq+'   ',
  "Co Req": subject.coReq+'   ',
}));
let infoThirdYearSecondSem: string[][] = [];
thirdYearSecondSem.forEach((element,index,array)=>{
  infoThirdYearSecondSem.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});

const fourthYear = this.subject[3];
const fuorthYearFirstSem = fourthYear.firstSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle+'        ',
  "Lec Units": subject.lecUnits.toString()+'   ',
  "Lab Units": subject.lecUnits.toString()+'   ',
  "Total Units": subject.totalUnits.toString()+'   ',
  "Hours Per Week": subject.hoursPerWeek.toString()+'   ',
  "Pre Req": subject.preReq+'   ',
  "Co Req": subject.coReq+'   ',
}));
let infoFourthYear: string[][] = [];
fuorthYearFirstSem.forEach((element,index,array)=>{
  infoFourthYear.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});

const fourthYearSecondSem = fourthYear.secondSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle+'        ',
  "Lec Units": subject.lecUnits.toString()+'   ',
  "Lab Units": subject.lecUnits.toString()+'   ',
  "Total Units": subject.totalUnits.toString()+'   ',
  "Hours Per Week": subject.hoursPerWeek.toString()+'   ',
  "Pre Req": subject.preReq+'   ',
  "Co Req": subject.coReq+'   ',
}));
let infofourthYearSecondSem: string[][] = [];
fourthYearSecondSem.forEach((element,index,array)=>{
  infofourthYearSecondSem.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});

addHeader()
  autoTable(pdf,{
    styles: {
      fontSize: 8,
       cellWidth:"auto", 
       halign:'center',
       lineWidth: 0.3,
       lineColor: 10,
       font: 'times new roman'
      },
    head:[[
      {content: 'FIRST YEAR', colSpan: 8, styles: {halign: 'center', fillColor: [202, 202, 202]}}
    ],
    [{content: 'FIRST SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
      ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
    body: [...infofirstYear,['', 'TOTAL', '','','','','','']],
    theme:'plain',
    columnStyles: {0:{halign: 'center'}},
    startY: tableMargin,
    
    
  })
  autoTable(pdf,{
    styles: {
      fontSize: 8,
       cellWidth:"auto", 
       halign:'center',
       lineWidth: 0.3,
       lineColor: 10,
       font: 'times new roman'
      },
    head:[
    [{content: 'SECOND SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
      ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
    body: [...infofirstYearSecondSem,['', 'TOTAL', '','','','','','']],
    theme:'plain',
    columnStyles: {0:{halign: 'center'}},
    //startY: tableMargin,
    
    
  })

 
  //second year
  pdf.addPage();
   addHeader()
  autoTable(pdf,{
    styles: {
      fontSize: 8,
       cellWidth:"auto", 
       halign:'center',
       lineWidth: 0.3,
       lineColor: 10,
       font: 'times new roman'
      },
    head:[[
      {content: 'SECOND YEAR', colSpan: 8, styles: {halign: 'center', fillColor: [202, 202, 202]}}
    ],
    [{content: 'FIRST SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
      ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
    body: [...infoSecondYear,['', 'TOTAL', '','','','','','']],
    theme:'plain',
    columnStyles: {0:{halign: 'center'}},
    startY: tableMargin,
    
    
  })
  autoTable(pdf,{
    styles: {
      fontSize: 8,
       cellWidth:"auto", 
       halign:'center',
       lineWidth: 0.3,
       lineColor: 10,
       font: 'times new roman'
      },
    head:[
    [{content: 'SECOND SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
      ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
    body: [...infoSecondYearSecondSem,['', 'TOTAL', '','','','','','']],
    theme:'plain',
    columnStyles: {0:{halign: 'center'}},
    //startY: tableMargin,
    
    
  })

 
  //third year
  pdf.addPage();
   addHeader()
  autoTable(pdf,{
    styles: {
      fontSize: 8,
       cellWidth:"auto", 
       halign:'center',
       lineWidth: 0.3,
       lineColor: 10,
       font: 'times new roman'
      },
    head:[[
      {content: 'THIRD YEAR', colSpan: 8, styles: {halign: 'center', fillColor: [202, 202, 202]}}
    ],
    [{content: 'FIRST SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
      ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
    body: [...infoThirdYear,['', 'TOTAL', '','','','','','']],
    theme:'plain',
    columnStyles: {0:{halign: 'center'}},
    startY: tableMargin,
    
    
  })
  autoTable(pdf,{
    styles: {
      fontSize: 8,
       cellWidth:"auto", 
       halign:'center',
       lineWidth: 0.3,
       lineColor: 10,
       font: 'times new roman'
      },
    head:[
    [{content: 'SECOND SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
      ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
    body: [...infoThirdYearSecondSem,['', 'TOTAL', '','','','','','']],
    theme:'plain',
    columnStyles: {0:{halign: 'center'}},
    //startY: tableMargin,
    
    
  })

  //fourth year
  pdf.addPage();
  addHeader()
  autoTable(pdf,{
    styles: {
      fontSize: 8,
       cellWidth:"auto", 
       halign:'center',
       lineWidth: 0.3,
       lineColor: 10,
       font: 'times new roman'
      },
    head:[[
      {content: 'FOURTH YEAR', colSpan: 8, styles: {halign: 'center', fillColor: [202, 202, 202]}}
    ],
    [{content: 'FIRST SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
      ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
    body: [...infoFourthYear,['', 'TOTAL', '','','','','','']],
    theme:'plain',
    columnStyles: {0:{halign: 'center'}},
    startY: tableMargin,
    
    
  })
  autoTable(pdf,{
    styles: {
      fontSize: 8,
       cellWidth:"auto", 
       halign:'center',
       lineWidth: 0.3,
       lineColor: 10,
       font: 'times new roman'
      },
    head:[
    [{content: 'SECOND SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
      ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours','Pre Req','Co Req']],
    body: [...infofourthYearSecondSem, ['', 'TOTAL','','','','','','']],
    theme:'plain',
    columnStyles: {0:{halign: 'center'}},
    //startY: tableMargin,
    
    
  })



autoTable(pdf,{
  styles: {
    fontSize: 8,
     cellWidth:"auto", 
     halign:'center',
     lineWidth: 0.3,
     lineColor: 10,
     font: 'times new roman'
    },
  head:[[
    {content: 'SPECIALIZATION', colSpan: 4, styles: {halign: 'center',lineWidth: 0, fontSize:10}}
  ],
    ['\t\t\t\t\t\t\t', 'SERVICE MANAGEMENT SPECIALIZATION TRACK', 'BUSINESS ANALYTICS SPECIALIZATION TRACK','WEB AND MOBILE DEVELOPMENT SPECIALIZATION TRACK']],
  body: [['Elective 1','etits 1','etits 2','etits 3'],
  ['Elective 2','eguls  1','eguls 2','eguls 3'],
  ['Elective 3','tite 1','tite 2','tite 3'],
  ['Elective 4','lorem ipsum 1','lorem ipsum 2', 'lorem ipsum 3'],
  ['Elective 5','test 1', 'test 2','test 3']],
  theme:'plain',
  columnStyles: {0:{halign: 'center'}},
  //startY: tableMargin,
})
  

    
    var sample = pdf.output('datauristring',{filename:'Curriculum'});
    var pdfWindow = window.open("Curriculum");
    if(pdfWindow)
    pdfWindow.document.write("<iframe width='100%' height='100%' src='" + sample + "'></iframe>");

    
}
}
