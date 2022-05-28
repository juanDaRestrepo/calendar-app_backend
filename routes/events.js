/* 
    Event Routes
    /api/events
*/


const { Router } = require("express");
const{ check } = require('express-validator');
const {validateInputs} = require('../middlewares/validate-inputs');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require("../helpers/isDate");

const router = Router();

//Todas tienen que pasar por la validación
router.use( validateJWT );

//Obtener eventos
router.get('/',
    
    getEvents)

//Crear un nuevo evento
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate),
        validateInputs
    ],  createEvent);

//Actualizar evento
router.put('/:id', updateEvent);

//Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;