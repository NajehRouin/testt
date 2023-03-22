const router=require('express').Router()

const userCtrl=require('../controller/userCntrl')

router.get('/user',userCtrl.getAlluser)
router.get('/user/:id',userCtrl.getUserById)
router.post('/user',userCtrl.ajouter)

router.put('/userm/:id',userCtrl.modifer)
router.put('/ajouterextd/:id',userCtrl.AjouterUser)
module.exports=router