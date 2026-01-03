import { useEffect, useState } from "react";
import "./styles/Home.css";
import Student from "./Student.jsx";

function Home() {
    const [data, setData] = useState([]);
    const [students, setStudents] = useState([]);
    const [filterValue, setFilterValue] = useState(0);
    const [isSigned, setIsSigned] = useState(null);
    const [newName, setNewName] = useState("");
    const [newGpa, setNewGpa] = useState("");
    const [newStudentId, setNewStudentId] = useState("");

    useEffect(() => {
        const run = async () => {
            try {
                const signRes = await fetch(
                    "https://jsv-back-end.onrender.com/api/isSign",
                    { credentials: "include" }
                );
                const signData = await signRes.json();

                if (!signData.isSign) {
                    setIsSigned(false);
                    return;
                }

                setIsSigned(true);

                const readRes = await fetch(
                    "https://jsv-back-end.onrender.com/api/read",
                    { credentials: "include" }
                );

                const studentsData = await readRes.json();

                const mapped = studentsData.map((s, index) => ({
                    _id: s._id,
                    name: s.studentName,
                    gpa: s.studentGpa,
                    student_id: s.studentID,
                    order: index + 1,
                }));

                setData(mapped);
                setStudents(mapped);
            } catch {
                setIsSigned(false);
            }
        };

        run();
    }, []);

    const addStudent = async () => {
        if (!newName || !newGpa || !newStudentId) return;

        const res = await fetch(
            "https://jsv-back-end.onrender.com/api/create",
            {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studentName: newName,
                    studentGpa: Number(newGpa),
                    studentID: newStudentId,
                }),
            }
        );

        const created = await res.json();

        if (res.ok) {
            const newStudent = {
                _id: created._id,
                name: created.studentName,
                gpa: created.studentGpa,
                student_id: created.studentID,
                order: data.length + 1,
            };

            setData([...data, newStudent]);
            setStudents([...students, newStudent]);

            setNewName("");
            setNewGpa("");
            setNewStudentId("");
        }
    };

    const deleteStudent = (mongoId) => {
        const filtered = data.filter((s) => s._id !== mongoId);
        const reordered = filtered.map((s, i) => ({ ...s, order: i + 1 }));
        setData(reordered);
        setStudents(reordered);
    };

    const updateStudent = (mongoId, updated) => {
        const update = (arr) =>
            arr.map((s) =>
                s._id === mongoId ? { ...s, ...updated } : s
            );

        setData(update(data));
        setStudents(update(students));
    };

    const sortAZ = () =>
        setStudents([...students].sort((a, b) => a.name.localeCompare(b.name)));

    const sortZA = () =>
        setStudents([...students].sort((a, b) => b.name.localeCompare(a.name)));

    const sortGpaHigh = () =>
        setStudents([...students].sort((a, b) => b.gpa - a.gpa));

    const sortGpaLow = () =>
        setStudents([...students].sort((a, b) => a.gpa - b.gpa));

    const filter = () =>
        setStudents(data.filter((s) => s.gpa >= filterValue));

    const reSet = () => setStudents(data);

    if (isSigned === null) return <h2 className="students">Loading...</h2>;
    if (!isSigned) return <h2 className="students">لازم تسجل دخول</h2>;

    return (
        <>
            <div className="buttons-area">
                <input
                    placeholder="Student Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <input
                    type="number"
                    step={0.1}
                    placeholder="GPA"
                    value={newGpa}
                    onChange={(e) => setNewGpa(e.target.value)}
                />
                <input
                    placeholder="Student ID"
                    value={newStudentId}
                    onChange={(e) => setNewStudentId(e.target.value)}
                />
                <button onClick={addStudent}>Add Student</button>
            </div>

            <div className="buttons-area">
                <button onClick={sortAZ}>Name A → Z</button>
                <button onClick={sortZA}>Name Z → A</button>
                <button onClick={sortGpaHigh}>GPA High → Low</button>
                <button onClick={sortGpaLow}>GPA Low → High</button>

                <input
                    type="number"
                    step={0.1}
                    max={4}
                    min={0}
                    placeholder="filter gpa"
                    onChange={(e) => setFilterValue(Number(e.target.value))}
                />

                <button onClick={filter}>filter</button>
                <button onClick={reSet}>reSet</button>
            </div>

            <div className="students">
                {students.map((user) => (
                    <Student
                        key={user._id}
                        user={user}
                        onDelete={deleteStudent}
                        onUpdate={updateStudent}
                    />
                ))}
            </div>
        </>
    );
}

export default Home;
