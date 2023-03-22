const Users=require('../models/userModel')

const userCtrl={
  ajouter :(req,res)=>{
       const {nom}=req.body
       let r = (Math.random() + 1).toString(36).substring(7);
       let r2 = (Math.random() + 1).toString(36).substring(7);
       let r3 = (Math.random() + 1).toString(36).substring(7);
        const bureau=[{
            b1:{
                nom:"b001",
                code:r,
                isActive:false,
                extD:'',
                extG: '',
                droite:[],
                gauche:[]
            },
            b2:{
        
                nom:"b002",
                code:r2+"b002",
                isActive:false,
                extD: '',
                extG: '',
                linkD:[],
                linkG:[]
        
            },
            b3:{
                nom:"b003",
                code:r3+"b003",
                isActive:false,
                extD:'',
                extG: '',
                linkD:[],
                linkG:[]
            }
        }]

    const element= bureau.map(e=>(e.b1))
       
        const el2= bureau.map(e=>(e.b2))
        const el3= bureau.map(e=>(e.b3))
 element[0].droite.push(el2[0].code)
 element[0].gauche.push(el3[0].code)
  
     const newUser= new Users({nom,bureau:bureau})
      newUser.save() 
      res.status(200).json({result:newUser})
     },

     getAlluser:async(req,res)=>{
        try {
            const user=await Users.find()
          
            
            return res.json({ result:user})
         
        } catch (error) {
            return res.status(500).json({msg:error.message}) 
        }
    },

getUserById:async(req,res)=>{
try {
  //.populate('bureau.b2.linkD')
    const user= await Users.findById({_id:req.params.id})


    if (user) return res.json(user)

    
} catch (error) {
    return res.status(500).json({msg:error.message}) 
    
}
},
modifer:async(req,res)=>{
            try {
                const {id_user}=req.body
         const finduser=await Users.findById({_id:req.params.id})
         
        
         const element= finduser.bureau.map(e=>(e.b2))
     
         
                if(element[0].linkD.length===0) {
                    
                    element[0].linkD.push(id_user)
                    element[0].extD=id_user
                   
                } else{

                 


                        
                    const AllUser=await Users.find()
   
                    const allextDUser=AllUser.map(e=>e.bureau.map(el=>el.b2.linkD.length!=0))
                    if(allextDUser){ 
                      const extd=  AllUser.map(e=>e.bureau.map(el=>el.b2.extD))
                
                    
                const array=[]
                
                    for(var i= 0; i < extd.length; i++)
                {
                    if(extd[i]!=''){
                        //await Users.updateMany({}, { $set: {bureau:user.bureau} })
                array.push(extd[i].toString())
                
                        }
                   
                }
              
                let lastElement = array[array.length - 1];
                AllUser.map(e=>e.bureau.map(el=>el.b2.extD))=lastElement
                //element[0].extD=lastElement
                
                   
               
                 
                const user= await Users.findById({_id:lastElement.toString()})
               
                
                const N_element=user.bureau.map(e=>(e.b2))
                if (N_element[0].linkD.length===0){
                    N_element[0].linkD.push(id_user)
                    element[0].extD=N_element[0].linkD.toString()
                  
           

                    const newuser= await Users.findOneAndUpdate({_id:N_element[0].extD},
                        {bureau:user.bureau})
          
                
                }else{

            const newuser= await Users.findOneAndUpdate({_id:N_element[0].extD},
                {bureau:user.bureau})
                N_element[0].linkD=lastElement

                }
            }


                  

                }
        
              
    
       const userUpdate= await Users.findOneAndUpdate({_id:req.params.id},
            {bureau:finduser.bureau})
       

          //  await Users.updateMany({}, { $set: {bureau:finduser.bureau} });

        res.json({msg:'update a user',result:finduser})
             
            } catch (error) {
                return res.status(500).json({msg:error.message}) 
            }
             },
     AjouterUser:async(req,res)=>{
            try {
                const {id_user}=req.body
                const finduser=await Users.findById({_id:req.params.id})
                  
         const element= finduser.bureau.map(e=>(e.b2))
     
         
         if(element[0].linkD.length===0) {
             
             element[0].linkD.push(id_user)
             element[0].extD=id_user
             const newuser= await Users.findOneAndUpdate({_id:req.params.id}, {bureau:finduser.bureau})
         }
      
                else{
                    
                    const lastElement=element[0].linkD[element[0].linkD.length-1]
                    const finduser2=await Users.findById({_id:element[0].extD})
                    const element2= finduser2.bureau.map(e=>(e.b2))
                   if(element2[0].linkD.length===0){
                            
                        element2[0].linkD.push(id_user)
                        element2[0].extD=id_user
                      
                        
                        const newuser2= await Users.findOneAndUpdate({_id:element[0].extD}, {bureau:finduser2.bureau})
                        element[0].extD= element2[0].extD
                        const newuser= await Users.findOneAndUpdate({_id:req.params.id}, {bureau:finduser.bureau})

                            
                        await Users.updateMany({}, { $set: {bureau:finduser2.bureau} })
                       
                   }
                   else{
                  
                    element2[0].extD=id_user
                  
                    
                    const newuser2= await Users.findOneAndUpdate({_id:element[0].extD}, {bureau:finduser2.bureau})
                    element[0].extD= element2[0].extD
                    const newuser= await Users.findOneAndUpdate({_id:req.params.id}, {bureau:finduser.bureau})
                   
                   /// await Users.updateMany({}, { $set: {bureau:finduser2.bureau} })

                   }
             
                             //   const Alluser=await Users.find()
                                
                        //await Users.updateMany({}, { $set: {bureau:finduser.bureau} }); 


                    

                }


            } catch (error) {
                return res.status(500).json({msg:error.message}) 
            }
    }
}

module.exports=userCtrl