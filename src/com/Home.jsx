import {useEffect, useState} from "react";
import './styles/Home.css'
import studentData from "../data/student.json";
import Student from "./Student.jsx";

function Home(){

    const [students, setStudents] = useState(studentData);
    const [filterValue, setFilterValue] = useState(0);
    const sortAZ = () => {
        const sorted = [...students].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        setStudents(sorted);
    };
    const setOrder = () => {

        const sortedArray = [...studentData].sort((a, b) => b.gpa - a.gpa);

        const withOrder = sortedArray.map((student, index) => ({
            ...student,
            order: index + 1,
        }));

        setStudents(withOrder);
    };


    const sortZA = () => {
        const sorted = [...students].sort((a, b) =>
            b.name.localeCompare(a.name)
        );
        setStudents(sorted);
    };

    const sortGpaHigh = () => {
        const sorted = [...students].sort((a, b) =>
            b.gpa - a.gpa
        );
        setStudents(sorted);
    };

    const sortGpaLow = () => {
        const sorted = [...students].sort((a, b) =>
            a.gpa - b.gpa
        );
        setStudents(sorted);
    };
    const filter =()=>{
        reSet();
       const newar =  students.filter((a) => a.gpa>=filterValue);
        setStudents(newar);

    }
    const reSet=()=>{
        setStudents(studentData)
        setOrder()
    }
    useEffect(()=>{
        setOrder()
    } , [])
    return (
        <>
            <div className="buttons-area">
                <button onClick={sortAZ}>Name A → Z</button>
                <button onClick={sortZA}>Name Z → A</button>
                <button onClick={sortGpaHigh}>GPA High → Low</button>
                <button onClick={sortGpaLow}>GPA Low → High</button>
                <input type={"number"} step={0.1} max={4} min={0}  placeholder={"filter gpa"}  onChange={(t)=> setFilterValue(t.target.value)} />
                <button onClick={filter} >filter</button>
                <button onClick={reSet}>reSet</button>
            </div>

            <div className="students">
                {students.map(user => (
                    <div key={user.student_id}>
                        <Student user={user} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
