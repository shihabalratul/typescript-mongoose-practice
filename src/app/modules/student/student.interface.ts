export interface Guardian {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export interface UserName {
    firstname: string;
    middlename?: string;
    lastname: string;
}

export interface LocalGuardian {
    name: string;
    occupation: string;
    contactNo: string;
}

export interface Student {
    name: UserName;
    gender: 'male' | 'female';
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAdress: string;
    permanentAdress: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImg?: string;
    isActive: 'active' | 'blocked';
}
