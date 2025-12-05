import './styles/single-student.css'
function Student({user}){
    return (<>
    <div className={'single-student'}>
        <p>
         name :    {user.name}
        </p>
<p>gpa : {user.gpa}</p>
<p>id : {user.student_id}</p>
        <p>order : {user.order}</p>
    </div>
    </>)
}
export  default Student;