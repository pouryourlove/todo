const {Todo} = require('../models');
const {Op} = require('sequelize');

//show all todos (read)

//요청 필요 없으니 언더바 써준것이다.
exports.readTodos = async(_, res) => {
    try{
        let todos = await Todo.findAll();
        res.send(todos);
    }catch(error){
        res.send(error);
    }
}

exports.createTodo = async (req, res) => {
    console.log('req.body >>>>', req.body);
    try {
        let newTodo = await Todo.create({
            title: req.body.title,
            done: false,
            // todoItem 추가시 false가 기본값
        })
        console.log('new todo >>>', newTodo)
        res.send(newTodo)
    } catch (error){
        res.send(error)
    }
}

exports.updateTodo = async (req, res) => {
    console.log('req.body>>>>', req.body);
    try{
        //배열로 둔 이유: 배열 구조 분해한거임.
        //update() - 업데이트 된 행(row)의 수를 나타내는 값을 반환한다.
        //그 반환 값은 배열 형태로 제공된다.
        //배열 구조 분해 할당을 통해 배열의 첫 번째 요소를 변수에 할당할 수 있음.
        //[idUpdated] = [0] or [1]
        let [idUpdated] = await Todo.update({
            title: req.body.title, //요청 본문에서 'title' 값을 가져와서 업데이트
            done: req.body.done //요청 본문에서 'done'값을 가져와서 업데이트
        },
        //수정하는 위치 찾기
        {
            where: {
                id: {[Op.eq]: req.params.todoId}, //경로 파라미터에서 'todoId'를 사용하여 
                //Op.eq는 sequalize의 연산자로, "equals"(같음) 라는 뜻
            }
        }
    );

    // 수정 실패
    if(idUpdated === 0){ //업데이트 된 항목이 없으면 'false'를 반환한다.
        return res.send(false);
    }

    //수정 성공
    res.send(true)
    } catch (error){
        res.send(error)
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        let isDeleted = await Todo.destroy({
            where: {
                id: {[Op.eq]: req.params.todoId},
            },
        });
        //삭제 실패
        if(!isDeleted){
            return res.send(false)
        }
        //삭제 성공
        res.send(true);
    } catch(error){
        res.send(error);
    }
}