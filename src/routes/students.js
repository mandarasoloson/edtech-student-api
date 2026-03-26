import { Router } from "express";
import {students} from "../data/bd.js";

const router = Router();
const validFields= ["Mathemarics", "Computer Science", "Physics", "Biology", "History"];

const validateStudent = (data, currentId = null) => {
  const { firstName, lastName, email, grade, field } = data;

  if (!firstName || !lastName || !email || grade === undefined || !field) {
    return { error: 'Tous les champs sont obligatoires', status: 400 };
  }
  
  if (typeof firstName !== 'string' || firstName.trim().length < 2 || 
      typeof lastName !== 'string' || lastName.trim().length < 2) {
    return { error: 'Le prénom et le nom doivent faire au moins 2 caractères', status: 400 };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Format d\'email invalide', status: 400 };
  }
  
  if (typeof grade !== 'number' || grade < 0 || grade > 20) {
    return { error: 'La note doit être un nombre compris entre 0 et 20', status: 400 };
  }
  
  if (!validFields.includes(field)) {
    return { error: 'Filière non autorisée', status: 400 };
  }
  
  const emailExists = students.find(s => s.email === email && s.id !== currentId);
  if (emailExists) {
    return { error: 'Cet email est déjà utilisé par un autre étudiant', status: 409 };
  }

  return null;
};


router.get('/stats', (req, res)=>{
    if(students.length===0){
        return res.json({totalStudents: 0, averageGrade: 0, studentsByField: {}, bestStudent: null});
    }

    const totalStudents = students.length;
    const sumGrades = students.reduce((acc, s) => acc + s.grade, 0);
    const averageGrade = parseFloat((sumGrades / totalStudents).toFixed(2));

    const studentsByField = students.reduce((acc, s) => {
        acc[s.field] = (acc[s.field] || 0) + 1;
        return acc;
    }, {});

    const bestStudent = students.reduce((best, s) => (s.grade > best.grade ? s : best), students[0]);

    res.json({ totalStudents, averageGrade, studentsByField, bestStudent });
});

router.get('/search', (req, res)=>{
    const { q } = req.query;
    if(!q || q.trim()=== ''){
        return res.status(400).json({ error: 'Le paramètre de recherche q est requis' });
    }

    const searchTerm=q.toLowerCase();
    const results= students.filter(s=>
        s.firstname.toLowerCase().includes(searchTerm) ||
        s.lastname.toLowerCase().includes(searchTerm)
    );
    res.json(results);
});

router.get('/', (req, res)=>{
    res.json(students);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'L\'ID doit être un nombre' });

  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ error: 'Étudiant non trouvé' });

  res.json(student);
});

router.post('/', (req, res) => {
  const validation = validateStudent(req.body);
  if (validation) return res.status(validation.status).json({ error: validation.error });

  const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
  const newStudent = { id: newId, ...req.body };
  
  students.push(newStudent);
  res.status(201).json(newStudent);
});


router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'L\'ID doit être un nombre' });

  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: 'Étudiant non trouvé' });

  const validation = validateStudent(req.body, id);
  if (validation) return res.status(validation.status).json({ error: validation.error });

  students[index] = { id, ...req.body };
  res.json(students[index]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'L\'ID doit être un nombre' });

  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: 'Étudiant non trouvé' });

  students.splice(index, 1);
  res.json({ message: 'Étudiant supprimé avec succès' });
});

export default router;