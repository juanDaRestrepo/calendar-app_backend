const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User-model');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {
    
    const { email, password } = req.body

    try {

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                ok:false,
                msg: 'Email already taken'
            })
        }

        user = new User(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generar JWT
        const token = await generateJWT( user.id, user.name );

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please comunicate with administrator'
        })
    }
    
}

const loginUser = async(req, res = response) => {
    
    const { email, password } = req.body;

    try{
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                ok:false,
                msg: 'User does not exist with this email'
            })
        }

        //Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Incorrect Password'
            })
        }

        //Generar JWT
        const token = await generateJWT( user.id, user.name );
        console.log(user);
        res.json({
            ok:true,
            uid: user.id,
            name: user.name,
            token
        })
    
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please comunicate with administrator'
        })
    }
    

    
};

const revalidateToken = async(req, res = response) => {
    const { uid, name } = req;

    //generar un nuevo JWT y retornarlo en esta petición
    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        token,
        uid,
        name
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}