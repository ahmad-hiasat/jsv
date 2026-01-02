import { useEffect, useState } from "react";
import "./styles/Home.css";
import Student from "./Student.jsx";

function Home() {
    const [data, setData] = useState([]);
    const [students, setStudents] = useState([]);
    const [filterValue, setFilterValue] = useState(0);
    const [isSigned, setIsSigned] = useState(null);

    useEffect(() => {
        const run = async () => {
            try {
                const signRes = await fetch(
                    "https://jsv-back-end.onrender.com/api/isSign",
                    {
                        credentials: "include",
                    }
                );

                if (signRes.status !== 200) {
                    setIsSigned(false);
                    return;
                }

                const signData = await signRes.json();
                if (!signData.isSign) {
                    setIsSigned(false);
                    return;
                }

                setIsSigned(true);

                const readRes = await fetch(
                    "https://jsv-back-end.onrender.com/api/read",
                    {
                        credentials: "include",
                    }
                );

                const studentsData = await readRes.json();
                setData(studentsData);
                setStudents(studentsData);

                for (const student of studentsData) {
                    await fetch(
                        `https://jsv-back-end.onrender.com/api/delete/${student.student_id}`,
                        {
                            method: "DELETE",
                            credentials: "include",
                        }
                    );

                    await fetch(
                        "https://jsv-back-end.onrender.com/api/create",
                        {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: student.name,
                                gpa: student.gpa,
                                student_id: student.student_id,
                            }),
                        }
                    );

                    await fetch(
                        `https://jsv-back-end.onrender.com/api/update/${student.student_id}`,
                        {
                            method: "PUT",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: student.name,
                                gpa: student.gpa,
                            }),
                        }
                    );
                }
            } catch {
                setIsSigned(false);
            }
        };

        run();
    }, []);

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

    if (isSigned === null) {
        return <h2 className="students">Loading...</h2>;
    }

    if (!isSigned) {
        return <h2 className="students">لازم تسجل دخول</h2>;
    }

    return (
        <>
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
                    <div key={user.student_id}>
                        <Student user={user} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
