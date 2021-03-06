const express = require('express');
const router = express.Router();

const AuthController = require('./Controller/AuthController');
const UserController = require('./Controller/UserController');
const CourseController = require('./Controller/CourseController');
const ClassController = require('./Controller/ClassController');
const GradeController = require('./Controller/GradesController');
const QuestionsController = require('./Controller/QuestionsController');

const CourseValidator = require('./Validators/CourseValidator');
const AuthValidator = require('./Validators/AuthValidator');
const UserValidator = require('./Validators/UserValidator');
const QuestiosValidator = require('./Validators/QuestionsValidator');

//Middleware para fazer autenticação do token antes de rodar o Controller
const Auth = require('./middlewares/Auth');

//Rota de cadastro de Usuário
router.post('/user/signup', AuthValidator.signup, AuthController.signup);
//Rota de Login
router.post('/user/signin', AuthValidator.signin, AuthController.signin);
//Atualizando dados de usuário
router.put('/user/update', UserValidator.updateUser, Auth.private, UserController.updateUser);
//Listagem de Usuários
router.get('/user/listusers', UserController.getUsers);
//Informações de Usuário
router.get('/user/info', Auth.private, UserController.infoUsers);

//Rota de cadastrado de Curso
router.post('/course/add', CourseValidator.addCourse, Auth.private, CourseController.addCoursers);

//Listar cursos
router.get('/course/list', CourseController.getCoursers);

//Criar turma
router.post('/class/add', Auth.private, ClassController.create);
//Listar todas as turmas
router.get('/class/list', ClassController.getClass);

//Lançar notas
router.post('/grade/add', Auth.private, GradeController.create);
//Listar todas as notas.
router.get('/grade/list', GradeController.getGrades); 

router.post('/question/create', QuestiosValidator.addQuestions, QuestionsController.create);

router.post('/test', (req, res, next) => {
    const {title, course_id} = req.body;
    console.log(title);
    next();
}, (request, response) => {
    const {content} = request.body;
    let array = content.split(" ");
    console.log(array);

    response.send({});

})


module.exports = router;