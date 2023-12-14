export type TMonth =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

export type TAcademicSemesterName = 'Autumn' | 'Summer' | 'Fall';

export type TAcademicSemesterCode = '01' | '02' | '03';

export interface TAcademicSemester {
    name: TAcademicSemesterName;
    year: string;
    code: TAcademicSemesterCode;
    startMonth: TMonth;
    endMonth: TMonth;
}

export interface TAcademicSemesterNameCodeMapper {
    [key: string]: string;
}
