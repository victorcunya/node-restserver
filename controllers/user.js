import { request, response } from 'express';

const getUsers = (req = request, res = response) => {

    const params = req.query;

    console.log(params);
    res.json({
        msg: 'get api - controller',
        params
    })
};

const putUsers = (req = request, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put api - controller',
        id
    })
};

const postUsers = (req = request, res = response) => {

    const body = req.body;

    res.status(201).json({
        msg: 'post api - controller',
        body
    })
}

const deleteUsers = (req, res = response) => {
    res.json({
        msg: 'delete api - controller'
    })
}

export {
    getUsers, putUsers, postUsers, deleteUsers
};
