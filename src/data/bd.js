const initialStudents=[
    {id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", grade: 18, field: "Mathématiques"},
    {id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", grade: 15, field: "Informatique"},
    {id: 3, firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", grade: 12, field: "Physique"},
    {id: 4, firstName: "Bob", lastName: "Williams", email: "bob.williams@example.com", grade: 14, field: "Chimie"},
    {id: 5, firstName: "Charlie", lastName: "Brown", email: "charlie.brown@example.com", grade: 17, field: "Chimie"}
]

export let students = JSON.parse(JSON.stringify(initialStudents));

export const resetDb= () => {
    students = JSON.parse(JSON.stringify(initialStudents));
};
