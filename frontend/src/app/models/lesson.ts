export class Lesson{
    _id:string="";

    subject: string = "";
    studentUsername: string = "";
    studentFirstname: string = "";
    studentLastname: string = "";
    professorUsername: string = "";
    professorFirstname: string = "";
    professorLastname: string = "";
    
    date: string = "";
    start: Date = null;
    end: Date = null;
    commentStudent: string = "";
    commentProfessor: string = "";
    rating: number = 0;

    double: boolean = false;
    description: string = "";
    explanation: string = "";
    confirmation: boolean = false;

    mess: String = "";
    
}