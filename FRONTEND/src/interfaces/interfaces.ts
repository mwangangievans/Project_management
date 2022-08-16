export interface  Project_interface
{
    project_id:string
    user_id:string|null
    project_name:string
    project_description:string
    completion_date:Date
    Assigned_to:string
    Is_completed?:boolean
}

export interface  User
{
    user_id:string
    user_email:string
    user_password:string
    user_role:string
    user_name:string
}