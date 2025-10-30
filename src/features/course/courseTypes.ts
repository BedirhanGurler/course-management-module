export interface CourseDto {
    id?: string;
    name?: string;
    code?: string;
    categoryId?: string;
    categoryName?: string;
    description?: string;
    isActive?: boolean;
    dateCreated?: string;
    dateModified?: string;
}

export interface CourseData {
    numberOfAllCourses: number;
    numberOfActiveCourses: number;
    numberOfPassiveCourses: number;
    data: CourseDto[];
}