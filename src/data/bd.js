const initialStudents=[
    {id: 1, firstname: "John", lastname: "Doe", email: "john.doe@example.com", grade: 18, field: "Mathematics"},
    {id: 2, firstname: "Jane", lastname: "Smith", email: "jane.smith@example.com", grade: 15, field: "Computer Science"},
    {id: 3, firstname: "Alice", lastname: "Johnson", email: "alice.johnson@example.com", grade: 12, field: "Physics"},
    {id: 4, firstname: "Bob", lastname: "Williams", email: "bob.williams@example.com", grade: 14, field: "Biology"},
    {id: 5, firstname: "Charlie", lastname: "Brown", email: "charlie.brown@example.com", grade: 17, field: "History"}
]

export let students = JSON.parse(JSON.stringify(initialStudents));

export const resetDb= () => {
    students = JSON.parse(JSON.stringify(initialStudents));
};
